"use client";

import Tasks from "./(routes)/tasks/page";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    if (window.location.pathname === "/") {
      router.push("/tasks");
    }
  }, [router]);
  return (
    <main>
      <Tasks />
    </main>
  );
}
