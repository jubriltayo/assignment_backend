import { hasuraClient } from "@/lib/hasura-client";
import {
  CreateCaseSchema,
  UpdateCaseSchema,
  CaseFilterSchema,
} from "@/lib/validation";
import {
  Cases,
  Cases_Bool_Exp,
  Cases_Insert_Input,
  Cases_Set_Input,
} from "@/types/hasura";

// Helper function to get total steps by case type
const getTotalStepsByCaseType = (caseType: string): number => {
  const stepsMap: Record<string, number> = {
    SPONSORED_VISA: 5,
    EOR_VISA: 4,
    FAMILY_VISA: 6,
    STUDENT_VISA: 3,
  };
  return stepsMap[caseType] || 3;
};

// Helper function to transform Hasura case to GraphQL case
const transformHasuraCase = (hasuraCase: Cases) => ({
  id: hasuraCase.id,
  name: hasuraCase.name,
  caseType: hasuraCase.case_type,
  country: hasuraCase.country,
  processStatus: hasuraCase.process_status,
  stepsCompleted: hasuraCase.steps_completed,
  totalSteps: hasuraCase.total_steps,
  expectedCompletionDate: hasuraCase.expected_completion_date,
  createdAt: hasuraCase.created_at,
});

// Helper function to build Hasura where clause from filters
const buildWhereClause = (filter: any): Cases_Bool_Exp | undefined => {
  const where: Cases_Bool_Exp = {};

  if (filter.searchTerm) {
    where.name = { _ilike: `%${filter.searchTerm}%` };
  }

  if (filter.caseType) {
    where.case_type = { _eq: filter.caseType };
  }

  if (filter.country) {
    where.country = { _eq: filter.country };
  }

  if (filter.processStatus) {
    where.process_status = { _eq: filter.processStatus };
  }

  return Object.keys(where).length > 0 ? where : undefined;
};

