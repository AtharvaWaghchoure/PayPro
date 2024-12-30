// app/page.tsx
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-[calc(100vh-64px)] flex flex-col items-center justify-center bg-gradient-to-b from-blue-500 to-blue-700 text-white">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-5xl font-bold mb-6">
          Welcome to PayPro
        </h1>
        <p className="text-xl mb-12 max-w-2xl mx-auto">
          A secure and efficient blockchain-based recurring payment system for organizations and employees.
        </p>
        <div className="flex gap-6 justify-center">
          <Link
            href="/auth/organization"
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors"
          >
            Organization Login
          </Link>
          <Link
            href="/auth/employee"
            className="bg-blue-800 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-900 transition-colors"
          >
            Employee Login
          </Link>
        </div>
      </div>
    </div>
  );
}
