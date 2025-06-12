import { LoginForm } from '@/features/auth/ui/LoginForm'
import { RegisterForm } from '@/features/auth/ui/RegisterForm'
import { useAuthStore } from '@/features/auth/model/store'

export default function AuthPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Pro-Admin
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Panel de Administración de Cinerex
          </p>
        </div>

        <div className="mt-8 space-y-6">
          <LoginForm />
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gray-50 text-gray-500">O</span>
            </div>
          </div>
          <RegisterForm />
        </div>
 