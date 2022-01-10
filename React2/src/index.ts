import "reflect-metadata";
import "dotenv-safe/config";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { HelloResolver } from "./resolvers/hello";
import { PostResolver } from "./resolvers/Post";
import { UserResolver } from "./resolvers/User";
import Redis from "ioredis";
import session from "express-session";
import connectRedis from "connect-redis";
import { __prod__, COOKIE_NAME } from "./constants";

import cors from "cors";
import { createConnection } from "typeorm";
import { Post } from "./entites/Post";
import { User } from "./entites/User";
import { Booking } from "./entites/Booking";
import { SportPitch } from "./entites/SportPitch";
import { BookingStatus } from "./entites/BookingStatus";
import { UserHasBooking } from "./entites/UserHasBooking";
import { SportPitchResolver } from "./resolvers/SportPitch";
import { BookingStatusResolver } from "./resolvers/BookingStatus";
import { BookingResolver } from "./resolvers/Booking";
import { AdminResolver } from "./resolvers/Admin";
//import path from "path";
//import { sendEmail } from "./utils/sendEmail";

//import { MyContext } from './types';

const main = async () => {
  const conn = await createConnection({
    type: "postgres",
    url: process.env.DATABASE_URL,
    logging: true,
    //synchronize: true,
    //migrations: [path.join(__dirname, "./migrations/*")],
    entities: [Post, User, Booking, SportPitch, BookingStatus, UserHasBooking],
  });

  await conn.runMigrations();

  const app = express();

  const RedisStore = connectRedis(session);
  const redis = new Redis(process.env.REDIS_URL);
  app.set("trust proxy", 1);
  app.use(
    cors({
      origin: process.env.CORS_ORIGIN,
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
        domain: __prod__ ? ".ryanjonesportfolio.com" : undefined,
      },
      saveUninitialized: false,
      secret: process.env.SESSION_SECRET,
      resave: false,
    })
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [
        HelloResolver,
        PostResolver,
        UserResolver,
        SportPitchResolver,
        BookingStatusResolver,
        BookingResolver,
        AdminResolver,
      ],
      validate: false,
    }),

    // context: ([res,req}) => ({em:orm.em, res, req})
    context: ({ req, res }) => ({ req, res, redis }),
  });

  apolloServer.applyMiddleware({ app, cors: false });

  app.listen(parseInt(process.env.PORT), () => {
    console.log("server started on localhost");
  });
};

main().catch((err) => {
  console.error(err);
});
