"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Wallet } from "lucide-react";

const mockEarnings = {
  totalEarned: 12500,
  thisMonth: 2450,
  lastMonth: 1800,
  pendingPayout: 350,
  transactions: [
    { id: "tx-1", date: "2026-01-14", description: "Kitchen Sink Repair (Job #1)", amount: 150, type: "Job Payout" },
    { id: "tx-2", date: "2026-01-12", description: "Service Fee (Job #1)", amount: -15, type: "Commission" },
    { id: "tx-3", date: "2026-01-10", description: "Payout to Bank", amount: -1000, type: "Payout" },
    { id: "tx-4", date: "2026-01-09", description: "Ceiling Fan Install (Job #2)", amount: 120, type: "Job Payout" },
    { id: "tx-5", date: "2026-01-07", description: "Garden Maintenance (Job #3)", amount: 180, type: "Job Payout" },
  ],
};

export default function WorkerEarningsPage() {
  const [filter, setFilter] = useState("all"); // 'all', 'payouts', 'commissions'

  const filteredTransactions = mockEarnings.transactions.filter(tx => {
    if (filter === "all") return true;
    if (filter === "payouts") return tx.type === "Job Payout" || tx.type === "Payout";
    if (filter === "commissions") return tx.type === "Commission";
    return false;
  });

  return (
    <div className="flex-1 bg-gray-50 p-6">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Earnings</h1>
        <p className="text-gray-500">Track your income, payouts, and commissions.</p>
      </motion.div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 my-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500">Total Earned</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">${mockEarnings.totalEarned.toLocaleString()}</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500">This Month</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">${mockEarnings.thisMonth.toLocaleString()}</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500">Pending Payout</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">${mockEarnings.pendingPayout.toLocaleString()}</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-primary text-white p-6 rounded-2xl shadow-lg shadow-primary/20 flex flex-col justify-between">
          <p className="text-sm">Ready for Payout</p>
          <button className="flex items-center gap-2 text-white font-bold text-lg mt-auto hover:underline">
            <Wallet className="w-6 h-6" /> Request Payout
          </button>
        </motion.div>
      </div>

      {/* Transaction History */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-bold text-gray-900">Transaction History</h2>
          <div className="flex gap-2">
            {["all", "payouts", "commissions"].map(f => (
              <button 
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1 text-xs font-medium rounded-full transition-colors ${
                  filter === f
                    ? "bg-primary text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="divide-y divide-gray-100">
          {filteredTransactions.length > 0 ? filteredTransactions.map((tx, index) => (
            <motion.div 
              key={tx.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex justify-between items-center py-4"
            >
              <div>
                <p className="font-semibold text-gray-900">{tx.description}</p>
                <p className="text-sm text-gray-500">{tx.date}</p>
              </div>
              <p className={`font-bold text-lg ${tx.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {tx.amount > 0 ? '+' : ''}${tx.amount.toLocaleString()}
              </p>
            </motion.div>
          )) : (
            <div className="py-8 text-center text-gray-500">
              <p>No transactions found for this filter.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
