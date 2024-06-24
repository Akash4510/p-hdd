"use client";

import Link from "next/link";
import Image from "next/image";
import { UserButton, useUser } from "@clerk/nextjs";

import { Button } from "./ui/button";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navMenus = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Dashboard",
    href: "/dashboard",
  },
  {
    label: "Prediction",
    href: "/prediction",
  },
];

export const Navbar = () => {
  const { user } = useUser();
  const pathname = usePathname();

  return (
    <div className="border-b h-16 flex items-center fixed top-0 left-0 right-0 w-full backdrop-blur-3xl bg-background/70">
      <div className="flex items-center justify-between w-[94%] max-w-[1300px] mx-auto">
        <div>
          <Link href="/" className="font-bold text-2xl">
            <Image
              src="/logo.svg"
              alt="logo"
              width={54}
              height={54}
              className="rounded-full hover:bg-gray-200/30"
            />
          </Link>
        </div>

        <div className="flex items-center justify-center gap-4">
          {navMenus.map((menu) => (
            <Link
              key={menu.href}
              href={menu.href}
              className={cn(
                "hover:bg-muted px-4 py-1.5 rounded-md",
                pathname === menu.href && "bg-muted"
              )}
            >
              {menu.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center justify-between gap-2">
          {user ? (
            <UserButton
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  userButtonAvatarBox: {
                    width: 36,
                    height: 36,
                  },
                },
              }}
            />
          ) : (
            <>
              <Button variant="secondary" asChild>
                <Link href="/sign-in">Login</Link>
              </Button>
              <Button asChild>
                <Link href="/sign-up">Register</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
