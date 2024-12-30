"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { PaymentForm } from "@/components/PaymentForm";
import { PaymentList } from "@/components/PaymentList";
import type { User } from "@/lib/types";
import { Users, CreditCard, DollarSign, ArrowRight } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";

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
    return (
      <div className="min-h-screen bg-gradient-to-br from-zinc-900 to-black flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-2xl font-semibold text-white flex items-center gap-2"
        >
          <div className="w-6 h-6 border-t-2 border-primary animate-spin rounded-full" />
          Loading...
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 to-black py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4"
        >
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/50">
            Organization Dashboard
          </h1>
          <button className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
            View Reports <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {[
            { icon: Users, title: "Total Employees", value: "156", trend: "+12% from last month" },
            { icon: CreditCard, title: "Active Payments", value: "23", trend: "+5 new this week" },
            { icon: DollarSign, title: "Total Paid (This Month)", value: "$253,890.00", trend: "+18.3% vs last month" }
          ].map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="bg-zinc-800/50 border-zinc-700/50 backdrop-blur-sm hover:bg-zinc-800/60 transition-colors">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <stat.icon className="h-6 w-6 text-primary mr-2" />
                    <h2 className="text-xl font-semibold text-white">{stat.title}</h2>
                  </div>
                  <p className="text-3xl font-bold text-white mb-2">{stat.value}</p>
                  <p className="text-sm text-zinc-400">{stat.trend}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="bg-zinc-800/50 border-zinc-700/50 backdrop-blur-sm h-full">
              <CardContent className="p-6">
                <h2 className="text-2xl font-semibold text-white mb-6 flex items-center gap-2">
                  Setup New Payment
                  <span className="px-2 py-1 rounded-full bg-primary/10 text-primary text-sm font-normal">
                    New
                  </span>
                </h2>
                <PaymentForm />
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card className="bg-zinc-800/50 border-zinc-700/50 backdrop-blur-sm h-full">
              <CardContent className="p-6">
                <h2 className="text-2xl font-semibold text-white mb-6 flex items-center justify-between">
                  Active Payments
                  <button className="text-sm text-primary hover:text-primary/80 transition-colors">
                    View All
                  </button>
                </h2>
                <PaymentList type="organization" />
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
