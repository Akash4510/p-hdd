import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import { InputForm } from "@/components/forms/input-form";

const PredictionPage = async () => {
  const user = await currentUser();

  if (!user) {
    redirect("/");
  }

  return (
    <div className="w-[94%] max-w-[1300px] mx-auto py-6 pb-20 space-y-8">
      <div>
        <h1 className="text-3xl font-semibold">
          Predict the risk of heart disease
        </h1>
        <p>
          Fill in the values correctly to know the condition of your heart,
          please read the instructions before filling in the values
        </p>
      </div>
      <InputForm userId={user.id} />
    </div>
  );
};

export default PredictionPage;
