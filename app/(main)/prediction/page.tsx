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
      <InputForm userId={user.id} />
    </div>
  );
};

export default PredictionPage;
