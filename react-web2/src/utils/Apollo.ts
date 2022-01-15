import { createWithApollo } from "./createWithApollo";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { NextPageContext } from "next";
import { ListSpecificBookingsQuery } from "../generated/graphql";

const createClient = (ctx: NextPageContext) =>
  new ApolloClient({
    uri: process.env.NEXT_PUBLIC_API_URL as string,
    credentials: "include",
    headers: {
      cookie:
        (typeof window === "undefined"
          ? ctx?.req?.headers.cookie
          : undefined) || "",
    },
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            listSpecificBookings: {
              keyArgs: [],
              merge(
                existing: ListSpecificBookingsQuery | undefined,
                incoming: ListSpecificBookingsQuery
              ): ListSpecificBookingsQuery {
                return {
                  ...incoming,
                  
                    ...([existing?.listSpecificBookings] || []),
                    ...([incoming.listSpecificBookings]),
                  
                };
              },
            },
          },
        },
      },
    }),
  });

export const withApollo = createWithApollo(createClient);
