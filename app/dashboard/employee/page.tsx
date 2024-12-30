"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {PaymentList} from "@/components/PaymentList";
import type { User } from "@/lib/types";
import { Wallet, ArrowDownCircle } from 'lucide-react';

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
    return (
      <div className="min-h-screen bg-gradient-dark flex items-center justify-center">
        <div className="text-2xl font-semibold text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-dark py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gradient mb-8">Employee Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-zinc-800/50 p-6 rounded-xl border border-zinc-700">
            <div className="flex items-center mb-4">
              <Wallet className="h-6 w-6 text-primary mr-2" />
              <h2 className="text-2xl font-semibold text-white">Wallet Balance</h2>
            </div>
            <p className="text-3xl font-bold text-white">$5,234.56</p>
          </div>
          <div className="bg-zinc-800/50 p-6 rounded-xl border border-zinc-700">
            <div className="flex items-center mb-4">
              <ArrowDownCircle className="h-6 w-6 text-primary mr-2" />
              <h2 className="text-2xl font-semibold text-white">Last Payment</h2>
            </div>
            <p className="text-3xl font-bold text-white">$1,500.00</p>
            <p className="text-sm text-zinc-400">Received on May 1, 2023</p>
          </div>
        </div>

        <div className="bg-zinc-800/50 p-6 rounded-xl border border-zinc-700">
          <h2 className="text-2xl font-semibold text-white mb-6">Your Payments</h2>
          <PaymentList type="employee" />
        </div>
      </div>
    </div>
  );
}

