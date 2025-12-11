"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Heart,
  Users,
  Package,
  TrendingUp,
  DollarSign,
  ShoppingBag,
  MessageSquare,
  Settings,
  BarChart3,
  Shield,
} from "lucide-react";

const stats = [
  {
    label: "Vendas Hoje",
    value: "R$ 12.450",
    change: "+15%",
    icon: <DollarSign className="w-6 h-6" />,
    color: "from-[#00CFEA] to-[#FF4D6D]",
  },
  {
    label: "Novos Membros",
    value: "234",
    change: "+28%",
    icon: <Users className="w-6 h-6" />,
    color: "from-[#FF4D6D] to-[#FFB039]",
  },
  {
    label: "Pedidos Ativos",
    value: "89",
    change: "+12%",
    icon: <Package className="w-6 h-6" />,
    color: "from-[#FFB039] to-[#00CFEA]",
  },
  {
    label: "Taxa de Conversão",
    value: "3.8%",
    change: "+0.5%",
    icon: <TrendingUp className="w-6 h-6" />,
    color: "from-[#D81B60] to-[#FF4D6D]",
  },
];

const recentOrders = [
  {
    id: "#VN12350",
    customer: "Luna Silva",
    product: "Kit Essencial Premium",
    value: 299.90,
    status: "Processando",
  },
  {
    id: "#VN12349",
    customer: "Marina Costa",
    product: "Coleção Especial Luxo",
    value: 449.90,
    status: "Enviado",
  },
  {
    id: "#VN12348",
    customer: "Sofia Mendes",
    product: "Starter Pack",
    value: 149.90,
    status: "Entregue",
  },
];

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="min-h-screen bg-[#0E0A12]">
      {/* Header */}
      <header className="border-b border-white/10 bg-[#0E0A12]/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#00CFEA] via-[#FF4D6D] to-[#FFB039] flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-[#00CFEA] via-[#FF4D6D] to-[#FFB039] bg-clip-text text-transparent">
                  Venus Club Admin
                </h1>
                <p className="text-xs text-gray-400">Painel Administrativo</p>
              </div>
            </div>

            <Link
              href="/dashboard"
              className="text-gray-400 hover:text-white text-sm transition-colors"
            >
              Ver Site
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 sticky top-24">
              <nav className="space-y-2">
                <button
                  onClick={() => setActiveTab("dashboard")}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    activeTab === "dashboard"
                      ? "bg-[#D81B60] text-white"
                      : "text-gray-300 hover:bg-white/5"
                  }`}
                >
                  <BarChart3 className="w-5 h-5" />
                  Dashboard
                </button>
                <button
                  onClick={() => setActiveTab("products")}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    activeTab === "products"
                      ? "bg-[#D81B60] text-white"
                      : "text-gray-300 hover:bg-white/5"
                  }`}
                >
                  <ShoppingBag className="w-5 h-5" />
                  Produtos
                </button>
                <button
                  onClick={() => setActiveTab("orders")}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    activeTab === "orders"
                      ? "bg-[#D81B60] text-white"
                      : "text-gray-300 hover:bg-white/5"
                  }`}
                >
                  <Package className="w-5 h-5" />
                  Pedidos
                </button>
                <button
                  onClick={() => setActiveTab("users")}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    activeTab === "users"
                      ? "bg-[#D81B60] text-white"
                      : "text-gray-300 hover:bg-white/5"
                  }`}
                >
                  <Users className="w-5 h-5" />
                  Usuários
                </button>
                <button
                  onClick={() => setActiveTab("community")}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    activeTab === "community"
                      ? "bg-[#D81B60] text-white"
                      : "text-gray-300 hover:bg-white/5"
                  }`}
                >
                  <MessageSquare className="w-5 h-5" />
                  Comunidade
                </button>
                <button
                  onClick={() => setActiveTab("settings")}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    activeTab === "settings"
                      ? "bg-[#D81B60] text-white"
                      : "text-gray-300 hover:bg-white/5"
                  }`}
                >
                  <Settings className="w-5 h-5" />
                  Configurações
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === "dashboard" && (
              <div className="space-y-8">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {stats.map((stat, index) => (
                    <div
                      key={index}
                      className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:scale-105 transition-transform duration-300"
                    >
                      <div
                        className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-4`}
                      >
                        {stat.icon}
                      </div>
                      <div className="text-sm text-gray-400 mb-1">{stat.label}</div>
                      <div className="flex items-end justify-between">
                        <div className="text-2xl font-bold text-white">{stat.value}</div>
                        <div className="text-sm text-green-400 font-medium">
                          {stat.change}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Recent Orders */}
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-white">Pedidos Recentes</h2>
                    <button className="text-[#D81B60] hover:text-[#FF4D6D] text-sm font-medium transition-colors">
                      Ver todos
                    </button>
                  </div>

                  <div className="space-y-4">
                    {recentOrders.map((order) => (
                      <div
                        key={order.id}
                        className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10 hover:border-[#D81B60]/50 transition-all"
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="text-white font-semibold">{order.id}</span>
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${
                                order.status === "Entregue"
                                  ? "bg-green-400/20 text-green-400"
                                  : order.status === "Enviado"
                                  ? "bg-blue-400/20 text-blue-400"
                                  : "bg-yellow-400/20 text-yellow-400"
                              }`}
                            >
                              {order.status}
                            </span>
                          </div>
                          <div className="text-sm text-gray-400">{order.customer}</div>
                          <div className="text-sm text-gray-500">{order.product}</div>
                        </div>
                        <div className="text-xl font-bold text-white">
                          R$ {order.value.toFixed(2)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <QuickAction
                    icon={<ShoppingBag className="w-6 h-6" />}
                    title="Adicionar Produto"
                    description="Cadastrar novo produto"
                    color="from-[#00CFEA] to-[#FF4D6D]"
                  />
                  <QuickAction
                    icon={<Users className="w-6 h-6" />}
                    title="Gerenciar Usuários"
                    description="Ver e editar usuários"
                    color="from-[#FF4D6D] to-[#FFB039]"
                  />
                  <QuickAction
                    icon={<Shield className="w-6 h-6" />}
                    title="Segurança"
                    description="Configurações de segurança"
                    color="from-[#FFB039] to-[#00CFEA]"
                  />
                </div>
              </div>
            )}

            {activeTab === "products" && (
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-white mb-6">Gerenciar Produtos</h2>
                <p className="text-gray-400">
                  Adicione, edite ou remova produtos do catálogo
                </p>
              </div>
            )}

            {activeTab === "orders" && (
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-white mb-6">Gerenciar Pedidos</h2>
                <p className="text-gray-400">
                  Visualize e gerencie todos os pedidos da plataforma
                </p>
              </div>
            )}

            {activeTab === "users" && (
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-white mb-6">Gerenciar Usuários</h2>
                <p className="text-gray-400">
                  Visualize e gerencie todos os usuários cadastrados
                </p>
              </div>
            )}

            {activeTab === "community" && (
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-white mb-6">Moderar Comunidade</h2>
                <p className="text-gray-400">
                  Gerencie posts, comentários e interações da comunidade
                </p>
              </div>
            )}

            {activeTab === "settings" && (
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-white mb-6">Configurações</h2>
                <p className="text-gray-400">
                  Configure as opções gerais da plataforma
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function QuickAction({
  icon,
  title,
  description,
  color,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
}) {
  return (
    <button className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-[#D81B60]/50 transition-all duration-300 hover:scale-105 text-left">
      <div
        className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
      >
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
      <p className="text-gray-400 text-sm">{description}</p>
    </button>
  );
}
