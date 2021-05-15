import { ApolloServer } from "apollo-server-micro";
import { schema } from "../../src/schema";
import { context } from "../../src/context";

const server = new ApolloServer({ schema, context });
const handler = server.createHandler({ path: "/api/graphql" });

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
