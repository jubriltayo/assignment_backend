import { gql } from "graphql-tag";

export const caseTypeDefs = gql`
  scalar Date

  enum CaseType {
    SPONSORED_VISA
    EOR_VISA
    FAMILY_VISA
    STUDENT_VISA
  }

  enum ProcessStatus {
    APPLICATION_PREPARATION
    DOCUMENT_COLLECTION
    GOVERNMENT_PROCESSING
    AWAITING_INFORMATION
    APPROVED
    REJECTED
  }

  type Case {
    id: ID!
    name: String!
    caseType: CaseType!
    country: String!
    processStatus: ProcessStatus!
    stepsCompleted: Int!
    totalSteps: Int!
    expectedCompletionDate: Date
    createdAt: Date!
  }

  input CreateCaseInput {
    name: String!
    caseType: CaseType!
    country: String!
    expectedCompletionDate: Date
  }

  input UpdateCaseInput {
    name: String
    processStatus: ProcessStatus
    stepsCompleted: Int
    expectedCompletionDate: Date
  }

  input CaseFilter {
    searchTerm: String
    caseType: CaseType
    country: String
    processStatus: ProcessStatus
  }

  type CaseStats {
    totalCases: Int!
    casesNeedingAction: Int!
    completedCases: Int!
  }

  extend type Query {
    cases(filter: CaseFilter, limit: Int, offset: Int): [Case!]!
    case(id: ID!): Case
    casesNeedingAction: [Case!]!
    caseStats: CaseStats!
    countries: [String!]!
  }

  extend type Mutation {
    createCase(input: CreateCaseInput!): Case!
    updateCase(id: ID!, input: UpdateCaseInput!): Case!
    deleteCase(id: ID!): Boolean!
  }
`;
