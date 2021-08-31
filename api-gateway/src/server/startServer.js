import { ApolloServer } from 'apollo-server-express';
import cookieParser from 'cookie-parser';
import cors from "cors";
import express from 'express';

import resolvers from '#root/graphql/resolvers';
import typeDefs from '#root/graphql/typeDefs';
import accessEnv from "#root/helpers/accessEnv";
import FormatGraphQLErrors from './FormatGraphQLErrors';

const PORT = accessEnv("PORT", 7000);

// Always use await for apply middleware

async function startApolloServer(typeDefs, resolvers) {
    const server = new ApolloServer({
        formatError: FormatGraphQLErrors,
        typeDefs,
        resolvers
    })
    const app = express();
    app.use(
        cors({
            origin: (origin, cb) => cb(null, true),
            credentials: true
        })
    )
    await server.start();
    server.applyMiddleware({ app, cors: false, path: '/graphql' });

    app.listen(PORT, "0.0.0.0", () => {
        console.info(`Server is listening on port ${PORT}${server.graphqlPath}`);
    })
}

startApolloServer(typeDefs, resolvers);