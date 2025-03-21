import { z } from "zod";

export const addTaskSchema = z.object({
  name: z
    .string()
    .min(1, "სავალდებულო")
    .min(2, "მინიმუმ ორი სიმბოლო")
    .max(255, "მაქსიმუმ 255 სიმბოლო"),
  description: z
    .string()
    .max(255, "მაქსიმუმ 255 სიმბოლო")
    // .optional(),
    .nullable()
    .or(z.literal(""))
    // .refine(
    //   (value): value is string =>
    //     typeof value === "string" && value.trim().split(/\s+/).length >= 4,
    //   {
    //     message: "მინიმუმ ოთხი სიტყვა",
    //   }
    // ),
    .refine(
      (value) => !value || value.trim().split(/\s+/).length >= 4, // Only validate if not empty
      {
        message: "მინიმუმ ოთხი სიტყვა",
      }
    ),
  due_date: z
    .string()
    .min(1, "სავალდებულო")
    .refine((date) => new Date(date) >= new Date(), {
      message: "წარსული თარიღი",
    }),

  status_id: z.string(),
  department_id: z.string(),
  employee_id: z.string(),
  priority_id: z.string(),
});
