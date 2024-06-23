import { z } from "zod";

const GENDER = z.enum(["MALE", "FEMALE"], {
  required_error: "Gender is required",
  invalid_type_error: "Invalid value for gender",
});

const CHEST_PAIN = z.enum(
  ["TYPICAL_ANGINA", "ATYPICAL_ANGINA", "NON_ANGIAL_PAIN", "ASYMPTOMATIC"],
  {
    required_error: "Chest pain type is required",
    invalid_type_error: "Invalid value for chest pain type",
  }
);

const REST_ECG = z.enum(
  ["NORMAL", "ST_T_WAVE_ABNORMALITY", "LEFT_VENTRICUALR_HYPERTOPHY"],
  {
    required_error: "Rest ECG type is required",
    invalid_type_error: "Invalid value for rest ECG type",
  }
);

const SLOPE = z.enum(["UPSLOPING", "FLAT", "DOWNSLOPING"], {
  required_error: "Slope type is required",
  invalid_type_error: "Invalid value for slope type",
});

export const PredictionInputSchema = z.object({
  age: z
    .number({
      required_error: "Age is required",
      invalid_type_error: "Age must be a number",
    })
    .int()
    .min(0, { message: "Age must be a positive integer" }),

  sex: GENDER,

  cp: CHEST_PAIN,

  trestbps: z
    .number({
      required_error: "Resting blood pressure is required",
      invalid_type_error: "Resting blood pressure must be a number",
    })
    .int()
    .min(0, { message: "Resting blood pressure must be a positive integer" }),

  chol: z
    .number({
      required_error: "Cholesterol level is required",
      invalid_type_error: "Cholesterol level must be a number",
    })
    .int()
    .min(0, { message: "Cholesterol level must be a positive integer" }),

  fbs: z.boolean({
    required_error: "Fasting blood sugar is required",
    invalid_type_error: "Fasting blood sugar must be a boolean",
  }),

  restecg: REST_ECG,

  thalach: z
    .number({
      required_error: "Maximum heart rate achieved is required",
      invalid_type_error: "Maximum heart rate achieved must be a number",
    })
    .int()
    .min(0, {
      message: "Maximum heart rate achieved must be a positive integer",
    }),

  exang: z.boolean({
    required_error: "Exercise induced angina is required",
    invalid_type_error: "Exercise induced angina must be a boolean",
  }),

  oldpeak: z
    .number({
      required_error:
        "ST depression induced by exercise relative to rest is required",
      invalid_type_error:
        "ST depression induced by exercise relative to rest must be a number",
    })
    .min(0, {
      message:
        "ST depression induced by exercise relative to rest must be a positive integer",
    }),

  slope: SLOPE,

  ca: z
    .number({
      required_error:
        "Number of major vessels colored by fluoroscopy is required",
      invalid_type_error:
        "Number of major vessels colored by fluoroscopy must be a number",
    })
    .int()
    .min(0, {
      message:
        "Number of major vessels colored by fluoroscopy must be a positive integer",
    }),

  thal: z
    .number({
      required_error: "Thalassemia status is required",
      invalid_type_error: "Thalassemia status must be a number",
    })
    .int()
    .min(0, { message: "Thalassemia status must be a positive integer" }),
});

export type PredictionInputSchema = z.infer<typeof PredictionInputSchema>;
