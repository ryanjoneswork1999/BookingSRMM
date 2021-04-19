import { cacheExchange, query } from "@urql/exchange-graphcache";
import Router from "next/router";
import { dedupExchange, Exchange, fetchExchange } from "urql";
import { pipe, tap } from 'wonka';
import { CreateBookingMutation, IsitbookedDocument, IsitbookedQuery, LoginMutation, LogoutMutation, MeDocument, MeQuery, RegisterMutation } from "../generated/graphql";
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


export const createUrqlClient = (ssrExchange:any) =>({
    url: "http://localhost:4000/graphql",
  fetchOptions: {
    credentials: "include" as const,
  },
  exchanges: [
    dedupExchange,
    cacheExchange({
      
      updates: {
        
        Mutation: {
          
            
        
        

          logout: (_result, _args, cache, _info) => {
            betterUpdateQuery <LogoutMutation, MeQuery>(cache,
              {query:MeDocument},
              _result,

              ( ) => ({me:null})
            )
          
          },

          
          createBookingNew:(_result, _args, cache, _info)=>{
            // betterUpdateQuery <CreateBookingMutation, IsitbookedQuery>(cache,
            //   {query:IsitbookedDocument},
            //   _result,

            //   ( ) => (return)
            // )

           
           // cache.updateQuery()
           cache.inspectFields("Query")
           cache.invalidate("Query","listSpecificBookings")
           cache.invalidate("Query", "datebookings")
           cache.invalidate("Query", "isitbooked")
           
          },
            
        
          
          login: (_result, _args, cache, _info) => {

            
            
            betterUpdateQuery<LoginMutation, MeQuery>(
              cache, {
                query: MeDocument
                
              },
              _result,
              (result, query)=>{
                if(result.login.errors){
                  return query;
                }else{
                  cache.inspectFields("Query")
                  cache.invalidate("Query","listSpecificBookings")
                  cache.invalidate("Query", "datebookings")
                  cache.invalidate("Query", "isitbooked")
                  return{
                    me: result.login.user
                  }
                }
              }
            )
            
            cache.inspectFields("Query")
            cache.invalidate("Query","listSpecificBookings")
            cache.invalidate("Query", "datebookings")
            cache.invalidate("Query", "isitbooked")
            
          },

          

          register: (_result, _args, cache, _info) => {
            betterUpdateQuery<RegisterMutation, MeQuery>(
              cache, {
                query: MeDocument
              },
              _result,
              (result, query)=>{
                if(result.register.errors){
                  return query;
                }else{
                  return{
                    me: result.register.user
                  }
                }
              }
            )
          },
            
          
            
          

        },
        
      },
    }),
    errorExchange,
    ssrExchange,
	fetchExchange,

  ],
});