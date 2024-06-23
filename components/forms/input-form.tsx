"use client";

import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PredictionInputSchema } from "@/schema/prediction-input-schema";
import { Loader2 } from "lucide-react";
import { predictDisease } from "@/server/actions";

interface InputFormProps {
  userId: string;
}

export const InputForm = ({ userId }: InputFormProps) => {
  const [isPending, startTransition] = useTransition();

  const form = useForm<PredictionInputSchema>({
    resolver: zodResolver(PredictionInputSchema),
    defaultValues: {
      age: 60,
      sex: "MALE",
      cp: "ATYPICAL_ANGINA",
      trestbps: 140,
      chol: 185,
      fbs: false,
      restecg: "NORMAL",
      thalach: 155,
      exang: false,
      oldpeak: 3,
      slope: "UPSLOPING",
      ca: 0,
      thal: 2,
    },
  });

  const { handleSubmit } = form;

  const onSubmit = async (values: PredictionInputSchema) => {
    console.log(values);

    startTransition(() => {
      predictDisease(userId, values)
        .then((data) => {
          const { error, success } = data;

          if (success) {
            toast.success(success.message);
            console.log({
              prediction: success.prediction,
              message: success.predictionMessage,
            });
          }
          if (error) {
            console.log(error);
            toast.error(error.message);
          }
        })
        .catch((err) => {
          console.log(err);
          toast.error("Something went wrong");
        });
    });
  };

  const onError = (errors: any) => {
    console.error("Form Errors:", errors);
    toast.error("Form error");
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit, onError)} className="space-y-8">
        <FormField
          control={form.control}
          name="age"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Age</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="shadcn"
                  disabled={isPending}
                  {...field}
                  {...form.register("age", { valueAsNumber: true })}
                />
              </FormControl>
              <FormDescription>Enter your age</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isPending} className="w-32">
          {isPending ? <Loader2 className="animate-spin size-4" /> : "Predict"}
        </Button>
      </form>
    </Form>
  );
};
