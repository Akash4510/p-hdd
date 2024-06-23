import React from "react";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { auth, currentUser } from "@clerk/nextjs/server";
import { Button } from "./ui/button";
import Image from "next/image";

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

export const Navbar = async () => {
  const user = await currentUser();

  return (
    <div className="border-b h-16 flex items-center fixed top-0 left-0 right-0 w-full backdrop-blur-3xl">
      <div className="flex items-center justify-between w-[94%] max-w-[1300px] mx-auto">
        <div>
          <Link href="/" className="font-bold text-2xl">
            <Image
              src="/logo.svg"
              alt="logo"
              width={48}
              height={48}
              className="rounded-full p-1 hover:bg-gray-200/30"
            />
          </Link>
        </div>

        <div className="flex items-center justify-center gap-8">
          {navMenus.map((menu) => (
            <Link
              key={menu.href}
              href={menu.href}
              className="hover:underline underline-offset-4"
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
