import { Providers } from './providers';
import { Header } from '@/components/layout/Header';
import '@rainbow-me/rainbowkit/styles.css';
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-zinc-900 text-white min-h-screen flex flex-col">
        <Providers>
          <Header />
          <main className="flex-grow bg-gradient-to-b from-zinc-900 to-black">
            {children}
          </main>
          <footer className="border-t border-white/10 bg-black/50 backdrop-blur-xl py-6">
            <div className="container mx-auto px-4 text-center">
              <p className="text-zinc-400 text-sm">&copy; 2024 PayPro. All rights reserved.</p>
            </div>
          </footer>
        </Providers>
      </body>
    </html>
  );
}



// // app/layout.tsx
// import { Providers } from './providers';
// import { Header } from '@/components/layout/Header';
// import '@rainbow-me/rainbowkit/styles.css';
// import './globals.css';

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="en">
//       <body>
//         <Providers>
//           <Header />
//           <main className="min-h-screen bg-gray-50">
//             {children}
//           </main>
//           <footer className="bg-gray-800 text-white py-6">
//             <div className="container mx-auto px-4 text-center">
//               <p>&copy; 2024 PayPro. All rights reserved.</p>
//             </div>
//           </footer>
//         </Providers>
//       </body>
//     </html>
//   );
// }