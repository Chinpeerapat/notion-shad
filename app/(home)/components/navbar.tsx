"use client";

import React, { useMemo } from "react";
import { Logo } from "./logo";
import { ModeToggle } from "@/components/shared/mode-toggle";
import { Button, ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SignInButton, UserButton } from "@clerk/clerk-react";
import { useConvexAuth } from "convex/react";
import Link from "next/link";
import { Loader } from "@/components/ui/loader";
import { useScrolled } from "@/hooks/use-scrolled";

interface NavButtonProps extends ButtonProps {
  children: React.ReactNode;
}

const NavButton = React.memo<NavButtonProps>(({ children, ...props }) => (
  <Button size="sm" {...props}>
    {children}
  </Button>
));

NavButton.displayName = "NavButton"; // Add this line to set the display name

export const Navbar = () => {
  const { isAuthenticated, isLoading } = useConvexAuth();
  const scrolled = useScrolled();

  const navbarClass = useMemo(
    () =>
      cn(
        "z-50 bg-background fixed top-0 flex items-center w-full p-6 justify-between transition-all duration-300",
        scrolled && "border-b shadow-sm"
      ),
    [scrolled]
  );

  const renderAuthButtons = () => {
    if (isLoading) return <Loader />;
    if (!isAuthenticated) {
      return (
        <>
          <SignInButton mode="modal">
            <NavButton variant="ghost" aria-label="Log In">
              Log In
            </NavButton>
          </SignInButton>
          <SignInButton mode="modal">
            <NavButton aria-label="Get Notion Free">Get Notion Free</NavButton>
          </SignInButton>
        </>
      );
    }
    return (
      <>
        <NavButton variant="ghost" asChild>
          <Link href="/documents" aria-label="Enter Notion">
            Enter Notion
          </Link>
        </NavButton>
        <UserButton afterSignOutUrl="/" />
      </>
    );
  };

  return (
    <nav className={navbarClass}>
      <Logo />
      <div className="flex items-center gap-x-2">
        {renderAuthButtons()}
        <ModeToggle />
      </div>
    </nav>
  );
};
