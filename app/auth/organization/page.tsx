import { LoginForm } from '@/components/LoginForm';
import { Building2 } from 'lucide-react';

export default function OrganizationLogin() {
  return (
    <div className="min-h-screen bg-gradient-dark flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-zinc-800/50 p-8 rounded-xl backdrop-blur-sm border border-zinc-700">
        <div>
          <div className="mx-auto h-12 w-12 bg-primary rounded-full flex items-center justify-center">
            <Building2 className="h-8 w-8 text-primary-foreground" />
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gradient">
            Organization Login
          </h2>
        </div>
        <LoginForm type="organization" />
      </div>
    </div>
  );
}

