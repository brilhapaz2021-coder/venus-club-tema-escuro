"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Lock, CreditCard, Check, Sparkles, X } from "lucide-react";

export default function CheckoutPage() {
  const router = useRouter();
  const [selectedPlan, setSelectedPlan] = useState("anual");
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [showUpsellModal, setShowUpsellModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    cpf: "",
    cardNumber: "",
    cardName: "",
    cardExpiry: "",
    cardCvv: "",
  });

  const plans = [
    {
      id: "mensal",
      name: "Plano Mensal",
      price: 97.00,
      period: "/ mês",
      description: "Acesso completo mensal",
      features: [
        "Acesso a todas as coaches",
        "Chat ilimitado",
        "Análise de conversas",
        "Sugestões personalizadas"
      ],
      cta: "Assinar Mensal",
      ctaColor: "bg-gradient-to-r from-pink-500 to-rose-500"
    },
    {
      id: "anual",
      name: "Plano Anual",
      price: 697.00,
      originalPrice: 1164.00,
      period: "/ ano",
      discount: "40% OFF",
      economy: "Economia de R$ 467",
      description: "Melhor custo-benefício",
      features: [
        "Tudo do plano mensal",
        "Conteúdos exclusivos",
        "Consultoria mensal ao vivo",
        "Comunidade VIP",
        "Certificado de conclusão"
      ],
      popular: true,
      cta: "Assinar Anual (mais vendido)",
      ctaColor: "bg-[#C99A2E] hover:bg-[#B8892A]"
    },
    {
      id: "vitalicio",
      name: "Plano Vitalício",
      price: 1997.00,
      period: "pagamento único",
      description: "Acesso para sempre",
      features: [
        "Acesso vitalício garantido",
        "Todos os benefícios do anual",
        "Atualizações futuras grátis",
        "Consultoria ilimitada",
        "Eventos exclusivos presenciais",
        "Suporte prioritário VIP"
      ],
      cta: "Comprar Vitalício",
      ctaColor: "bg-gradient-to-r from-purple-500 to-indigo-600"
    },
  ];

  const selectedPlanData = plans.find(p => p.id === selectedPlan);

  const handlePlanSelect = (planId: string) => {
    setSelectedPlan(planId);
    // Show upsell modal when selecting annual plan
    if (planId === "anual" && !showUpsellModal) {
      setShowUpsellModal(true);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate payment processing
    const orderData = {
      plan: selectedPlanData,
      paymentMethod,
      total: selectedPlanData?.price,
      date: new Date().toISOString()
    };

    // Save order (in real app, would call API)
    localStorage.setItem('lastOrder', JSON.stringify(orderData));
    
    // Show success message
    alert(`✅ Pagamento confirmado!\n\nPlano: ${selectedPlanData?.name}\nValor: R$ ${selectedPlanData?.price.toFixed(2)}\n\nRedirecionando para o Dashboard...`);
    
    // Redirect to dashboard with premium access
    router.push("/chat?premium=true");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAcceptTrial = () => {
    setShowUpsellModal(false);
    alert("🎉 Ótima escolha! Você ganhou 7 dias GRÁTIS do plano anual.\n\nApós o período de teste, será cobrado R$ 697,00/ano.\n\nCancele a qualquer momento durante o trial.");
    router.push("/chat?trial=true");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0E0A12] via-[#1a0f2e] to-[#0E0A12]">
      {/* Upsell Modal */}
      {showUpsellModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gradient-to-br from-[#1a0f2e] to-[#0E0A12] border-2 border-[#C99A2E] rounded-3xl p-8 max-w-md w-full relative shadow-2xl shadow-[#C99A2E]/20">
            <button
              onClick={() => setShowUpsellModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-[#C99A2E]/20 rounded-full mb-4">
                <Sparkles className="w-8 h-8 text-[#C99A2E]" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">
                Oferta Especial! 🎁
              </h2>
              <p className="text-gray-300 text-lg">
                Deseja experimentar <span className="text-[#C99A2E] font-bold">7 dias GRÁTIS</span> antes de assinar o plano anual?
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-6">
              <ul className="space-y-2 text-sm text-gray-300">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#C99A2E]" />
                  Acesso completo por 7 dias
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#C99A2E]" />
                  Cancele a qualquer momento
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#C99A2E]" />
                  Sem compromisso
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#C99A2E]" />
                  Após trial: R$ 697/ano (40% OFF)
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <button
                onClick={handleAcceptTrial}
                className="w-full px-6 py-4 bg-[#C99A2E] hover:bg-[#B8892A] text-white rounded-xl font-bold text-lg transition-all duration-300 hover:scale-105 shadow-lg shadow-[#C99A2E]/30"
              >
                Sim! Quero 7 dias GRÁTIS 🎉
              </button>
              <button
                onClick={() => setShowUpsellModal(false)}
                className="w-full px-6 py-3 bg-white/5 hover:bg-white/10 text-gray-300 rounded-xl font-medium transition-colors"
              >
                Não, prefiro assinar direto
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Link
          href="/vitrine"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Voltar
        </Link>

        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Escolha seu Plano
          </h1>
          <p className="text-gray-400 text-lg">
            Transforme sua vida amorosa com o Vênus Club
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Plan Cards */}
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative bg-white/5 backdrop-blur-sm border-2 rounded-3xl p-6 transition-all duration-300 hover:scale-105 cursor-pointer ${
                selectedPlan === plan.id
                  ? plan.id === "anual"
                    ? "border-[#C99A2E] shadow-2xl shadow-[#C99A2E]/30"
                    : "border-pink-500 shadow-2xl shadow-pink-500/30"
                  : "border-white/10 hover:border-white/30"
              }`}
              onClick={() => handlePlanSelect(plan.id)}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-[#C99A2E] text-white text-sm font-bold rounded-full shadow-lg flex items-center gap-1">
                  <Sparkles className="w-4 h-4" />
                  Mais econômico
                </div>
              )}

              {/* Discount Badge */}
              {plan.discount && (
                <div className="absolute -top-4 right-4 px-3 py-1 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold rounded-full shadow-lg">
                  {plan.discount}
                </div>
              )}

              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-gray-400 text-sm mb-4">{plan.description}</p>
                
                <div className="mb-2">
                  {plan.originalPrice && (
                    <div className="text-gray-500 line-through text-lg mb-1">
                      R$ {plan.originalPrice.toFixed(2)}
                    </div>
                  )}
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-4xl font-bold text-white">
                      R$ {plan.price.toFixed(2)}
                    </span>
                    <span className="text-gray-400 text-sm">{plan.period}</span>
                  </div>
                </div>

                {plan.economy && (
                  <div className="text-[#C99A2E] text-sm font-semibold">
                    {plan.economy}
                  </div>
                )}
              </div>

              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-gray-300">
                    <Check className="w-5 h-5 text-[#C99A2E] flex-shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handlePlanSelect(plan.id)}
                className={`w-full px-6 py-4 ${plan.ctaColor} text-white rounded-xl font-bold text-lg transition-all duration-300 hover:scale-105 shadow-lg`}
              >
                {selectedPlan === plan.id ? "✓ Selecionado" : plan.cta}
              </button>
            </div>
          ))}
        </div>

        {/* Checkout Form */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8">
            <h2 className="text-2xl font-bold text-white mb-6">Dados de Pagamento</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Informações Pessoais</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Nome Completo
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#C99A2E]/50 transition-colors"
                      placeholder="Seu nome completo"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#C99A2E]/50 transition-colors"
                      placeholder="seu@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Telefone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#C99A2E]/50 transition-colors"
                      placeholder="(00) 00000-0000"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      CPF
                    </label>
                    <input
                      type="text"
                      name="cpf"
                      value={formData.cpf}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#C99A2E]/50 transition-colors"
                      placeholder="000.000.000-00"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method Selection */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Forma de Pagamento</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("card")}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      paymentMethod === "card"
                        ? "border-[#C99A2E] bg-[#C99A2E]/10"
                        : "border-white/10 bg-white/5 hover:border-white/30"
                    }`}
                  >
                    <CreditCard className="w-6 h-6 text-white mx-auto mb-2" />
                    <div className="text-white font-medium text-sm">Cartão de Crédito</div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("pix")}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      paymentMethod === "pix"
                        ? "border-[#C99A2E] bg-[#C99A2E]/10"
                        : "border-white/10 bg-white/5 hover:border-white/30"
                    }`}
                  >
                    <div className="text-2xl mx-auto mb-2">💳</div>
                    <div className="text-white font-medium text-sm">PIX</div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("boleto")}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      paymentMethod === "boleto"
                        ? "border-[#C99A2E] bg-[#C99A2E]/10"
                        : "border-white/10 bg-white/5 hover:border-white/30"
                    }`}
                  >
                    <div className="text-2xl mx-auto mb-2">🧾</div>
                    <div className="text-white font-medium text-sm">Boleto</div>
                  </button>
                </div>

                {/* Card Payment Form */}
                {paymentMethod === "card" && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Número do Cartão
                      </label>
                      <input
                        type="text"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#C99A2E]/50 transition-colors"
                        placeholder="0000 0000 0000 0000"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Nome no Cartão
                      </label>
                      <input
                        type="text"
                        name="cardName"
                        value={formData.cardName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#C99A2E]/50 transition-colors"
                        placeholder="Nome como no cartão"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Validade
                        </label>
                        <input
                          type="text"
                          name="cardExpiry"
                          value={formData.cardExpiry}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#C99A2E]/50 transition-colors"
                          placeholder="MM/AA"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          CVV
                        </label>
                        <input
                          type="text"
                          name="cardCvv"
                          value={formData.cardCvv}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#C99A2E]/50 transition-colors"
                          placeholder="000"
                        />
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-400 mt-2">
                      <Lock className="w-4 h-4" />
                      Pagamento seguro via Stripe (placeholder)
                    </div>
                  </div>
                )}

                {/* PIX Payment */}
                {paymentMethod === "pix" && (
                  <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-center">
                    <div className="text-6xl mb-4">📱</div>
                    <h4 className="text-white font-semibold mb-2">Pagamento via PIX</h4>
                    <p className="text-gray-400 text-sm mb-4">
                      Após confirmar, você receberá o QR Code para pagamento
                    </p>
                    <div className="text-xs text-gray-500">
                      (Placeholder - integração em desenvolvimento)
                    </div>
                  </div>
                )}

                {/* Boleto Payment */}
                {paymentMethod === "boleto" && (
                  <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-center">
                    <div className="text-6xl mb-4">🧾</div>
                    <h4 className="text-white font-semibold mb-2">Pagamento via Boleto</h4>
                    <p className="text-gray-400 text-sm mb-4">
                      Após confirmar, você receberá o boleto por email
                    </p>
                    <div className="text-xs text-gray-500">
                      (Placeholder - integração em desenvolvimento)
                    </div>
                  </div>
                )}
              </div>

              {/* Order Summary */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Resumo do Pedido</h3>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-gray-300">
                    <span>{selectedPlanData?.name}</span>
                    <span>R$ {selectedPlanData?.price.toFixed(2)}</span>
                  </div>
                  {selectedPlanData?.originalPrice && (
                    <div className="flex justify-between text-sm text-[#C99A2E]">
                      <span>Desconto</span>
                      <span>- R$ {(selectedPlanData.originalPrice - selectedPlanData.price).toFixed(2)}</span>
                    </div>
                  )}
                </div>
                <div className="border-t border-white/10 pt-4">
                  <div className="flex justify-between text-xl font-bold text-white">
                    <span>Total</span>
                    <span>R$ {selectedPlanData?.price.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full px-8 py-5 bg-[#C99A2E] hover:bg-[#B8892A] text-white rounded-xl font-bold text-xl transition-all duration-300 hover:scale-105 shadow-2xl shadow-[#C99A2E]/30 flex items-center justify-center gap-2"
              >
                <Lock className="w-5 h-5" />
                Confirmar Pagamento
              </button>

              <p className="text-center text-xs text-gray-500">
                Ao confirmar, você concorda com nossos Termos de Uso e Política de Privacidade
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
