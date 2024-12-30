"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { PaymentForm } from "@/components/PaymentForm";
import { PaymentList } from "@/components/PaymentList";
import type { User } from "@/lib/types";

export default function OrganizationDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const userData = sessionStorage.getItem("user");
    if (!userData) {
      router.push("/auth/organization");
      return;
    }

    const parsedUser = JSON.parse(userData);
    if (parsedUser.type !== "organization") {
      router.push("/auth/organization");
      return;
    }

    setUser(parsedUser);
  }, [router]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Organization Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Setup New Payment</h2>
          <PaymentForm />
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">Active Payments</h2>
          <PaymentList type="organization" />
        </div>
      </div>
    </div>
  );
}
