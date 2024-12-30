"use client"

import { ConnectButton } from '@rainbow-me/rainbowkit';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Coins, Menu } from 'lucide-react';
import { useState } from 'react';

export function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: 'Features', href: '#features' },
    { name: 'How it Works', href: '#how-it-works' },
    { name: 'Security', href: '#security' },
    { name: 'FAQ', href: '#faq' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 border-b border-white/10 bg-black/50 backdrop-blur-xl z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2 text-2xl font-bold text-white">
            <Coins className="h-8 w-8 text-primary" />
            <span>PayPro</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm text-zinc-400 hover:text-white transition-colors"
              >
                {item.name}
              </Link>
            ))}
            {pathname !== '/' && <ConnectButton />}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 flex flex-col space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm text-zinc-400 hover:text-white transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            {pathname !== '/' && <ConnectButton />}
          </nav>
        )}
      </div>
    </header>
  );
}











// // components/layout/Header.tsx
// "use client"

// import { ConnectButton } from '@rainbow-me/rainbowkit';
// import Link from 'next/link';
// import { usePathname } from 'next/navigation';

// export function Header() {
//   const pathname = usePathname();
  
//   return (
//     <header className="border-b border-gray-200 bg-white">
//       <div className="container mx-auto px-4 py-4 flex justify-between items-center">
//         <Link href="/" className="text-2xl font-bold text-blue-600">
//           PayPro
//         </Link>
        
//         {pathname !== '/' && <ConnectButton />}
//       </div>
//     </header>
//   );
// }
