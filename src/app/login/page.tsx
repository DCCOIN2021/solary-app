'use client'

import { useState } from 'react';
import { Logo } from '@/components/Logo';
import { useRouter } from 'next/navigation';
import { Lock, Mail, Eye, EyeOff } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simular login
    router.push('/welcome');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-8 p-4 sm:p-8 bg-gradient-to-br from-blue-50 to-purple-50">
      <Logo />
      <div className="text-center max-w-md">
        <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-4 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
          <Lock className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Faça seu Login
        </h1>
        <p className="text-lg text-muted-foreground mb-8">
          Entre com suas credenciais para continuar
        </p>
      </div>
      
      <form onSubmit={handleLogin} className="w-full max-w-md space-y-6 bg-white rounded-3xl p-8 shadow-2xl border-2 border-blue-200">
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-2 text-gray-700">
            Email
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="seu@email.com"
              required
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="password" className="block text-sm font-medium mb-2 text-gray-700">
            Senha
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-12 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="••••••••"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
            <span className="text-gray-600">Lembrar-me</span>
          </label>
          <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">
            Esqueceu a senha?
          </a>
        </div>
        
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white py-3 px-6 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
        >
          Entrar
        </button>

        <div className="text-center text-sm text-gray-600">
          Não tem uma conta?{' '}
          <a href="#" className="text-blue-600 hover:text-blue-700 font-bold">
            Cadastre-se
          </a>
        </div>
      </form>

      <button
        onClick={() => router.push('/')}
        className="text-gray-600 hover:text-gray-800 font-medium transition-colors"
      >
        ← Voltar ao início
      </button>
    </div>
  );
}
