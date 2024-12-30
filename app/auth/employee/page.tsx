// import { LoginForm } from '@/components/LoginForm';
// import { Shield } from 'lucide-react';

// export default function EmployeeLogin() {
//   return (
//     <div className="min-h-screen bg-gradient-dark flex items-center justify-center px-4 sm:px-6 lg:px-8">
//       <div className="max-w-md w-full space-y-8 bg-zinc-800/50 p-8 rounded-xl backdrop-blur-sm border border-zinc-700">
//         <div>
//           <div className="mx-auto h-12 w-12 bg-primary rounded-full flex items-center justify-center">
//             <Shield className="h-8 w-8 text-primary-foreground" />
//           </div>
//           <h2 className="mt-6 text-center text-3xl font-extrabold text-gradient">
//             Employee Login
//           </h2>
//         </div>
//         <LoginForm type="employee" />
//       </div>
//     </div>
//   );
// }
"use client";

import { LoginForm } from '@/components/LoginForm';
import { Shield, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function EmployeeLogin() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-900 to-black flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full space-y-8 bg-zinc-800/50 p-8 rounded-xl backdrop-blur-sm border border-zinc-700 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/10"
      >
        <div>
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="mx-auto h-12 w-12 bg-emerald-500 rounded-full flex items-center justify-center"
          >
            <Shield className="h-8 w-8 text-black" />
          </motion.div>
          <h2 className="mt-6 text-center text-3xl font-extrabold bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
            Employee Login
          </h2>
          <p className="mt-2 text-center text-sm text-zinc-400">
            Access your account to manage your payments and profile
          </p>
        </div>
        <LoginForm type="employee" />
        <div className="text-center">
          <Link 
            href="/"
            className="inline-flex items-center text-sm text-emerald-500 hover:text-emerald-400 transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </div>
      </motion.div>
    </div>
  );
}


