"use client";

import { useEffect, useRef, useState, useTransition } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { PredictionInputSchema } from "@/schema/prediction-input-schema";
import { Loader2 } from "lucide-react";
import { predictDisease } from "@/server/actions";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { cn } from "@/lib/utils";

interface InputFormProps {
  userId: string;
}

export const InputForm = ({ userId }: InputFormProps) => {
  const [isPending, startTransition] = useTransition();
  const [predictionResult, setPredictionResult] = useState<string>("");
  const ref = useRef<HTMLDivElement | null>(null);

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

  // useEffect(() => {
  //   if (predictionResultBoxRef.current) {
  //     predictionResultBoxRef.current.scrollIntoView({ behavior: "smooth" });
  //   }
  // }, [predictionResult]);

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
            setPredictionResult(success.predictionMessage);
            ref?.current?.scrollIntoView({
              behavior: "smooth",
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
        <div ref={ref} className="scroll-m-52">
          <h1 className="text-3xl font-semibold">
            Predict the risk of heart disease
          </h1>
          <p>
            Fill in the values correctly to know the condition of your heart,
            please read the instructions before filling in the values
          </p>
        </div>

        {predictionResult && (
          <div
            className={cn(
              "rounded-lg py-10 px-6 bg-purple-600 text-white",
              predictionResult ===
                "Your heart seems to be unhealthy, please consult your doctor" &&
                "bg-red-500"
            )}
          >
            <p>Prediction Result</p>
            <p className="text-2xl font-semibold">{predictionResult}</p>
          </div>
        )}

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <FormField
            control={form.control}
            name="age"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Age</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Your age..."
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

          <FormField
            control={form.control}
            name="sex"
            render={({ field }) => (
              <FormItem className="w-full flex flex-col items-start">
                <FormLabel>Sex</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex items-center gap-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="MALE" id="male" />
                      <Label htmlFor="male">Male</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="FEMALE" id="female" />
                      <Label htmlFor="female">Female</Label>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="trestbps"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Trestbps</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="eg. 100"
                    disabled={isPending}
                    {...field}
                    {...form.register("trestbps", { valueAsNumber: true })}
                  />
                </FormControl>
                <FormDescription>Enter your trestbps</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <FormField
            control={form.control}
            name="cp"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Chest Pain</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select the type of chest pain" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="TYPICAL_ANGINA">
                      Typical Angina
                    </SelectItem>
                    <SelectItem value="ATYPICAL_ANGINA">
                      Atypical Angina
                    </SelectItem>
                    <SelectItem value="NON_ANGINAL_PAIN">
                      Non Angial Pain
                    </SelectItem>
                    <SelectItem value="ASYMPTOMATIC">Asymptomatic</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  Choose the type of chest pain you are having
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="chol"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Cholestrol</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="eg. 100"
                    disabled={isPending}
                    {...field}
                    {...form.register("chol", { valueAsNumber: true })}
                  />
                </FormControl>
                <FormDescription>Enter your cholestrol</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <FormField
            control={form.control}
            name="fbs"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>FBS</FormLabel>
                <div className="flex flex-row items-start space-x-3 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <p className="space-y-1 leading-none">
                    My sugar level is higher than 120
                  </p>
                </div>
                <FormDescription>
                  Enter information about your blood sugar level
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="slope"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Slope</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select the restecg status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="UPSLOPING">Upsloping</SelectItem>
                    <SelectItem value="FLAT">flat</SelectItem>
                    <SelectItem value="DOWNSLOPING">Downsloping</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>Choose the slope</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <FormField
            control={form.control}
            name="restecg"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Rest ECG</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select the restecg status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="NORMAL">Normal</SelectItem>
                    <SelectItem value="ST_T_WAVE_ABNORMALITY">
                      ST T Wave Abnormality
                    </SelectItem>
                    <SelectItem value="LEFT_VENTRICUALR_HYPERTROPHY">
                      Left Ventricular Hypertrophy
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  Choose the type of ecg Abnormality
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="thalach"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Thalac</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="eg. 100"
                    disabled={isPending}
                    {...field}
                    {...form.register("thalach", { valueAsNumber: true })}
                  />
                </FormControl>
                <FormDescription>Enter your thalach</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <FormField
            control={form.control}
            name="exang"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Excercise included angina</FormLabel>
                <div className="flex flex-row items-start space-x-3 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <p className="space-y-1 leading-none">
                    I have exercise included angina
                  </p>
                </div>
                <FormDescription>
                  Enter information about angina
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="oldpeak"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Old Peak</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="eg. 100"
                    disabled={isPending}
                    {...field}
                    {...form.register("oldpeak", { valueAsNumber: true })}
                  />
                </FormControl>
                <FormDescription>
                  ST depression induced by exercise relative to rest
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <FormField
            control={form.control}
            name="ca"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Ca</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="eg. 100"
                    disabled={isPending}
                    {...field}
                    {...form.register("ca", { valueAsNumber: true })}
                  />
                </FormControl>
                <FormDescription>Enter information about ca</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="thal"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Thal</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="eg. 100"
                    disabled={isPending}
                    {...field}
                    {...form.register("thal", { valueAsNumber: true })}
                  />
                </FormControl>
                <FormDescription>Enter thal</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" disabled={isPending} className="w-32">
          {isPending ? <Loader2 className="animate-spin size-4" /> : "Predict"}
        </Button>
      </form>
    </Form>
  );
};
