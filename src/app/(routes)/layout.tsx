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
  // const [showAddEmployeeMOdal, setShowAddEmployeeMOdal] = useState(false);

  const pathname = usePathname();
  useEffect(() => {
    const referrer = document.referrer;

    if (pathname !== "/tasks") {
      // Only clear storage when NOT on home page
      sessionStorage.removeItem("filters");
      sessionStorage.removeItem("prioritySelector");
      sessionStorage.removeItem("employeeSelector");
      sessionStorage.removeItem("departmentSelector");

      console.log("Session storage cleared on navigation:", pathname);
    }
  }, [pathname]);
  return (
    <ModalProvider>
      <div className="w-full">
        <Header
        // showAddEmployeeMOdal={showAddEmployeeMOdal}
        // setShowAddEmployeeMOdal={setShowAddEmployeeMOdal}
        />
        <div className="flex justify-center">{children}</div>
        {/* {showAddEmployeeMOdal && ( */}
        <CreateEmployee
        // showAddEmployeeMOdal={showAddEmployeeMOdal}
        // setShowAddEmployeeMOdal={setShowAddEmployeeMOdal}
        />
        {/* )} */}
      </div>
    </ModalProvider>
  );
}
export default Layout;
