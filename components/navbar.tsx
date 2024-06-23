import { UserButton } from "@clerk/nextjs";
import React from "react";

export const Navbar = () => {
  return (
    <div className="border-b h-16 flex items-center fixed top-0 left-0 right-0 w-full backdrop-blur-3xl">
      <div className="flex items-center justify-between w-[97%] max-w-[1300px] mx-auto">
        <div>Logo</div>
        <div className="flex items-center justify-between">
          <UserButton
            afterSignOutUrl="/"
            appearance={{
              elements: {
                button: {
                  width: 36,
                  height: 36,
                },
                userButtonAvatarBox: {
                  width: 36,
                  height: 36,
                },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};
