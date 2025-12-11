"use client";

import Link from "next/link";
import { MessageCircle, TrendingUp, Target, Heart, Sparkles } from "lucide-react";

export default function Dashboard() {
  const recentChats = [
    { id: 1, title: "Dúvidas sobre produtos", time: "2h atrás", preview: "Obrigada pelas recomendações!" },
    { id: 2, title: "Consultoria personalizada", time: "1 dia atrás", preview: "Adorei as sugestões..." },
    { id: 3, title: "Suporte técnico", time: "3 dias atrás", preview: "Problema resolvido!" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Olá, Bem-vinda! 👋</h1>
          <p className="text-muted-foreground">
            Aqui está um resumo da sua jornada no Venus Club
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={<MessageCircle className="w-6 h-6" />}
            title="Total Conversas"
            value="24"
            change="+12%"
            positive
          />
          <StatCard
            icon={<TrendingUp className="w-6 h-6" />}
            title="Insights"
            value="18"
            change="+8%"
            positive
          />
          <StatCard
            icon={<Target className="w-6 h-6" />}
            title="Progresso de Metas"
            value="67%"
            change="+15%"
            positive
          />
          <StatCard
            icon={<Heart className="w-6 h-6" />}
            title="Wellness Score"
            value="8.5"
            change="+0.5"
            positive
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Chats */}
          <div className="lg:col-span-2 bg-card border border-border rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Conversas Recentes</h2>
              <Link
                href="/chat"
                className="text-sm text-primary hover:underline"
              >
                Ver todas
              </Link>
            </div>

            <div className="space-y-4">
              {recentChats.map((chat) => (
                <Link
                  key={chat.id}
                  href={`/chat?id=${chat.id}`}
                  className="block p-4 bg-muted/50 rounded-xl hover:bg-muted transition-all"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold">{chat.title}</h3>
                    <span className="text-xs text-muted-foreground">
                      {chat.time}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-1">
                    {chat.preview}
                  </p>
                </Link>
              ))}
            </div>
          </div>

          {/* CTA Card */}
          <div className="bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/30 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full gradient-venus flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold">Selena</h3>
                <p className="text-sm text-muted-foreground">
                  Sua consultora virtual
                </p>
              </div>
            </div>

            <p className="text-sm mb-6">
              Tire suas dúvidas, receba recomendações personalizadas e explore
              novos produtos com a ajuda da Selena.
            </p>

            <Link
              href="/chat"
              className="block w-full py-3 gradient-venus text-white text-center rounded-xl font-semibold hover:opacity-90 transition-all"
            >
              Falar com Selena
            </Link>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          <QuickAction href="/vitrine" label="Explorar Produtos" />
          <QuickAction href="/community" label="Comunidade" />
          <QuickAction href="/perfil" label="Meu Perfil" />
          <QuickAction href="/safety" label="Segurança" />
        </div>
      </div>
    </div>
  );
}

function StatCard({
  icon,
  title,
  value,
  change,
  positive,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  change: string;
  positive: boolean;
}) {
  return (
    <div className="bg-card border border-border rounded-2xl p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="w-12 h-12 rounded-xl gradient-venus flex items-center justify-center">
          {icon}
        </div>
        <span
          className={`text-sm font-semibold ${
            positive ? "text-green-500" : "text-red-500"
          }`}
        >
          {change}
        </span>
      </div>
      <h3 className="text-2xl font-bold mb-1">{value}</h3>
      <p className="text-sm text-muted-foreground">{title}</p>
    </div>
  );
}

function QuickAction({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="p-4 bg-card border border-border rounded-xl hover:border-primary/50 hover:shadow-lg transition-all text-center font-medium"
    >
      {label}
    </Link>
  );
}
