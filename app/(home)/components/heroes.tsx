"use client";

import { Button } from "@/components/ui/button";
import { Loader } from "@/components/ui/loader";
import { SignInButton } from "@clerk/clerk-react";
import { useConvexAuth } from "convex/react";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export const Heroes = () => {
  const { isAuthenticated, isLoading } = useConvexAuth();

  return (
    <main className="container mx-auto px-4 py-12 flex flex-col md:flex-row items-center justify-between">
      <section className="max-w-3xl space-y-6 md:w-1/2">
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold">
          Building a Better Work Environment
        </h1>
        <p className="text-base sm:text-xl md:text-2xl font-medium">
          Join us now to be the first to access exclusive products and updates!
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Revolutionize your workflow with our cutting-edge tools and solutions.
        </p>

        {isLoading && (
          <div className="w-full flex justify-center items-center">
            <Loader />
          </div>
        )}

        {isAuthenticated && !isLoading && (
          <Button asChild>
            <Link href="/documents" aria-label="View our products">
              Our Products <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        )}

        {!isAuthenticated && !isLoading && (
          <SignInButton mode="modal">
            <Button aria-label="Sign up for free">
              Sign up for Free <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </SignInButton>
        )}
      </section>

      <section className="md:w-1/2 mt-8 md:mt-0">
        <div className="relative h-[300px] w-[300px] md:h-[400px] md:w-[400px]">
          <Image
            src="/men.svg"
            alt="Illustration of people working"
            fill
            className="object-cover dark:hidden"
            priority
          />
          <Image
            src="/men-dark.svg"
            alt="Illustration of people working"
            fill
            className="object-cover hidden dark:block"
            priority
          />
        </div>
      </section>
    </main>
  );
};
