
// components/LoginForm.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { authenticateUser } from '@/lib/auth';

export function LoginForm({ type }: { type: 'organization' | 'employee' }) {
  const router = useRouter();
  const [error, setError] = useState('');
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    
    const user = authenticateUser(email, password);
    
    if (user && user.type === type) {
      sessionStorage.setItem('user', JSON.stringify(user));
      router.push(`/dashboard/${type}`);
    } else {
      setError('Invalid credentials');
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded">
          {error}
        </div>
      )}
      
      <div>
        <label className="block text-sm font-medium mb-1">Email</label>
        <input
          type="email"
          name="email"
          required
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-1">Password</label>
        <input
          type="password"
          name="password"
          required
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        Login
      </button>
    </form>
  );
}
