import {
  GET_ALL_CASES,
  GET_CASE_BY_ID,
  CREATE_CASE,
  UPDATE_CASE,
  DELETE_CASE,
  GET_TOTAL_CASES,
  GET_CASES_NEEDING_ACTION_COUNT,
  GET_COMPLETED_CASES_COUNT,
  GET_UNIQUE_COUNTRIES,
} from "@/lib/hasura-queries";

import {
  Cases,
  Cases_Bool_Exp,
  Cases_Insert_Input,
  Cases_Set_Input,
} from "@/types/hasura";

interface HasuraResponse<T = any> {
  data?: T;
  errors?: Array<{
    message: string;
    extensions?: {
      path: string;
      code: string;
    };
  }>;
}

class HasuraClient {
  private endpoint: string;
  private adminSecret: string;

  constructor() {
    this.endpoint = process.env.HASURA_GRAPHQL_URL!;
    this.adminSecret = process.env.HASURA_ADMIN_SECRET!;

    if (!this.endpoint || !this.adminSecret) {
      throw new Error("Missing Hasura configuration");
    }
  }

  async execute<T = any>(
    query: string,
    variables: Record<string, any> = {}
  ): Promise<T> {
    try {
      const response = await fetch(this.endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Hasura-Admin-Secret": this.adminSecret,
        },
        body: JSON.stringify({ query, variables }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result: HasuraResponse<T> = await response.json();

      if (result.errors?.length) {
        throw new Error(`Hasura error: ${result.errors[0].message}`);
      }

      if (!result.data) {
        throw new Error("No data returned from Hasura");
      }

      return result.data;
    } catch (error) {
      console.error("Hasura request failed:", error);
      throw error;
    }
  }

  async getCases(
    variables: {
      where?: Cases_Bool_Exp;
      limit?: number;
      offset?: number;
    } = {}
  ) {
    return this.execute<{ cases: Cases[] }>(GET_ALL_CASES, variables);
  }

  async getCaseById(id: string) {
    return this.execute<{ cases_by_pk: Cases | null }>(GET_CASE_BY_ID, { id });
  }

  async createCase(object: Cases_Insert_Input) {
    return this.execute<{ insert_cases_one: Cases }>(CREATE_CASE, { object });
  }

  async updateCase(id: string, changes: Cases_Set_Input) {
    return this.execute<{ update_cases_by_pk: Cases | null }>(UPDATE_CASE, {
      id,
      changes,
    });
  }

  async deleteCase(id: string) {
    return this.execute<{ delete_cases_by_pk: Cases | null }>(DELETE_CASE, {
      id,
    });
  }

  async getTotalCasesCount() {
    const data = await this.execute<{
      cases_aggregate: { aggregate: { count: number } };
    }>(GET_TOTAL_CASES);
    return data.cases_aggregate.aggregate.count;
  }

  async getCasesNeedingActionCount() {
    const data = await this.execute<{
      cases_aggregate: { aggregate: { count: number } };
    }>(GET_CASES_NEEDING_ACTION_COUNT);
    return data.cases_aggregate.aggregate.count;
  }

  async getCompletedCasesCount() {
    const data = await this.execute<{
      cases_aggregate: { aggregate: { count: number } };
    }>(GET_COMPLETED_CASES_COUNT);
    return data.cases_aggregate.aggregate.count;
  }

  async getUniqueCountries() {
    return this.execute<{ cases: { country: string }[] }>(GET_UNIQUE_COUNTRIES);
  }
}

export const hasuraClient = new HasuraClient();