export const caseResolvers = {
  Query: {
    cases: async (
      _: any,
      args: { filter?: any; limit?: number; offset?: number }
    ) => {
      try {
        // Validate filter input
        if (args.filter) {
          const validation = CaseFilterSchema.safeParse(args.filter);
          if (!validation.success) {
            throw new Error(
              `Invalid filter: ${validation.error.errors[0].message}`
            );
          }
        }

        const where = args.filter ? buildWhereClause(args.filter) : undefined;
        const limit = args.limit || 50;
        const offset = args.offset || 0;

        const data = await hasuraClient.getCases({ where, limit, offset });
        return data.cases.map(transformHasuraCase);
      } catch (error) {
        console.error("Error fetching cases:", error);
        throw new Error(
          `Failed to fetch cases: ${
            error instanceof Error ? error.message : "Unknown error"
          }`
        );
      }
    },

    case: async (_: any, { id }: { id: string }) => {
      try {
        const data = await hasuraClient.getCaseById(id);

        if (!data.cases_by_pk) {
          throw new Error("Case not found");
        }

        return transformHasuraCase(data.cases_by_pk);
      } catch (error) {
        console.error("Error fetching case:", error);
        throw new Error(
          `Failed to fetch case: ${
            error instanceof Error ? error.message : "Unknown error"
          }`
        );
      }
    },

    casesNeedingAction: async () => {
      try {
        const where: Cases_Bool_Exp = {
          process_status: {
            _in: ["AWAITING_INFORMATION", "APPLICATION_PREPARATION"],
          },
        };

        const data = await hasuraClient.getCases({ where });
        return data.cases.map((case_: Cases) => ({
          id: case_.id,
          processStatus: case_.process_status,
        }));
      } catch (error) {
        console.error("Error fetching cases needing action:", error);
        throw new Error(
          `Failed to fetch cases needing action: ${
            error instanceof Error ? error.message : "Unknown error"
          }`
        );
      }
    },

    caseStats: async () => {
      try {
        const [totalCases, casesNeedingAction, completedCases] =
          await Promise.all([
            hasuraClient.getTotalCasesCount(),
            hasuraClient.getCasesNeedingActionCount(),
            hasuraClient.getCompletedCasesCount(),
          ]);

        return {
          totalCases,
          casesNeedingAction,
          completedCases,
        };
      } catch (error) {
        console.error("Error fetching case stats:", error);
        throw new Error(
          `Failed to fetch case stats: ${
            error instanceof Error ? error.message : "Unknown error"
          }`
        );
      }
    },

    countries: async () => {
      try {
        const data = await hasuraClient.getCases({});
        const uniqueCountries = [
          ...new Set(data.cases.map((case_) => case_.country)),
        ];
        return uniqueCountries.sort();
      } catch (error) {
        console.error("Error fetching countries:", error);
        throw new Error(
          `Failed to fetch countries: ${
            error instanceof Error ? error.message : "Unknown error"
          }`
        );
      }
    },
  },

  Mutation: {
    createCase: async (_: any, { input }: { input: any }) => {
      try {
        // Validate input with Zod
        const validation = CreateCaseSchema.safeParse(input);
        if (!validation.success) {
          throw new Error(
            `Validation error: ${validation.error.errors[0].message}`
          );
        }

        const validatedInput = validation.data;
        const totalSteps = getTotalStepsByCaseType(validatedInput.caseType);

        // Set default completion date if not provided (30 days from now)
        const expectedDate =
          validatedInput.expectedCompletionDate ||
          new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
            .toISOString()
            .split("T")[0];

        const caseObject: Cases_Insert_Input = {
          name: validatedInput.name,
          case_type: validatedInput.caseType,
          country: validatedInput.country,
          process_status: "APPLICATION_PREPARATION",
          steps_completed: 0,
          total_steps: totalSteps,
          expected_completion_date: expectedDate,
        };

        const data = await hasuraClient.createCase(caseObject);
        return transformHasuraCase(data.insert_cases_one);
      } catch (error) {
        console.error("Error creating case:", error);
        throw new Error(
          `Failed to create case: ${
            error instanceof Error ? error.message : "Unknown error"
          }`
        );
      }
    },

    updateCase: async (_: any, { id, input }: { id: string; input: any }) => {
      try {
        // Validate input with Zod
        const validation = UpdateCaseSchema.safeParse(input);
        if (!validation.success) {
          throw new Error(
            `Validation error: ${validation.error.errors[0].message}`
          );
        }

        const validatedInput = validation.data;

        // Transform GraphQL field names to Hasura field names
        const changes: Cases_Set_Input = {};
        if (validatedInput.name !== undefined)
          changes.name = validatedInput.name;
        if (validatedInput.processStatus !== undefined)
          changes.process_status = validatedInput.processStatus;
        if (validatedInput.stepsCompleted !== undefined)
          changes.steps_completed = validatedInput.stepsCompleted;
        if (validatedInput.expectedCompletionDate !== undefined)
          changes.expected_completion_date =
            validatedInput.expectedCompletionDate;

        const data = await hasuraClient.updateCase(id, changes);

        if (!data.update_cases_by_pk) {
          throw new Error("Case not found");
        }

        return transformHasuraCase(data.update_cases_by_pk);
      } catch (error) {
        console.error("Error updating case:", error);
        throw new Error(
          `Failed to update case: ${
            error instanceof Error ? error.message : "Unknown error"
          }`
        );
      }
    },

    deleteCase: async (_: any, { id }: { id: string }) => {
      try {
        const data = await hasuraClient.deleteCase(id);

        if (!data.delete_cases_by_pk) {
          throw new Error("Case not found");
        }

        return true;
      } catch (error) {
        console.error("Error deleting case:", error);
        throw new Error(
          `Failed to delete case: ${
            error instanceof Error ? error.message : "Unknown error"
          }`
        );
      }
    },
  },
};
