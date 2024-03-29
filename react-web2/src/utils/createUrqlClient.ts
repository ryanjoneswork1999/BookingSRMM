import { cacheExchange } from "@urql/exchange-graphcache";
import Router from "next/router";
import { dedupExchange, Exchange, fetchExchange } from "urql";
import { pipe, tap } from 'wonka';
import { LoginMutation, LogoutMutation, MeDocument, MeQuery, RegisterMutation } from "../generated/graphql";
import { betterUpdateQuery } from "./betterUpdateQuery";



const errorExchange: Exchange = ({ forward }) => ops$ => {
  return pipe(
    forward(ops$),
    tap(({ error }) => {
      if(error?.message.includes("not authenticated")){
        Router.replace("/login");
      }
      }
    )
  );
};


export const createUrqlClient = (ssrExchange: any) => ({
  url: process.env.NEXT_PUBLIC_API_URL,
  fetchOptions: {
    credentials: "include" as const,
  },
  exchanges: [
    dedupExchange,
    cacheExchange({
      updates: {
        Mutation: {
          logout: (_result, _args, cache, _info) => {
            betterUpdateQuery<LogoutMutation, MeQuery>(
              cache,
              { query: MeDocument },
              _result,

              () => ({ me: null })
            );
          },

          createBookingNew: (_result, _args, cache, _info) => {
           
            cache.inspectFields("isitbooked(sportpitchid, RequestedOn)");
            cache.invalidate("Query", "listSpecificBookings");
            cache.invalidate("Query", "datebookings");
            cache.invalidate(
              "isitbooked","",
      
            );
          },

          login: (_result, _args, cache, _info) => {
            betterUpdateQuery<LoginMutation, MeQuery>(
              cache,
              {
                query: MeDocument,
              },
              _result,
              (result, query) => {
                if (result.login.errors) {
                  return query;
                } else {
                  cache.inspectFields("Query");
                  cache.invalidate("Query", "listSpecificBookings");
                  cache.invalidate("Query", "datebookings");
                  cache.invalidate("Query", "isitbooked");
                  return {
                    me: result.login.user,
                  };
                }
              }
            );
          },

          // booking: ({ booking }, _args, cache) => {
          //   const variables = {
          //     sportpitchid: _args.sportpitchid,
          //     RequestedOn: _args.requestedOn,
          //   };
          //   cache.updateQuery(
          //     { query: IsitbookedDocument, variables },
          //     (data) => {
          //       if (data !== null) {
          //         // cache.inspectFields("Query");
          //         // cache.invalidate("Query", "listSpecificBookings");
          //         // cache.invalidate("Query", "datebookings");
          //         // cache.invalidate("Query", "IsitbookedQuery");

          //         return data;
          //       } else {
          //         return null;
          //       }
          //     }
          //   );
          // },

          register: (_result, _args, cache, _info) => {
            betterUpdateQuery<RegisterMutation, MeQuery>(
              cache,
              {
                query: MeDocument,
              },
              _result,
              (result, query) => {
                if (result.register.errors) {
                  return query;
                } else {
                  return {
                    me: result.register.user,
                  };
                }
              }
            );
          },
        },
      },
    }),
    errorExchange,
    ssrExchange,
    fetchExchange,
  ],
});