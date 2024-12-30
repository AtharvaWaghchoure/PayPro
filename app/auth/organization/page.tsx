// app/auth/organization/page.tsx
import { LoginForm } from '@/components/LoginForm';

export default function OrganizationLogin() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-center mb-8">
        Organization Login
      </h1>
      <LoginForm type="organization" />
    </div>
  );
}