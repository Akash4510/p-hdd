import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import { db } from "@/lib/db";

const DashboardPage = async () => {
  const user = await currentUser();

  if (!user) {
    redirect("/");
  }

  const userRecords = await db.record.findMany({
    where: { userId: user.id },
  });

  return (
    <div className="w-[94%] max-w-[1300px] mx-auto py-4">
      DashboardPage
      <h1>User: {user.fullName}</h1>
      <div className="grid grid-cols-3 gap-6 mt-12">
        {userRecords.map((record) => (
          <div key={record.id} className="border rounded-md p-4">
            <p>{record.prediction}</p>
            <p>{record.createdAt.toISOString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardPage;
