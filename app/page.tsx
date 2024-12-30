import Link from 'next/link';
import { ArrowRight, Wallet, Clock, LineChart, Shield, Boxes, Coins } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-900 to-black text-white">
      {/* Header/Navigation */}
      <header className="fixed top-0 w-full border-b border-white/10 bg-black/50 backdrop-blur-xl z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Coins className="size-6 text-emerald-500" />
            <span className="text-2xl font-bold">PayPro</span>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <Link href="#features" className="text-sm text-zinc-400 hover:text-white transition-colors">Features</Link>
            <Link href="#how-it-works" className="text-sm text-zinc-400 hover:text-white transition-colors">How it Works</Link>
            <Link href="#security" className="text-sm text-zinc-400 hover:text-white transition-colors">Security</Link>
            <Link href="#faq" className="text-sm text-zinc-400 hover:text-white transition-colors">FAQ</Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 mb-8">
            <span className="size-2 rounded-full bg-emerald-500"></span>
            <span className="text-sm">Powered by Neo X Testnet</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
            Revolutionize Your Recurring Payments with Blockchain
          </h1>
          <p className="text-lg md:text-xl text-zinc-400 max-w-3xl mx-auto mb-12">
            PayPro is a decentralized platform that automates and secures your recurring payments using smart contracts on the Neo X Testnet. Perfect for organizations managing employee payments.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/auth/organization"
              className="inline-flex items-center justify-center gap-2 bg-emerald-500 text-black px-8 py-3 rounded-lg font-medium hover:bg-emerald-400 transition-colors group"
            >
              Organization Login
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/auth/employee"
              className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-lg font-medium border border-white/10 hover:bg-white/5 transition-colors"
            >
              Employee Login
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-20 border-t border-white/10">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
              <Clock className="size-8 mb-4 text-emerald-500" />
              <h3 className="text-xl font-semibold mb-2">Automated Payments</h3>
              <p className="text-zinc-400">Set up recurring payments with smart contracts that execute automatically and reliably.</p>
            </div>
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
              <LineChart className="size-8 mb-4 text-emerald-500" />
              <h3 className="text-xl font-semibold mb-2">Real-time Tracking</h3>
              <p className="text-zinc-400">Monitor payment status and history with real-time updates and detailed analytics.</p>
            </div>
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
              <Wallet className="size-8 mb-4 text-emerald-500" />
              <h3 className="text-xl font-semibold mb-2">RainbowKit Integration</h3>
              <p className="text-zinc-400">Seamless wallet connection and management with built-in RainbowKit support.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 border-t border-white/10 bg-white/5">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: "1",
                title: "Connect Wallet",
                description: "Link your wallet using RainbowKit for secure access",
                icon: Wallet
              },
              {
                step: "2",
                title: "Setup Payments",
                description: "Configure recurring payment details and schedule",
                icon: Clock
              },
              {
                step: "3",
                title: "Smart Contract",
                description: "Payments are automated via Neo X smart contracts",
                icon: Boxes
              },
              {
                step: "4",
                title: "Monitor",
                description: "Track and manage all payments in real-time",
                icon: LineChart
              }
            ].map((item, index) => (
              <div key={index} className="relative p-6 rounded-2xl bg-white/5 border border-white/10">
                <div className="absolute -top-3 -left-3 size-6 rounded-full bg-emerald-500 text-black flex items-center justify-center text-sm font-bold">
                  {item.step}
                </div>
                <item.icon className="size-8 mb-4 text-emerald-500" />
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-zinc-400">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section id="security" className="py-20 border-t border-white/10">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/20 bg-emerald-500/10 text-emerald-500 mb-8">
            <Shield className="size-4" />
            <span className="text-sm font-medium">Enterprise-Grade Security</span>
          </div>
          <h2 className="text-3xl font-bold mb-6">Secured by Blockchain Technology</h2>
          <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
            PayPro leverages the power of Neo X Testnet and smart contracts to ensure your recurring payments are secure, transparent, and immutable.
          </p>
        </div>
      </section>

      {/* Network Stats */}
      <section className="py-20 border-t border-white/10 bg-white/5">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: "Total Transactions", value: "1M+" },
              { label: "Organizations", value: "500+" },
              { label: "Success Rate", value: "99.9%" },
              { label: "GAS Processed", value: "100K+" }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold mb-2">{stat.value}</div>
                <div className="text-sm text-zinc-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

// "use client";

// import Link from 'next/link';
// import { ArrowRight, Wallet, Clock, LineChart, Shield, Boxes, Coins } from 'lucide-react';
// import { motion } from 'framer-motion';
// import AnimatedBackground from '../components/AnimatedBackground';

// export default function Home() {
//   return (
//     <div className="min-h-screen bg-gradient-to-b from-zinc-900 to-black text-white">
//       <AnimatedBackground />
      
//       {/* Header/Navigation */}
//       <header className="fixed top-0 w-full border-b border-white/10 bg-black/50 backdrop-blur-xl z-50">
//         <div className="container mx-auto px-4 h-16 flex items-center justify-between">
//           <div className="flex items-center gap-2">
//             <Coins className="size-6 text-emerald-500" />
//             <span className="text-2xl font-bold">PayPro</span>
//           </div>
//           <nav className="hidden md:flex items-center gap-8">
//             <Link href="#features" className="text-sm text-zinc-400 hover:text-white transition-colors">Features</Link>
//             <Link href="#how-it-works" className="text-sm text-zinc-400 hover:text-white transition-colors">How it Works</Link>
//             <Link href="#security" className="text-sm text-zinc-400 hover:text-white transition-colors">Security</Link>
//             <Link href="#faq" className="text-sm text-zinc-400 hover:text-white transition-colors">FAQ</Link>
//           </nav>
//         </div>
//       </header>

//       {/* Hero Section */}
//       <section className="pt-32 pb-20 relative">
//         <motion.div
//           className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl"
//           animate={{
//             scale: [1, 1.2, 1],
//             opacity: [0.3, 0.5, 0.3],
//           }}
//           transition={{
//             duration: 8,
//             repeat: Infinity,
//           }}
//         />
//         <div className="container mx-auto px-4 text-center">
//           <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 mb-8">
//             <span className="size-2 rounded-full bg-emerald-500"></span>
//             <span className="text-sm">Powered by Neo X Testnet</span>
//           </div>
//           <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
//             Revolutionize Your Recurring Payments with Blockchain
//           </h1>
//           <p className="text-lg md:text-xl text-zinc-400 max-w-3xl mx-auto mb-12">
//             PayPro is a decentralized platform that automates and secures your recurring payments using smart contracts on the Neo X Testnet. Perfect for organizations managing employee payments.
//           </p>
//           <div className="flex flex-col sm:flex-row gap-4 justify-center">
//             <Link
//               href="/auth/organization"
//               className="inline-flex items-center justify-center gap-2 bg-emerald-500 text-black px-8 py-3 rounded-lg font-medium hover:bg-emerald-400 transition-colors group"
//             >
//               Organization Login
//               <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
//             </Link>
//             <Link
//               href="/auth/employee"
//               className="inline-flex items-center justify-center gap-2 bg-emerald-500 text-black px-8 py-3 rounded-lg font-medium hover:bg-emerald-400 transition-colors group"
//             >
//               Employee Login
//               <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
//             </Link>
           
//           </div>
//         </div>
//       </section>

//       {/* Features Grid */}
//       <section id="features" className="py-20 border-t border-white/10 relative">
//         <motion.div
//           className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rotate-45"
//           animate={{
//             x: [0, 25, 0],
//             y: [0, 25, 0],
//           }}
//           transition={{
//             duration: 20,
//             repeat: Infinity,
//           }}
//         />
//         <div className="container mx-auto px-4">
//           <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
//           <div className="grid md:grid-cols-3 gap-8">
//             <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
//               <Clock className="size-8 mb-4 text-emerald-500" />
//               <h3 className="text-xl font-semibold mb-2">Automated Payments</h3>
//               <p className="text-zinc-400">Set up recurring payments with smart contracts that execute automatically and reliably.</p>
//             </div>
//             <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
//               <LineChart className="size-8 mb-4 text-emerald-500" />
//               <h3 className="text-xl font-semibold mb-2">Real-time Tracking</h3>
//               <p className="text-zinc-400">Monitor payment status and history with real-time updates and detailed analytics.</p>
//             </div>
//             <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
//               <Wallet className="size-8 mb-4 text-emerald-500" />
//               <h3 className="text-xl font-semibold mb-2">RainbowKit Integration</h3>
//               <p className="text-zinc-400">Seamless wallet connection and management with built-in RainbowKit support.</p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* How It Works */}
//       <section id="how-it-works" className="py-20 border-t border-white/10 bg-white/5 relative">
//         <motion.div
//           className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-500/5 rotate-45"
//           animate={{
//             rotate: [45, 90, 45],
//             scale: [1, 1.1, 1],
//           }}
//           transition={{
//             duration: 15,
//             repeat: Infinity,
//           }}
//         />
//         <div className="container mx-auto px-4">
//           <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
//           <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
//             {[
//               {
//                 step: "1",
//                 title: "Connect Wallet",
//                 description: "Link your wallet using RainbowKit for secure access",
//                 icon: Wallet
//               },
//               {
//                 step: "2",
//                 title: "Setup Payments",
//                 description: "Configure recurring payment details and schedule",
//                 icon: Clock
//               },
//               {
//                 step: "3",
//                 title: "Smart Contract",
//                 description: "Payments are automated via Neo X smart contracts",
//                 icon: Boxes
//               },
//               {
//                 step: "4",
//                 title: "Monitor",
//                 description: "Track and manage all payments in real-time",
//                 icon: LineChart
//               }
//             ].map((item, index) => (
//               <div key={index} className="relative p-6 rounded-2xl bg-white/5 border border-white/10">
//                 <div className="absolute -top-3 -left-3 size-6 rounded-full bg-emerald-500 text-black flex items-center justify-center text-sm font-bold">
//                   {item.step}
//                 </div>
//                 <item.icon className="size-8 mb-4 text-emerald-500" />
//                 <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
//                 <p className="text-zinc-400">{item.description}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Security Section */}
//       <section id="security" className="py-20 border-t border-white/10 relative">
//         <motion.div
//           className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 border-4 border-emerald-500/10 rotate-45"
//           animate={{
//             rotate: [45, 90, 45],
//             scale: [1, 1.1, 1],
//           }}
//           transition={{
//             duration: 10,
//             repeat: Infinity,
//           }}
//         />
//         <div className="container mx-auto px-4 text-center">
//           <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/20 bg-emerald-500/10 text-emerald-500 mb-8">
//             <Shield className="size-4" />
//             <span className="text-sm font-medium">Enterprise-Grade Security</span>
//           </div>
//           <h2 className="text-3xl font-bold mb-6">Secured by Blockchain Technology</h2>
//           <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
//             PayPro leverages the power of Neo X Testnet and smart contracts to ensure your recurring payments are secure, transparent, and immutable.
//           </p>
//         </div>
//       </section>

//       {/* Network Stats */}
//       <section className="py-20 border-t border-white/10 bg-white/5 relative">
//         <motion.div
//           className="absolute top-0 left-0 w-full h-full"
//           animate={{
//             backgroundPosition: ['0% 0%', '100% 100%'],
//           }}
//           transition={{
//             duration: 20,
//             repeat: Infinity,
//             repeatType: "reverse",
//           }}
//           style={{
//             backgroundImage: 'radial-gradient(circle, rgba(16,185,129,0.1) 1px, transparent 1px)',
//             backgroundSize: '50px 50px',
//           }}
//         />
//         <div className="container mx-auto px-4">
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
//             {[
//               { label: "Total Transactions", value: "1M+" },
//               { label: "Organizations", value: "500+" },
//               { label: "Success Rate", value: "99.9%" },
//               { label: "GAS Processed", value: "100K+" }
//             ].map((stat, index) => (
//               <div key={index} className="text-center">
//                 <div className="text-3xl font-bold mb-2">{stat.value}</div>
//                 <div className="text-sm text-zinc-400">{stat.label}</div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }

