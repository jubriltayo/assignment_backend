import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { schema } from "@/graphql";
import { NextRequest } from "next/server";

const server = new ApolloServer({
  schema,
  introspection: true,
});

const apolloHandler = startServerAndCreateNextHandler<NextRequest>(server, {
  context: async (req, res) => ({ req, res }),
});

export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
      "Access-Control-Allow-Credentials": "true",
    },
  });
}

export async function GET(req: NextRequest) {
  const response = await apolloHandler(req);
  response.headers.set("Access-Control-Allow-Origin", "*");
  response.headers.set("Access-Control-Allow-Credentials", "true");
  return response;
}

export async function POST(req: NextRequest) {
  const response = await apolloHandler(req);
  response.headers.set("Access-Control-Allow-Origin", "*");
  response.headers.set("Access-Control-Allow-Credentials", "true");
  return response;
}
