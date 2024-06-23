import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import { InputForm } from "@/components/forms/input-form";

const PredictionPage = async () => {
  const user = await currentUser();

  if (!user) {
    redirect("/");
  }

  return (
    <div className="w-[97%] max-w-[1300px] mx-auto py-4">
      <h1 className="text-2xl font-bold">Predict the risk of heart disease</h1>
      <InputForm userId={user.id} />
    </div>
  );
};

export default PredictionPage;
