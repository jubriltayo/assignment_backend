import { mergeTypeDefs, mergeResolvers } from "@graphql-tools/merge";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { gql } from "graphql-tag";
import { caseTypeDefs } from "./schema/case";
import { caseResolvers } from "./resolvers/case";

// Base schema with Query and Mutation types
const baseTypeDefs = gql`
  type Query {
    _empty: String
  }

  type Mutation {
    _empty: String
  }
`;

// Merge all type definitions
const typeDefs = mergeTypeDefs([baseTypeDefs, caseTypeDefs]);

// Merge all resolvers
const resolvers = mergeResolvers([caseResolvers]);

// Create executable schema
export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});
