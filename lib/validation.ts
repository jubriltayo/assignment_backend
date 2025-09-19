import { z } from "zod";

export const CaseTypeEnum = z.enum([
  "SPONSORED_VISA",
  "EOR_VISA",
  "FAMILY_VISA",
  "STUDENT_VISA",
]);
export const ProcessStatusEnum = z.enum([
  "APPLICATION_PREPARATION",
  "DOCUMENT_COLLECTION",
  "GOVERNMENT_PROCESSING",
  "AWAITING_INFORMATION",
  "APPROVED",
  "REJECTED",
]);

export const CreateCaseSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name too long"),
  caseType: CaseTypeEnum,
  country: z
    .string()
    .min(2, "Country must be at least 2 characters")
    .max(50, "Country name too long"),
  expectedCompletionDate: z.string().optional().nullable(),
});

export const UpdateCaseSchema = z.object({
  name: z.string().min(2).max(100).optional(),
  processStatus: ProcessStatusEnum.optional(),
  stepsCompleted: z.number().int().min(0).optional(),
  expectedCompletionDate: z.string().optional().nullable(),
});

export const CaseFilterSchema = z.object({
  searchTerm: z.string().optional(),
  caseType: CaseTypeEnum.optional(),
  country: z.string().optional(),
  processStatus: ProcessStatusEnum.optional(),
});

export type CreateCaseInput = z.infer<typeof CreateCaseSchema>;
export type UpdateCaseInput = z.infer<typeof UpdateCaseSchema>;
export type CaseFilterInput = z.infer<typeof CaseFilterSchema>;
