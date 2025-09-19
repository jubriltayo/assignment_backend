export const GET_ALL_CASES = `
  query GetAllCases($limit: Int, $offset: Int, $where: cases_bool_exp) {
    cases(
      limit: $limit, 
      offset: $offset, 
      where: $where,
      order_by: { created_at: desc }
    ) {
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
  }
`;

export const GET_CASE_BY_ID = `
  query GetCaseById($id: uuid!) {
    cases_by_pk(id: $id) {
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
  }
`;

export const GET_CASES_NEEDING_ACTION = `
  query GetCasesNeedingAction {
    cases(
      where: {
        process_status: { _in: ["AWAITING_INFORMATION", "APPLICATION_PREPARATION"] }
      },
      order_by: { created_at: desc }
    ) {
      id
      process_status
    }
  }
`;

export const CREATE_CASE = `
  mutation CreateCase($object: cases_insert_input!) {
    insert_cases_one(object: $object) {
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
  }
`;

export const UPDATE_CASE = `
  mutation UpdateCase($id: uuid!, $changes: cases_set_input!) {
    update_cases_by_pk(pk_columns: { id: $id }, _set: $changes) {
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
  }
`;

export const DELETE_CASE = `
  mutation DeleteCase($id: uuid!) {
    delete_cases_by_pk(id: $id) {
      id
    }
  }
`;

export const GET_TOTAL_CASES = `
  query GetTotalCases {
    cases_aggregate {
      aggregate {
        count
      }
    }
  }
`;

export const GET_CASES_NEEDING_ACTION_COUNT = `
  query GetCasesNeedingActionCount {
    cases_aggregate(
      where: {
        process_status: { _in: ["AWAITING_INFORMATION", "APPLICATION_PREPARATION"] }
      }
    ) {
      aggregate {
        count
      }
    }
  }
`;

export const GET_COMPLETED_CASES_COUNT = `
  query GetCompletedCasesCount {
    cases_aggregate(
      where: { process_status: { _eq: "APPROVED" } }
    ) {
      aggregate {
        count
      }
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
