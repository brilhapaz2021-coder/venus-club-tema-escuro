"use client";

import Link from "next/link";
import { Sparkles, Heart, Shield, Users } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0E0A12]">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#00CFEA]/10 via-[#FF4D6D]/10 to-[#FFB039]/10 blur-3xl" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          {/* Logo/Brand */}
          <div className="text-center mb-16">
            <div className="flex justify-center mb-8">
              <img
                src="https://k6hrqrxuu8obbfwn.public.blob.vercel-storage.com/temp/f414cac2-2af3-454e-9def-6f57a4ed307c.jpg"
                alt="Venus Club Logo"
                className="w-auto h-24 sm:h-32 object-contain"
              />
            </div>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Seu espaço seguro para explorar bem-estar íntimo com confiança e discrição
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-20">
            <Link
              href="/login"
              className="px-8 py-4 bg-[#D81B60] hover:bg-[#D81B60]/90 text-white rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 shadow-lg shadow-[#D81B60]/30 text-center"
            >
              Entrar na Comunidade
            </Link>
            <Link
              href="/vitrine"
              className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 border border-white/20 text-center"
            >
              Explorar Produtos
            </Link>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
            <FeatureCard
              icon={<Sparkles className="w-8 h-8" />}
              title="Produtos Selecionados"
              description="Curadoria especial de produtos de qualidade premium"
              href="/vitrine"
            />
            <FeatureCard
              icon={<Users className="w-8 h-8" />}
              title="Comunidade Ativa"
              description="Conecte-se com pessoas que compartilham seus interesses"
              href="/community"
            />
            <FeatureCard
              icon={<Shield className="w-8 h-8" />}
              title="100% Seguro"
              description="Privacidade e discrição garantidas em todas as compras"
              href="/safety"
            />
            <FeatureCard
              icon={<Heart className="w-8 h-8" />}
              title="Consultoria Personalizada"
              description="Chat exclusivo para tirar dúvidas e receber recomendações"
              href="/chat"
            />
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-gradient-to-r from-[#D81B60]/10 to-[#FF4D6D]/10 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <StatCard number="10k+" label="Membros Ativos" />
            <StatCard number="500+" label="Produtos Premium" />
            <StatCard number="98%" label="Satisfação" />
            <StatCard number="24/7" label="Suporte" />
          </div>
        </div>
      </div>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
  href,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
}) {
  return (
    <Link href={href}>
      <div className="group p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-[#D81B60]/50 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-[#D81B60]/20 h-full">
        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#00CFEA] via-[#FF4D6D] to-[#FFB039] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
          {icon}
        </div>
        <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
        <p className="text-gray-400 text-sm">{description}</p>
      </div>
    </Link>
  );
}

function StatCard({ number, label }: { number: string; label: string }) {
  return (
    <div>
      <div className="text-4xl font-bold bg-gradient-to-r from-[#00CFEA] via-[#FF4D6D] to-[#FFB039] bg-clip-text text-transparent mb-2">
        {number}
      </div>
      <div className="text-gray-400 text-sm">{label}</div>
    </div>
  );
}
