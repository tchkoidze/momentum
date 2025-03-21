import { z } from "zod";

export const addEmployeeSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "სავალდებულო")
    .min(2, "მინიმუმ ორი სიმბოლო")
    //.regex(/^[ა-ჰ]+$/g, "მარტო ლათინური და ქართული სიმბოლოები")
    .max(255, "მაქსიმუმ 255 სიმბოლო")
    .regex(/^[a-zA-Z\u10A0-\u10FF]+$/, "მარტო ლათინური და ქართული სიმბოლოები"),
  surname: z
    .string()
    .trim()
    .min(1, "სავალდებულო")
    .min(2, "მინიმუმ ორი სიმბოლო")
    .max(255, "მაქსიმუმ 255 სიმბოლო")
    .regex(/^[a-zA-Z\u10A0-\u10FF]+$/, "მარტო ლათინური და ქართული სიმბოლოები"),
  //avatar: z.instanceof(File),
  // avatar: z
  //   .instanceof(File)
  //   .refine((file) => isImage(file), {
  //     message: "The file must be an image.",
  //   })
  //   .refine((file) => file.size <= 6000, {
  //     message: "The file must be less than 600KB.",
  //   }),

  // department: z.string().min(1, "სავალდებულო"),
  department: z.string().refine((val) => val.trim().length > 0, {
    message: "სავალდებულოა",
  }),
});
//.required({ name: true, surname: true, department: true });

export type AddEmployeeFormData = z.infer<typeof addEmployeeSchema>;
