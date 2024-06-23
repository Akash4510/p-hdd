"use server";

import axios from "axios";

import { PredictionInputSchema } from "@/schema/prediction-input-schema";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

const mappings = {
  sex: {
    MALE: 1,
    FEMALE: 0,
  },
  cp: {
    TYPICAL_ANGINA: 1,
    ATYPICAL_ANGINA: 2,
    NON_ANGINAL_PAIN: 3,
    ASYMPTOMATIC: 4,
  },
  restecg: {
    NORMAL: 0,
    ST_T_WAVE_ABNORMALITY: 1,
    LEFT_VENTRICUALR_HYPERTROPHY: 2,
  },
  slope: {
    UPSLOPING: 1,
    FLAT: 2,
    DOWNSLOPING: 3,
  },
};

const booleanToNumber = (value: boolean) => (value ? 1 : 0);

const transformData = (data: PredictionInputSchema) => {
  return {
    age: data.age,
    sex: mappings.sex[data.sex],
    cp: mappings.cp[data.cp],
    trestbps: data.trestbps,
    chol: data.chol,
    fbs: booleanToNumber(data.fbs),
    restecg: mappings.restecg[data.restecg],
    thalach: data.thalach,
    exang: booleanToNumber(data.exang),
    oldpeak: data.oldpeak,
    slope: mappings.slope[data.slope],
    ca: data.ca,
    thal: data.thal,
  };
};

export const predictDisease = async (
  userId: string,
  values: PredictionInputSchema
) => {
  const transformedData = transformData(values);

  try {
    const response = await axios.post(
      "http://127.0.0.1:5000/predict",
      transformedData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Success:", response.data);

    const { prediction, prediction_message } = response.data;

    try {
      await db.record.create({
        data: {
          ...values,
          userId,
          prediction: prediction == 0 ? "HEALTHY" : "UNHEALTHY",
        },
      });

      revalidatePath("/dashboard");

      await new Promise((resolve) => setTimeout(resolve, 2000));

      return {
        success: {
          message: "Prediction successfull",
          prediction: prediction,
          predictionMessage: prediction_message,
        },
      };
    } catch (err) {
      console.log(err);
      return {
        error: {
          message: "Error saving record in database!",
        },
      };
    }
  } catch (error) {
    console.error("Error:", error);
    return {
      error: {
        message: "Prediction unsuccessfull",
      },
    };
  }
};
