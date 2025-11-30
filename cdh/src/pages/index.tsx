"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function HomePage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features = [
    {
      icon: "🔗",
      title: "Multi-Wallet Support",
      description: "Connect seamlessly with Eternl, Nami, and all major Cardano wallets through a unified interface"
    },
    {
      icon: "⚡",
      title: "Real-Time Updates",
      description: "Instant balance synchronization and live transaction tracking for complete visibility"
    },
    {
      icon: "🔒",
      title: "Military-Grade Security",
      description: "Your private keys stay on your device. We never store or access your sensitive data"
    },
    {
      icon: "🎯",
      title: "Smart Transactions",
      description: "Sign and manage transactions with confidence through our intuitive interface"
    }
  ];

  const techStack = [
    "Next.js 14",
    "React",
    "TypeScript",
    "Cardano",
    "Web3",
    "TailwindCSS"
  ];

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
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="flex items-center space-x-2"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-lg"></div>
                <span className="text-xl md:text-2xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent">
                  MyWallet
                </span>
              </motion.div>

              {/* Desktop Menu */}
              <div className="hidden md:flex items-center space-x-8">
                <a href="#home" className="text-gray-300 hover:text-cyan-400 transition-colors font-medium">
                  Home
                </a>
                <a href="#features" className="text-gray-300 hover:text-cyan-400 transition-colors font-medium">
                  Features
                </a>
                <a href="#about" className="text-gray-300 hover:text-cyan-400 transition-colors font-medium">
                  About
                </a>
                <a href="#tech" className="text-gray-300 hover:text-cyan-400 transition-colors font-medium">
                  Tech Stack
                </a>
              </div>

              {/* CTA Button */}
              <div className="hidden md:block">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-cyan-600 to-purple-600 px-6 py-2.5 rounded-full font-semibold text-sm shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 transition-all"
                >
                  Launch App →
                </motion.button>
              </div>

              {/* Mobile Menu Button */}
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2"
              >
                <div className="w-6 h-5 flex flex-col justify-between">
                  <span className={`w-full h-0.5 bg-white transition-all ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                  <span className={`w-full h-0.5 bg-white transition-all ${mobileMenuOpen ? 'opacity-0' : ''}`}></span>
                  <span className={`w-full h-0.5 bg-white transition-all ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
                </div>
              </button>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="md:hidden py-4 border-t border-gray-800"
              >
                <div className="flex flex-col space-y-4">
                  <a href="#home" className="text-gray-300 hover:text-cyan-400 transition-colors">Home</a>
                  <a href="#features" className="text-gray-300 hover:text-cyan-400 transition-colors">Features</a>
                  <a href="#about" className="text-gray-300 hover:text-cyan-400 transition-colors">About</a>
                  <a href="#tech" className="text-gray-300 hover:text-cyan-400 transition-colors">Tech Stack</a>
                  <Link href="/dashboard" className="w-full">
                    <button className="bg-gradient-to-r from-cyan-600 to-purple-600 px-6 py-2.5 rounded-full font-semibold text-sm w-full">
                      Launch App →
                    </button>
                  </Link>
                </div>
              </motion.div>
            )}
          </div>
        </motion.nav>

        {/* Hero Section */}
        <section id="home" className="min-h-screen flex items-center justify-center px-6 pt-24 pb-16">
          <div className="max-w-6xl mx-auto text-center">
            
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/30 rounded-full px-4 py-2 mb-8"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
              </span>
              <span className="text-sm font-medium text-cyan-400">Hackathon Project 2025</span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
            >
              <span className="bg-gradient-to-r from-white via-cyan-100 to-white bg-clip-text text-transparent">
                The Future of
              </span>
              <br />
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent">
                Cardano Wallet Management
              </span>
            </motion.h1>

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto mb-10 leading-relaxed"
            >
              A next-generation smart wallet interface that seamlessly connects to Cardano wallets, 
              displays real-time balances, enables secure data signing, and simplifies transaction management.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Link href="/dashboard" className="w-full sm:w-auto">
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(6, 182, 212, 0.6)" }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-gradient-to-r from-cyan-600 to-purple-600 px-8 py-4 rounded-full text-lg font-bold shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/60 transition-all"
                >
                  🚀 Try Live Demo
                </motion.button>
              </Link>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto border-2 border-gray-700 hover:border-cyan-500 px-8 py-4 rounded-full text-lg font-semibold backdrop-blur-sm transition-all"
              >
                📹 Watch Video
              </motion.button>
            </motion.div>

            {/* Floating Cards Preview */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mt-16 relative"
            >
              <div className="flex justify-center items-center space-x-4">
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="w-48 h-64 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 backdrop-blur-xl rounded-2xl border border-cyan-500/30 shadow-2xl shadow-cyan-500/20 p-6"
                >
                  <div className="w-full h-full flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                      <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-xl"></div>
                      <div className="text-xs text-gray-400">Connected</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 mb-1">Balance</div>
                      <div className="text-2xl font-bold text-white">₳ 1,234.56</div>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                  className="w-48 h-64 bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-xl rounded-2xl border border-purple-500/30 shadow-2xl shadow-purple-500/20 p-6 hidden sm:block"
                >
                  <div className="w-full h-full flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                      <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl"></div>
                      <div className="text-xs text-green-400">● Active</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 mb-1">Transactions</div>
                      <div className="text-2xl font-bold text-white">47</div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            
            {/* Section Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-5xl font-bold mb-4">
                <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                  Powerful Features
                </span>
              </h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Built with cutting-edge technology to deliver the best wallet experience
              </p>
            </motion.div>

            {/* Feature Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                  className="group relative p-8 rounded-2xl bg-gradient-to-br from-gray-900/50 to-gray-950/50 border border-gray-800 hover:border-cyan-500/50 backdrop-blur-sm transition-all duration-300"
                >
                  {/* Glow Effect on Hover */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-500/0 to-purple-500/0 group-hover:from-cyan-500/10 group-hover:to-purple-500/10 transition-all duration-300"></div>
                  
                  <div className="relative">
                    <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold mb-3 text-white group-hover:text-cyan-400 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-gray-400 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 px-6 bg-gradient-to-b from-transparent via-gray-950/50 to-transparent">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                  Why MyWallet?
                </span>
              </h2>
              
              <div className="space-y-6 text-left md:text-center">
                <p className="text-gray-300 text-lg leading-relaxed">
                  <span className="text-cyan-400 font-semibold">MyWallet</span> revolutionizes how users interact with the Cardano blockchain. 
                  Our mission is to eliminate complexity and provide a seamless, secure, and beautiful interface for managing digital assets.
                </p>
                
                <p className="text-gray-400 text-lg leading-relaxed">
                  Built specifically for this hackathon, MyWallet showcases the potential of modern web technologies 
                  combined with blockchain innovation. We've focused on three core pillars: <span className="text-white font-semibold">Security</span>, 
                  <span className="text-white font-semibold"> Usability</span>, and <span className="text-white font-semibold">Performance</span>.
                </p>

                <div className="grid md:grid-cols-3 gap-6 mt-12">
                  {[
                    { num: "100%", label: "Client-Side Security" },
                    { num: "<1s", label: "Response Time" },
                    { num: "5+", label: "Wallet Integrations" }
                  ].map((stat, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="p-6 rounded-xl bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border border-gray-800"
                    >
                      <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-2">
                        {stat.num}
                      </div>
                      <div className="text-gray-400 text-sm">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Tech Stack Section */}
        <section id="tech" className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                  Built With Modern Tech
                </span>
              </h2>
              <p className="text-gray-400">Leveraging the best tools and frameworks</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="flex flex-wrap justify-center gap-4"
            >
              {techStack.map((tech, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ scale: 1.1, y: -5 }}
                  className="px-6 py-3 bg-gradient-to-br from-gray-900 to-gray-950 border border-gray-800 hover:border-cyan-500/50 rounded-full text-gray-300 hover:text-cyan-400 transition-all cursor-default"
                >
                  {tech}
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center p-8 md:p-12 rounded-3xl bg-gradient-to-br from-cyan-900/20 via-purple-900/20 to-pink-900/20 border border-cyan-500/20 backdrop-blur-xl"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Experience the Future?
            </h2>
            <p className="text-gray-400 text-lg mb-8">
              Connect your wallet and start managing your Cardano assets with confidence
            </p>
            <Link href="/dashboard">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 0 50px rgba(6, 182, 212, 0.7)" }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 px-10 py-4 rounded-full text-lg font-bold shadow-2xl shadow-cyan-500/50 hover:shadow-cyan-500/80 transition-all"
              >
                Launch Dashboard Now
              </motion.button>
            </Link>
          </motion.div>
        </section>

        {/* Footer */}
        <footer className="border-t border-gray-800/50 py-12 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8 mb-8">
              
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-lg"></div>
                  <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                    MyWallet
                  </span>
                </div>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Next-generation Cardano wallet management for the decentralized future.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold mb-4 text-gray-300">Product</h4>
                <ul className="space-y-2 text-sm">
                  <li><a href="#features" className="text-gray-500 hover:text-cyan-400 transition-colors">Features</a></li>
                  <li><a href="#" className="text-gray-500 hover:text-cyan-400 transition-colors">Security</a></li>
                  <li><a href="#" className="text-gray-500 hover:text-cyan-400 transition-colors">Roadmap</a></li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-4 text-gray-300">Resources</h4>
                <ul className="space-y-2 text-sm">
                  <li><a href="#" className="text-gray-500 hover:text-cyan-400 transition-colors">Documentation</a></li>
                  <li><a href="#" className="text-gray-500 hover:text-cyan-400 transition-colors">API Reference</a></li>
                  <li><a href="#" className="text-gray-500 hover:text-cyan-400 transition-colors">Support</a></li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-4 text-gray-300">Community</h4>
                <ul className="space-y-2 text-sm">
                  <li><a href="#" className="text-gray-500 hover:text-cyan-400 transition-colors">GitHub</a></li>
                  <li><a href="#" className="text-gray-500 hover:text-cyan-400 transition-colors">Discord</a></li>
                  <li><a href="#" className="text-gray-500 hover:text-cyan-400 transition-colors">Twitter</a></li>
                </ul>
              </div>
            </div>
            
            <div className="pt-8 border-t border-gray-800/50 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
              <div className="mb-4 md:mb-0">
                © 2025 MyWallet. Hackathon Project. All rights reserved.
              </div>
              <div className="flex space-x-6">
                <a href="#" className="hover:text-cyan-400 transition-colors">Privacy</a>
                <a href="#" className="hover:text-cyan-400 transition-colors">Terms</a>
                <a href="#" className="hover:text-cyan-400 transition-colors">Cookies</a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}