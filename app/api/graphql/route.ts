import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { schema } from "@/graphql";
import { NextRequest } from "next/server";
import { createCorsResponse, addCorsHeaders } from "@/lib/cors";

const server = new ApolloServer({
  schema,
  introspection: process.env.NODE_ENV === "development",
  formatError: (error) => {
    console.error("GraphQL Error:", error);
    return error;
  },
});

const apolloHandler = startServerAndCreateNextHandler<NextRequest>(server, {
  context: async (req, res) => ({ req, res }),
});

export async function OPTIONS(req: NextRequest) {
  const origin = req.headers.get("origin");

  return createCorsResponse(null, { status: 204 }, origin);
}

export async function GET(req: NextRequest) {
  const origin = req.headers.get("origin");
  const response = await apolloHandler(req);

  return addCorsHeaders(response, origin);
}

export async function POST(req: NextRequest) {
  const origin = req.headers.get("origin");
  const response = await apolloHandler(req);

  return addCorsHeaders(response, origin);
}
