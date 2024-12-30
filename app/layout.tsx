// app/layout.tsx
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
    <html lang="en">
      <body>
        <Providers>
          <Header />
          <main className="min-h-screen bg-gray-50">
            {children}
          </main>
          <footer className="bg-gray-800 text-white py-6">
            <div className="container mx-auto px-4 text-center">
              <p>&copy; 2024 PayPro. All rights reserved.</p>
            </div>
          </footer>
        </Providers>
      </body>
    </html>
  );
}