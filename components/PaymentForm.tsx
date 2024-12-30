"use client";

import { useState } from "react";
import { parseEther } from "viem";
import { useAccount, useWalletClient, usePublicClient } from "wagmi";
import { getContract } from "@/lib/contract";
import { Wallet, Clock, DollarSign, AlertCircle } from 'lucide-react';

export function PaymentForm() {
  const { address } = useAccount();
  const { data: walletClient } = useWalletClient();
  const publicClient = usePublicClient();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!address || !walletClient || !publicClient) return;

    const form = e.currentTarget;
    setLoading(true);
    setError("");

    try {
      const formData = new FormData(form);
      const recipient = formData.get("recipient") as string;
      const amount = parseEther(formData.get("amount") as string);
      const interval = BigInt(formData.get("interval") as string);

      const contract = getContract();

      const { request } = await publicClient.simulateContract({
        address: contract.address,
        abi: contract.abi,
        functionName: "setupRecurringPayment",
        args: [recipient, amount, interval],
        account: address,
      });

      const hash = await walletClient.writeContract(request);
      await publicClient.waitForTransactionReceipt({ hash });
      form.reset();
    } catch (err) {
      console.error("Payment setup error:", err);
      setError("Failed to setup payment: " + (err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-500/10 border border-red-500/50 text-red-700 p-4 rounded-lg flex items-center space-x-2">
          <AlertCircle className="h-5 w-5" />
          <span>{error}</span>
        </div>
      )}

      <div className="space-y-2">
        <label className="block text-sm font-medium text-zinc-200">Recipient Address</label>
        <div className="relative">
          <input
            name="recipient"
            required
            className="w-full px-4 py-2 bg-zinc-800/50 border border-zinc-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent pl-10"
            placeholder="0x..."
          />
          <Wallet className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-500 h-5 w-5" />
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-zinc-200">Amount (GAS)</label>
        <div className="relative">
          <input
            type="number"
            name="amount"
            step="0.000000000000000001"
            required
            className="w-full px-4 py-2 bg-zinc-800/50 border border-zinc-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent pl-10"
            placeholder="0.0"
          />
          <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-500 h-5 w-5" />
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-zinc-200">Interval (in seconds)</label>
        <div className="relative">
          <input
            type="number"
            name="interval"
            required
            className="w-full px-4 py-2 bg-zinc-800/50 border border-zinc-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent pl-10"
            placeholder="86400"
          />
          <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-500 h-5 w-5" />
        </div>
      </div>

      <button
        type="submit"
        disabled={loading || !address || !walletClient}
        className="w-full bg-primary text-primary-foreground py-2 rounded-lg hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-zinc-900 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {!address ? "Connect Wallet" : loading ? "Setting up..." : "Setup Payment"}
      </button>
    </form>
  );
}

