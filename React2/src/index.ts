
import "reflect-metadata";

import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { HelloResolver } from "./resolvers/hello";
import { PostResolver } from "./resolvers/Post";
import { UserResolver } from "./resolvers/user";
import Redis from "ioredis";
import session from "express-session";
import connectRedis from "connect-redis";
import { __prod__, COOKIE_NAME } from "./constants";

import cors from "cors";
import {createConnection} from 'typeorm'
import { Post } from "./entites/Post";
import { User } from "./entites/User";
import { Booking } from "./entites/Booking";
import { SportPitch } from "./entites/SportPitch";
import { BookingStatus } from "./entites/BookingStatus";
import { UserHasBooking } from "./entites/UserHasBooking";
import { SportPitchResolver } from "./resolvers/SportPitch";
import { BookingStatusResolver } from "./resolvers/BookingStatus";
import { BookingResolver } from "./resolvers/Booking";
import { userBookingResolver } from "./resolvers/userBookings";
//import path from "path"
//import { sendEmail } from "./utils/sendEmail";

//import { MyContext } from './types';



const main = async () => {
  const conn = await createConnection({
    type: 'postgres',
    database: 'Booker',
    username: 'postgres',
    password: 'ryanjones',
    logging:true,
    
    
    synchronize:true,
    // migrations: [path.join(__dirname, './migrations/*')],
    entities: [Post,User, Booking, SportPitch, BookingStatus, UserHasBooking]
    
  });

  
  
  //await conn.runMigrations()
  
  

  

  const app = express();

  const RedisStore = connectRedis(session);
  const redis = new Redis();

  app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
    })
  );
  app.use(
    session({
      name: COOKIE_NAME,
      store: new RedisStore({ client: redis, disableTouch: true }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10, //10 years
        httpOnly: true,
        sameSite: "lax", //csrf
        secure: __prod__, //cookie only works in https
      },
      saveUninitialized: false,
      secret: "hguhuguyygugyu",
      resave: false,
    })
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      
      resolvers: [ HelloResolver, PostResolver, UserResolver, SportPitchResolver,BookingStatusResolver,BookingResolver,userBookingResolver],
      validate: false,
    }),

    // context: ([res,req}) => ({em:orm.em, res, req})
    context: ({ req, res }) => ({ req, res, redis }),
  });

  apolloServer.applyMiddleware({ app, cors: false,});

  app.listen(4000, () => {
    console.log("server started on localhost: 4000");
  });
};

main().catch((err) => {
  console.error(err);
});
