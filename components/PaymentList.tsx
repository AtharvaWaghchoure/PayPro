"use client";

import { useState, useEffect } from "react";
import { useAccount, usePublicClient, useWalletClient } from "wagmi";
import { getContract } from "@/lib/contract";
import { formatEther } from "viem";

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

        // Get active payment IDs
        const ids = (await publicClient.readContract({
          ...contract,
          functionName: "getActivePaymentIds",
        })) as bigint[];

        // Fetch details for each payment
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

      // Wait for the transaction to be mined
      await publicClient.waitForTransactionReceipt({ hash });

      // Refresh payment details
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
    const days = Number(period);
    if (days === 1) return "Daily";
    if (days === 7) return "Weekly";
    if (days === 30) return "Monthly";
    return `Every ${days} days`;
  };

  if (!address) {
    return (
      <div className="text-center p-4 bg-yellow-50 rounded-lg">
        Please connect your wallet to view payments
      </div>
    );
  }

  if (loading) {
    return (
      <div className="text-center p-4">
        <div className="animate-pulse">Loading payments...</div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center p-4 bg-red-50 text-red-700 rounded-lg">{error}</div>;
  }

  const paymentIds = Object.keys(payments);

  if (paymentIds.length === 0) {
    return (
      <div className="text-center p-6 bg-gray-50 rounded-lg border">No active payments found</div>
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
            className="border rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start">
              <div className="space-y-2">
                <div className="text-sm text-gray-500">Payment ID #{id}</div>
                <div className="font-medium">{formatEther(payment.amount)} ETH</div>
                <div className="text-sm text-gray-600">To: {formatAddress(payment.recipient)}</div>
                <div className="text-sm text-gray-600">
                  Frequency: {formatPeriod(payment.period)}
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-500">
                  Ends: {formatDate(payment.endTimestamp)}
                </div>
                <div className="flex flex-col gap-2">
                  <div
                    className={`text-sm px-2 py-1 rounded-full inline-block ${
                      payment.isActive ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {payment.isActive ? "Active" : "Inactive"}
                  </div>
                  {payment.canProcess && (
                    <button
                      onClick={() => handleProcessPayment(id)}
                      disabled={isProcessing}
                      className={`text-sm px-3 py-1 rounded-full 
                        ${
                          isProcessing
                            ? "bg-blue-50 text-blue-400 cursor-not-allowed"
                            : "bg-blue-100 text-blue-700 hover:bg-blue-200"
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
