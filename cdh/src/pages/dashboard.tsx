"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

// ICONS
import { Wallet, FileSignature, Coins, ArrowRightCircle, Send, Home, Activity, TrendingUp } from "lucide-react";

// RECHARTS
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

const Dashboard = () => {
  const [walletAPI, setWalletAPI] = useState<any>(null);
  const [address, setAddress] = useState("");
  const [balance, setBalance] = useState("");
  const [lovelace, setLovelace] = useState("");
  const [signedData, setSignedData] = useState("");
  const [txHistory, setTxHistory] = useState<any[]>([]);
  const [blocks, setBlocks] = useState<any[]>([]);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // -------------------------
  // CONNECT WALLET
  // -------------------------
  const connectWallet = async () => {
    try {
      const api = await window.cardano.eternl.enable();
      setWalletAPI(api);

      const networkId = await api.getNetworkId();
      if (networkId !== 0) {
        alert("Please switch to Preprod network!");
        return;
      }

      const used = await api.getUsedAddresses();
      setAddress(used[0] || "");

      const bal = await api.getBalance();
      setBalance(bal);
    } catch (err) {
      console.error("Wallet connect error:", err);
    }
  };

  // -------------------------
  // LOVELACE BALANCE
  // -------------------------
  const getLovelaceBalance = async () => {
    if (!walletAPI) return alert("Connect wallet first!");
    try {
      const balanceHex = await walletAPI.getBalance();
      const lovelaceAmount = parseInt(balanceHex, 16);
      setLovelace(lovelaceAmount.toLocaleString());
    } catch (err) {
      console.error(err);
    }
  };

  // -------------------------
  // SIGN DATA
  // -------------------------
  const signData = async () => {
    if (!walletAPI) return alert("Connect wallet first!");
    try {
      const message = "48656c6c6f20536d6172742057616c6c6574"; // "Hello Smart Wallet"
      const signed = await walletAPI.signData(address, message);
      setSignedData(JSON.stringify(signed, null, 2));
    } catch (err) {
      console.error(err);
    }
  };

  // -------------------------
  // FETCH TRANSACTION HISTORY
  // -------------------------
  const getTxHistory = async () => {
    if (!address) return alert("Connect wallet first!");
    try {
      const res = await fetch(`/api/tx-history?address=${address}`);
      if (!res.ok) throw new Error("Failed to fetch tx from backend");

      const data = await res.json();
      setTxHistory(data);
    } catch (err) {
      console.error("ERR:", err);
    }
  };

  // -------------------------
  // FETCH BLOCKS AND UPDATE MONGODB
  // -------------------------
  const fetchLatestBlock = async () => {
    try {
      const res = await fetch("/api/save-block");
      if (!res.ok) throw new Error("Failed to save block to backend");

      const data = await res.json();
      console.log("Saved latest block:", data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchBlocksForGraph = async () => {
    try {
      const res = await fetch("/api/get-blocks");
      if (!res.ok) throw new Error("Failed to fetch blocks");

      const data = await res.json();
      setBlocks(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchLatestBlock();
    fetchBlocksForGraph();
    const interval = setInterval(() => {
      fetchLatestBlock();
      fetchBlocksForGraph();
    }, 30000); // update every 30s
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-black text-white min-h-screen overflow-x-hidden">
      
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Content Wrapper */}
      <div className="relative z-10">
        
        {/* Navigation */}
        <motion.nav 
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
            isScrolled 
              ? 'bg-black/90 backdrop-blur-xl border-b border-gray-800/50 shadow-lg' 
              : 'bg-transparent'
          }`}
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex justify-between items-center h-16 md:h-20">
              
              {/* Logo */}
              <Link href="/">
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center space-x-2 cursor-pointer"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-lg"></div>
                  <span className="text-xl md:text-2xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent">
                    MyWallet
                  </span>
                </motion.div>
              </Link>

              {/* Desktop Menu */}
              <div className="hidden md:flex items-center space-x-8">
                <Link href="/" className="text-gray-300 hover:text-cyan-400 transition-colors font-medium flex items-center gap-2">
                  <Home size={18} /> Home
                </Link>
                <Link href="/dashboard" className="text-cyan-400 font-medium flex items-center gap-2">
                  <Activity size={18} /> Dashboard
                </Link>
              </div>

              {/* Wallet Status */}
              <div className="flex items-center gap-3">
                {address && (
                  <div className="hidden md:flex items-center gap-2 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/30 rounded-full px-4 py-2">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    <span className="text-sm text-cyan-400 font-medium">Connected</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.nav>

        {/* Main Content */}
        <div className="pt-24 pb-16 px-6">
          <div className="max-w-6xl mx-auto">
            
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent">
                  Smart Wallet Dashboard
                </span>
              </h1>
              <p className="text-gray-400 text-lg">
                Manage your Cardano assets with ease and security
              </p>
            </motion.div>

            {/* Connect Wallet Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-8"
            >
              <div className="bg-gradient-to-br from-gray-900/50 to-gray-950/50 backdrop-blur-xl border border-gray-800 rounded-2xl p-6 md:p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center">
                    <Wallet size={20} />
                  </div>
                  <h2 className="text-2xl font-bold">Wallet Connection</h2>
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={connectWallet}
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold py-4 px-6 rounded-xl shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-all flex items-center justify-center gap-2"
                >
                  <Wallet size={20} />
                  {address ? 'Wallet Connected' : 'Connect Eternl (Preprod)'}
                </motion.button>

                {address && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mt-4 bg-gray-900/50 border border-gray-800 rounded-xl p-4"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-sm font-semibold text-cyan-400">Connected Address:</span>
                    </div>
                    <p className="text-sm text-gray-300 break-all font-mono">{address}</p>
                  </motion.div>
                )}
              </div>
            </motion.div>

            {/* Grid Layout */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              
              {/* Balance Card */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-gradient-to-br from-gray-900/50 to-gray-950/50 backdrop-blur-xl border border-gray-800 hover:border-emerald-500/50 rounded-2xl p-6 md:p-8 transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-green-500 rounded-xl flex items-center justify-center">
                    <Coins size={20} />
                  </div>
                  <h2 className="text-2xl font-bold">Wallet Balance</h2>
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={getLovelaceBalance}
                  className="w-full bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white font-semibold py-4 px-6 rounded-xl shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 transition-all"
                >
                  Get Lovelace Balance
                </motion.button>

                {lovelace && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mt-6 p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl"
                  >
                    <div className="text-sm text-emerald-400 mb-1">Current Balance</div>
                    <div className="text-3xl font-bold text-emerald-400 font-mono">₳ {lovelace}</div>
                    <div className="text-xs text-gray-500 mt-1">Lovelace</div>
                  </motion.div>
                )}
              </motion.div>

              {/* Sign Data Card */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-gradient-to-br from-gray-900/50 to-gray-950/50 backdrop-blur-xl border border-gray-800 hover:border-purple-500/50 rounded-2xl p-6 md:p-8 transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                    <FileSignature size={20} />
                  </div>
                  <h2 className="text-2xl font-bold">Data Signing</h2>
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={signData}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-semibold py-4 px-6 rounded-xl shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transition-all"
                >
                  Sign Data
                </motion.button>

                {signedData && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mt-4"
                  >
                    <div className="text-sm text-purple-400 mb-2">Signed Data:</div>
                    <pre className="bg-gray-900 border border-gray-800 rounded-xl p-4 text-xs overflow-auto max-h-48 text-gray-300 font-mono">
                      {signedData}
                    </pre>
                  </motion.div>
                )}
              </motion.div>
            </div>

            {/* Transaction History */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mb-8"
            >
              <div className="bg-gradient-to-br from-gray-900/50 to-gray-950/50 backdrop-blur-xl border border-gray-800 hover:border-orange-500/50 rounded-2xl p-6 md:p-8 transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
                    <Send size={20} />
                  </div>
                  <h2 className="text-2xl font-bold">Transaction History</h2>
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={getTxHistory}
                  className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 text-white font-semibold py-4 px-6 rounded-xl shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 transition-all"
                >
                  Get Transactions
                </motion.button>

                {txHistory.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-4 space-y-2 max-h-60 overflow-auto"
                  >
                    {txHistory.map((tx, i) => (
                      <div 
                        key={i} 
                        className="bg-gray-900/50 border border-gray-800 rounded-lg p-4 hover:border-orange-500/30 transition-all"
                      >
    <p><b>Amount:</b> {tx.amount} ADA</p>
    <p><b>Fees:</b> {(tx.fees / 1_000_000).toFixed(6)} ADA</p>
    <p><b>Date:</b> {new Date(tx.timestamp).toLocaleString()}</p>
                        <div className="flex flex-col gap-2">
                          <div className="flex items-start gap-2">
                            <span className="text-orange-400 font-semibold text-sm">Tx Hash:</span>
                            <span className="text-gray-300 text-sm font-mono break-all">{tx.tx_hash}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-orange-400 font-semibold text-sm">Block:</span>
                            <span className="text-gray-300 text-sm">{tx.block_height}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </motion.div>
                )}
              </div>
            </motion.div>

            {/* Output Trend Graph */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mb-8"
            >
              <div className="bg-gradient-to-br from-gray-900/50 to-gray-950/50 backdrop-blur-xl border border-gray-800 hover:border-cyan-500/50 rounded-2xl p-6 md:p-8 transition-all duration-300">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center">
                    <TrendingUp size={20} />
                  </div>
                  <h2 className="text-2xl font-bold">Output Trend</h2>
                </div>
                
                <div className="bg-gray-900/50 rounded-xl p-4 border border-gray-800">
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={blocks}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="height" stroke="#9CA3AF" />
                      <YAxis stroke="#9CA3AF" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#111827', 
                          border: '1px solid #374151',
                          borderRadius: '8px'
                        }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="output" 
                        stroke="#06B6D4" 
                        strokeWidth={2}
                        dot={{ fill: '#06B6D4', r: 4 }}
                        activeDot={{ r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </motion.div>

            {/* Navigation to Transaction Page */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <div className="bg-gradient-to-br from-gray-900/50 to-gray-950/50 backdrop-blur-xl border border-gray-800 hover:border-blue-500/50 rounded-2xl p-6 md:p-8 transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center">
                    <ArrowRightCircle size={20} />
                  </div>
                  <h2 className="text-2xl font-bold">Quick Actions</h2>
                </div>
                
                <div className="space-y-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => (window.location.href = "/transaction.html")}
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold py-4 px-6 rounded-xl shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all flex items-center justify-center gap-2"
                  >
                    <Send size={20} />
                    Go to Transactions Page
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.02, boxShadow: "0 0 30px rgba(6, 182, 212, 0.6)" }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => (window.location.href = "http://localhost:3001")}
                    className="w-full bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 text-white font-semibold py-4 px-6 rounded-xl shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 transition-all flex items-center justify-center gap-2"
                  >
                    <TrendingUp size={20} />
                    🔮 Live Market Prediction
                  </motion.button>
                </div>
              </div>
            </motion.div>

          </div>
        </div>

        {/* Footer */}
        <footer className="border-t border-gray-800/50 py-8 px-6 mt-12">
          <div className="max-w-6xl mx-auto text-center">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <div className="w-6 h-6 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-lg"></div>
              <span className="text-lg font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                MyWallet
              </span>
            </div>
            <p className="text-gray-500 text-sm">
              Smart Wallet Dashboard • © 2025 • Built for Cardano
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Dashboard;