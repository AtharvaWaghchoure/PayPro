"use client";

import { useState, useEffect } from "react";
import { useAccount, usePublicClient, useWalletClient } from "wagmi";
import { getContract } from "@/lib/contract";
import { formatEther } from "viem";
import { AlertCircle, Calendar, Clock, DollarSign, User } from 'lucide-react';

type PaymentDetails = {
  recipient: string;
  amount: bigint;
  period: bigint;
  endTimestamp: bigint;
  isActive: boolean;
  canProcess?: boolean;
};

export function PaymentList({ type }: { type: "organization" | "employee" }) {
  const { address } = useAccount();
  const publicClient = usePublicClient();
  const { data: walletClient } = useWalletClient();
  const [payments, setPayments] = useState<Record<string, PaymentDetails>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [processing, setProcessing] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const fetchPayments = async () => {
      if (!publicClient || !address) {
        setLoading(false);
        return;
      }

      try {
        setError(null);
        const contract = getContract();

        const ids = (await publicClient.readContract({
          ...contract,
          functionName: "getActivePaymentIds",
        })) as bigint[];

        const paymentDetails: Record<string, PaymentDetails> = {};

        for (const id of ids) {
          const details = (await publicClient.readContract({
            ...contract,
            functionName: "recurringPayments",
            args: [id],
          })) as [string, bigint, bigint, bigint, boolean];

          const canProcess = (await publicClient.readContract({
            ...contract,
            functionName: "canProcessPayment",
            args: [id],
          })) as boolean;

          paymentDetails[id.toString()] = {
            recipient: details[0],
            amount: details[1],
            period: details[2],
            endTimestamp: details[3],
            isActive: details[4],
            canProcess,
          };
        }

        setPayments(paymentDetails);
      } catch (err) {
        console.error("Failed to fetch payments:", err);
        setError("Failed to fetch payment details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, [publicClient, address, type]);

  const handleProcessPayment = async (id: string) => {
    if (!walletClient || !publicClient) return;

    try {
      setProcessing((prev) => ({ ...prev, [id]: true }));
      const contract = getContract();

      const hash = await walletClient.writeContract({
        ...contract,
        functionName: "processRecurringPayment",
        args: [BigInt(id)],
      });

      await publicClient.waitForTransactionReceipt({ hash });

      const canProcess = (await publicClient.readContract({
        ...contract,
        functionName: "canProcessPayment",
        args: [BigInt(id)],
      })) as boolean;

      setPayments((prev) => ({
        ...prev,
        [id]: {
          ...prev[id],
          canProcess,
        },
      }));
    } catch (err) {
      console.error("Failed to process payment:", err);
      setError("Failed to process payment. Please try again.");
    } finally {
      setProcessing((prev) => ({ ...prev, [id]: false }));
    }
  };

  const formatAddress = (address: string) => `${address.slice(0, 6)}...${address.slice(-4)}`;

  const formatDate = (timestamp: bigint) => {
    return new Date(Number(timestamp) * 1000).toLocaleDateString();
  };

  const formatPeriod = (period: bigint) => {
    const days = Number(period) / 86400; // Convert seconds to days
    if (days === 1) return "Daily";
    if (days === 7) return "Weekly";
    if (days === 30) return "Monthly";
    return `Every ${days} days`;
  };

  if (!address) {
    return (
      <div className="text-center p-6 bg-yellow-500/10 border border-yellow-500/50 text-yellow-700 rounded-lg">
        Please connect your wallet to view payments
      </div>
    );
  }

  if (loading) {
    return (
      <div className="text-center p-6">
        <div className="animate-pulse text-zinc-400">Loading payments...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-6 bg-red-500/10 border border-red-500/50 text-red-700 rounded-lg flex items-center justify-center space-x-2">
        <AlertCircle className="h-5 w-5" />
        <span>{error}</span>
      </div>
    );
  }

  const paymentIds = Object.keys(payments);

  if (paymentIds.length === 0) {
    return (
      <div className="text-center p-6 bg-zinc-800/50 border border-zinc-700 rounded-lg text-zinc-400">
        No active payments found
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {paymentIds.map((id) => {
        const payment = payments[id];
        const isProcessing = processing[id];

        return (
          <div
            key={id}
            className="border border-zinc-700 rounded-lg p-6 bg-zinc-800/50 hover:bg-zinc-800/70 transition-colors"
          >
            <div className="flex justify-between items-start">
              <div className="space-y-3">
                <div className="text-sm text-zinc-400">Payment ID #{id}</div>
                <div className="flex items-center space-x-2 text-xl font-medium text-white">
                  <DollarSign className="h-5 w-5 text-primary" />
                  <span>{formatEther(payment.amount)} ETH</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-zinc-400">
                  <User className="h-4 w-4" />
                  <span>To: {formatAddress(payment.recipient)}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-zinc-400">
                  <Clock className="h-4 w-4" />
                  <span>Frequency: {formatPeriod(payment.period)}</span>
                </div>
              </div>
              <div className="text-right space-y-3">
                <div className="flex items-center space-x-2 text-sm text-zinc-400">
                  <Calendar className="h-4 w-4" />
                  <span>Ends: {formatDate(payment.endTimestamp)}</span>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <div
                    className={`text-xs px-2 py-1 rounded-full ${
                      payment.isActive
                        ? "bg-green-500/20 text-green-400"
                        : "bg-zinc-500/20 text-zinc-400"
                    }`}
                  >
                    {payment.isActive ? "Active" : "Inactive"}
                  </div>
                  {payment.canProcess && (
                    <button
                      onClick={() => handleProcessPayment(id)}
                      disabled={isProcessing}
                      className={`text-xs px-3 py-1 rounded-full 
                        ${
                          isProcessing
                            ? "bg-primary/20 text-primary/60 cursor-not-allowed"
                            : "bg-primary text-primary-foreground hover:bg-primary/90"
                        } transition-colors`}
                    >
                      {isProcessing ? "Processing..." : "Process Payment"}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

