"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, Lock, Chrome } from "lucide-react";

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleGoogleLogin = () => {
    // Mock Google OAuth
    console.log("Google OAuth iniciado");
    router.push("/onboarding");
  };

  const handleEmailLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login com email:", email);
    router.push("/dashboard");
  };

  const handleTestLogin = () => {
    console.log("Login como usuário teste");
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold gradient-accent-text mb-2">
            Bem-vinda ao Venus Club
          </h1>
          <p className="text-muted-foreground">
            Entre para acessar sua conta
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-card border border-border rounded-2xl p-8 shadow-xl">
          {/* Google Login */}
          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-3 px-6 py-3 bg-white text-gray-900 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 mb-4"
          >
            <Chrome className="w-5 h-5" />
            Entrar com Google
          </button>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-card text-muted-foreground">
                ou continue com email
              </span>
            </div>
          </div>

          {/* Email Login Form */}
          <form onSubmit={handleEmailLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                  className="w-full pl-11 pr-4 py-3 bg-background border border-input rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Senha</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-11 pr-4 py-3 bg-background border border-input rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 gradient-venus text-white rounded-xl font-semibold hover:opacity-90 transition-all duration-300 hover:scale-105"
            >
              Entrar
            </button>
          </form>

          {/* Create Account */}
          <div className="mt-6 text-center">
            <Link
              href="/onboarding"
              className="text-primary hover:underline font-medium"
            >
              Criar nova conta
            </Link>
          </div>

          {/* Test Login */}
          <div className="mt-4 pt-4 border-t border-border text-center">
            <button
              onClick={handleTestLogin}
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              Entrar como Teste
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
