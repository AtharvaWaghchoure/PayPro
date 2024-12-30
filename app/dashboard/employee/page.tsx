// app/dashboard/employee/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import PaymentList from "@/components/PaymentList";
import type { User } from "@/lib/types";

export default function EmployeeDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const userData = sessionStorage.getItem("user");
    if (!userData) {
      router.push("/auth/employee");
      return;
    }

    const parsedUser = JSON.parse(userData);
    if (parsedUser.type !== "employee") {
      router.push("/auth/employee");
      return;
    }

    setUser(parsedUser);
  }, [router]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Employee Dashboard</h1>

      <div>
        <h2 className="text-2xl font-semibold mb-4">Your Payments</h2>
        <PaymentList type="employee" />
      </div>
    </div>
  );
}
