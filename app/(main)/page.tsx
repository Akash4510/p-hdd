import Link from "next/link";
import Image from "next/image";

import { Button } from "@/components/ui/button";

const HomePage = () => {
  return (
    <>
      <div className="relative">
        {/* <div className="absolute -z-10 w-full h-full inset-0">
          <Image
            className="w-[50%] h-full object-cover"
            src="/heart-health.webp"
            quality={100}
            alt="heart-health"
            width={100}
            height={100}
          />
        </div> */}

        <section className="w-[94%] max-w-[1300px] mx-auto py-4" id="about">
          <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
            <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0">
              <Image
                className="object-cover object-center rounded-xl"
                alt="hero"
                src="/heart-health.webp"
                width={540}
                height={540}
              />
            </div>

            <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
              <h2 className="text-4xl font-bold">Healthy Heart</h2>
              <p className="text-xl mb-4">A Heart Disease Prediction System</p>

              <p className="mb-6 leading-relaxed text-gray-600">
                A &quot;Heart Disease Prediction&quot; system is a specialized
                tool designed to assess an individual&apos;s risk of developing
                cardiovascular diseases (CVD) such as heart attacks or strokes.
                This system typically leverages a combination of machine
                learning algorithms, statistical analysis, and medical data to
                predict heart Disease outcomes. The primary objective is to
                provide early warnings and personalized insights, enabling
                timely medical interventions and lifestyle changes to mitigate
                risk.
              </p>

              <div className="flex justify-center">
                <Button asChild size="lg" className="">
                  <Link href="/prediction">
                    Predict the risk of heart disease
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>

      <footer
        className="text-gray-600 body-font border-t w-[94%] max-w-[1300px] mx-auto py-4"
        id="contact"
      >
        <div className="container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col">
          <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
            <Image
              className="w-[4.5rem] aspect-square"
              src="/logo.svg"
              alt="logo"
              width={30}
              height={30}
            />
            <span className=" self-center text-2xl font-semibold whitespace-nowrap ml-3 text-gray-900">
              Happy <span className="text-[rgb(255, 0, 0)]">Heart</span>
            </span>
          </a>
          <p className="text-sm text-gray-500 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:mt-0 mt-4">
            ©2024 Happy Heart
            <p>happyheart@gmail.com</p>
          </p>

          <span className="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
            <a className="text-gray-500">
              <svg
                fill="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                className="w-5 h-5"
                viewBox="0 0 24 24"
              >
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
              </svg>
            </a>
            <a className="ml-6 text-gray-500">
              <svg
                fill="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                className="w-5 h-5"
                viewBox="0 0 24 24"
              >
                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
              </svg>
            </a>
            <a className="ml-6 text-gray-500">
              <svg
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                className="w-5 h-5"
                viewBox="0 0 24 24"
              >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
              </svg>
            </a>
            <a className="ml-6 text-gray-500">
              <svg
                fill="currentColor"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="0"
                className="w-5 h-5"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="none"
                  d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"
                ></path>
                <circle cx="4" cy="4" r="2" stroke="none"></circle>
              </svg>
            </a>
          </span>
        </div>
      </footer>
    </>
  );
};

export default HomePage;
