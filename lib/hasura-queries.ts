// FRAGMENTS
const CASE_CORE_FIELDS = `
  fragment CaseCoreFields on cases {
    id
    name
    case_type
    country
    process_status
    steps_completed
    total_steps
    expected_completion_date
    created_at
  }
`;

const CASE_MINIMAL_FIELDS = `
  fragment CaseMinimalFields on cases {
    id
    process_status
  }
`;

const CASE_AGGREGATE_FIELDS = `
  fragment CaseAggregateFields on cases_aggregate_fields {
    count
  }
`;

// QUERIES
export const GET_ALL_CASES = `
  ${CASE_CORE_FIELDS}
  
  query GetAllCases($limit: Int, $offset: Int, $where: cases_bool_exp) {
    cases(
      limit: $limit, 
      offset: $offset, 
      where: $where,
      order_by: { created_at: desc }
    ) {
      ...CaseCoreFields
    }
  }
`;

export const GET_CASE_BY_ID = `
  ${CASE_CORE_FIELDS}
  
  query GetCaseById($id: uuid!) {
    cases_by_pk(id: $id) {
      ...CaseCoreFields
    }
  }
`;

export const GET_CASES_NEEDING_ACTION = `
  ${CASE_MINIMAL_FIELDS}
  
  query GetCasesNeedingAction {
    cases(
      where: {
        process_status: { _in: ["AWAITING_INFORMATION", "APPLICATION_PREPARATION"] }
      },
      order_by: { created_at: desc }
    ) {
      ...CaseMinimalFields
    }
  }
`;

export const GET_UNIQUE_COUNTRIES = `
  query GetUniqueCountries {
    cases(distinct_on: country, order_by: { country: asc }) {
      country
    }
  }
`;

// AGGREGATE QUERIES (Statistics)
export const GET_TOTAL_CASES = `
  ${CASE_AGGREGATE_FIELDS}
  
  query GetTotalCases {
    cases_aggregate {
      aggregate {
        ...CaseAggregateFields
      }
    }
  }
`;

export const GET_CASES_NEEDING_ACTION_COUNT = `
  ${CASE_AGGREGATE_FIELDS}
  
  query GetCasesNeedingActionCount {
    cases_aggregate(
      where: {
        process_status: { _in: ["AWAITING_INFORMATION", "APPLICATION_PREPARATION"] }
      }
    ) {
      aggregate {
        ...CaseAggregateFields
      }
    }
  }
`;

export const GET_COMPLETED_CASES_COUNT = `
  ${CASE_AGGREGATE_FIELDS}
  
  query GetCompletedCasesCount {
    cases_aggregate(
      where: { process_status: { _eq: "APPROVED" } }
    ) {
      aggregate {
        ...CaseAggregateFields
      }
    }
  }
`;

// MUTATIONS
export const CREATE_CASE = `
  ${CASE_CORE_FIELDS}
  
  mutation CreateCase($object: cases_insert_input!) {
    insert_cases_one(object: $object) {
      ...CaseCoreFields
    }
  }
`;

export const UPDATE_CASE = `
  ${CASE_CORE_FIELDS}
  
  mutation UpdateCase($id: uuid!, $changes: cases_set_input!) {
    update_cases_by_pk(pk_columns: { id: $id }, _set: $changes) {
      ...CaseCoreFields
    }
  }
`;

export const DELETE_CASE = `
  mutation DeleteCase($id: uuid!) {
    delete_cases_by_pk(id: $id) {
      id
    }
  }
`;
