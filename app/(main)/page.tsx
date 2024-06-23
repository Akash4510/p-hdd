import Link from "next/link";
import Image from "next/image";

import { Button } from "@/components/ui/button";

const HomePage = () => {
  return (
    <div className="w-[94%] max-w-[1300px] mx-auto py-4">
      <section className="text-gray-600 body-font" id="about">
        <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
          <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0">
            <Image
              className="object-cover object-center rounded-md"
              alt="hero"
              src="/heart_health.jpg"
              width={540}
              height={540}
            />
          </div>
          <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
            <h1 className="title-font sm:text-4xl text-3xl mb-4 font-bold text-gray-900">
              Heart Disease Prediction
              <br className="hidden lg:inline-block" />
              Healthy Heart Happy Life.
            </h1>
            <p className="mb-8 leading-relaxed">
              A &quot;Heart Disease Prediction&quot; system is a specialized
              tool designed to assess an individual&apos;s risk of developing
              cardiovascular diseases (CVD) such as heart attacks or strokes.
              This system typically leverages a combination of machine learning
              algorithms, statistical analysis, and medical data to predict
              heart Disease outcomes. The primary objective is to provide early
              warnings and personalized insights, enabling timely medical
              interventions and lifestyle changes to mitigate risk. It is a
              simple approch to predict, Future Heart condition of people by
              taking the basic inputs like Age, Gender, Cholestrol and
              Heartbeats, where a normal person can track using some wrist band
              or something.
            </p>

            <div className="flex justify-center">
              <Button asChild size="lg" className="">
                <Link href="/prediction">Predict the risk of your heart</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
