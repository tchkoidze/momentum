"use client";
import React, { ReactElement, useEffect, useState } from "react";
import CreateEmployee from "../components/CreateEmployee";
import Header from "../components/Header";
import { usePathname } from "next/navigation";
import { ModalProvider } from "./ModalContext";

interface LayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
  const pathname = usePathname();
  useEffect(() => {
    const referrer = document.referrer;

    if (pathname !== "/tasks") {
      sessionStorage.removeItem("filters");
    }
  }, [pathname]);
  return (
    <ModalProvider>
      <div className="w-full">
        <Header />
        <div className="">{children}</div>

        <CreateEmployee />
      </div>
    </ModalProvider>
  );
}
export default Layout;
