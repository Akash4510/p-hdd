import Link from "next/link";

import { Button } from "@/components/ui/button";

const HomePage = () => {
  return (
    <main>
      <div>
        <h1>Heart Disease detection</h1>
        <Button asChild>
          <Link href="/prediction">Predict</Link>
        </Button>
      </div>
    </main>
  );
};

export default HomePage;
