"use client";

import { useState } from "react";
import { parseEther } from "viem";
import { useAccount, useWalletClient, usePublicClient } from "wagmi";
import { getContract } from "@/lib/contract";

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
      const interval = BigInt(formData.get("interval") as string); // Direct seconds input

      const contract = getContract();

      const { request } = await publicClient.simulateContract({
        address: contract.address,
        abi: contract.abi,
        functionName: "setupRecurringPayment",
        args: [recipient, amount, interval],
        account: address,
      });

      const hash = await walletClient.writeContract(request);
      const receipt = await publicClient.waitForTransactionReceipt({ hash });
      form.reset();
    } catch (err) {
      console.error("Payment setup error:", err);
      setError("Failed to setup payment: " + (err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <div className="bg-red-100 text-red-700 p-3 rounded">{error}</div>}

      <div>
        <label className="block text-sm font-medium mb-1">Recipient Address</label>
        <input
          name="recipient"
          required
          className="w-full px-3 py-2 border rounded"
          placeholder="0x..."
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Amount (GAS)</label>
        <input
          type="number"
          name="amount"
          step="0.000000000000000001"
          required
          className="w-full px-3 py-2 border rounded"
          placeholder="0.0"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Interval</label>
        <input
          type="number"
          name="interval"
          required
          className="w-full px-3 py-2 border rounded"
          placeholder="1"
        />
      </div>

      <button
        type="submit"
        disabled={loading || !address || !walletClient}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:bg-blue-300"
      >
        {!address ? "Connect Wallet" : loading ? "Setting up..." : "Setup Payment"}
      </button>
    </form>
  );
}
