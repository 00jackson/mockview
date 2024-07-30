"use client"
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function Home() {
  const router = useRouter();

  return (
    <section className="bg-gray-50">
      <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
        <div className="mx-auto max-w-xl text-center">
          <h1 className="text-3xl font-extrabold sm:text-5xl">
            Prepare for Interviews.
            <strong className="font-extrabold text-primary sm:block"> Mock Interviews Made Easy. </strong>
          </h1>

          <p className="mt-4 sm:text-lg/relaxed font-sans">
            Practice your interviews with MockView and improve your skills to ace your next interview!
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button
              className="block w-full rounded bg-primary px-12 py-2 text-sm font-medium text-white shadow hover:bg-blue-700 focus:outline-none focus:ring active:bg-blue-500 sm:w-auto"
              onClick={() => router.push("/sign-up")}
            >
              Get Started
            </Button>

            <Button
              className="block w-full rounded px-12 py-2 text-sm font-medium text-primary shadow hover:text-blue-700 focus:outline-none focus:ring active:text-blue-500 sm:w-auto"
              variant="outline"
              onClick={() => router.push("/sign-in")}
            >
              Log in
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}