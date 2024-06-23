import React from "react";

import { Navbar } from "@/components/navbar";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Navbar />
      <div className="pt-16">{children}</div>
    </div>
  );
};

export default MainLayout;
