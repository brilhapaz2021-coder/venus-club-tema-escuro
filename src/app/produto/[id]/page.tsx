"use client";

import { useState } from "react";
import Link from "next/link";
import { Heart, ShoppingCart, Star, Minus, Plus, Shield, Truck, Package } from "lucide-react";

export default function ProdutoPage({ params }: { params: { id: string } }) {
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState("Standard");

  const product = {
    id: params.id,
    name: "Kit Essencial Premium",
    category: "Kits Completos",
    price: 299.90,
    rating: 4.9,
    reviews: 234,
    description:
      "Kit completo com produtos premium selecionados para proporcionar a melhor experiência. Inclui itens essenciais de alta qualidade com embalagem discreta e elegante.",
    features: [
      "Produtos de qualidade premium certificada",
      "Embalagem discreta e elegante",
      "Guia completo de uso incluído",
      "Garantia de satisfação 100%",
    ],
    variants: ["Standard", "Deluxe", "Premium"],
    inStock: true,
  };

  return (
    <div className="min-h-screen bg-[#0E0A12]">
      {/* Header */}
      <header className="border-b border-white/10 bg-[#0E0A12]/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/vitrine" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#00CFEA] via-[#FF4D6D] to-[#FFB039] flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-[#00CFEA] via-[#FF4D6D] to-[#FFB039] bg-clip-text text-transparent">
                Venus Club
              </h1>
            </Link>

            <Link
              href="/carrinho"
              className="relative p-2 hover:bg-white/5 rounded-lg transition-colors"
            >
              <ShoppingCart className="w-6 h-6 text-gray-300" />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#D81B60] rounded-full text-xs flex items-center justify-center text-white">
                3
              </span>
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="space-y-4">
            <div className="aspect-square rounded-2xl bg-gradient-to-br from-[#00CFEA] via-[#FF4D6D] to-[#FFB039] flex items-center justify-center">
              <Heart className="w-32 h-32 text-white/30" />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="aspect-square rounded-xl bg-gradient-to-br from-[#00CFEA] via-[#FF4D6D] to-[#FFB039] opacity-50 hover:opacity-100 transition-opacity cursor-pointer"
                />
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <div className="text-sm text-gray-400 mb-2">{product.category}</div>
            <h1 className="text-4xl font-bold text-white mb-4">{product.name}</h1>

            {/* Rating */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(product.rating)
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-600"
                    }`}
                  />
                ))}
              </div>
              <span className="text-white font-medium">{product.rating}</span>
              <span className="text-gray-400">({product.reviews} avaliações)</span>
            </div>

            {/* Price */}
            <div className="mb-8">
              <div className="text-4xl font-bold text-white mb-2">
                R$ {product.price.toFixed(2)}
              </div>
              <div className="text-gray-400">ou 3x de R$ {(product.price / 3).toFixed(2)} sem juros</div>
            </div>

            {/* Variants */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-300 mb-3">
                Escolha a versão:
              </label>
              <div className="flex gap-3">
                {product.variants.map((variant) => (
                  <button
                    key={variant}
                    onClick={() => setSelectedVariant(variant)}
                    className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                      selectedVariant === variant
                        ? "bg-[#D81B60] text-white shadow-lg shadow-[#D81B60]/30"
                        : "bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10"
                    }`}
                  >
                    {variant}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-300 mb-3">
                Quantidade:
              </label>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-12 h-12 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl flex items-center justify-center text-white transition-all duration-300 hover:scale-105"
                >
                  <Minus className="w-5 h-5" />
                </button>
                <span className="text-2xl font-bold text-white w-12 text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-12 h-12 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl flex items-center justify-center text-white transition-all duration-300 hover:scale-105"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Add to Cart */}
            <div className="flex gap-4 mb-8">
              <Link href="/carrinho" className="flex-1">
                <button className="w-full py-4 bg-[#D81B60] hover:bg-[#D81B60]/90 text-white rounded-xl font-semibold transition-all duration-300 hover:scale-105 shadow-lg shadow-[#D81B60]/30 flex items-center justify-center gap-2">
                  <ShoppingCart className="w-5 h-5" />
                  Adicionar ao Carrinho
                </button>
              </Link>
              <button className="w-14 h-14 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl flex items-center justify-center text-white transition-all duration-300 hover:scale-105">
                <Heart className="w-6 h-6" />
              </button>
            </div>

            {/* Features */}
            <div className="space-y-4 mb-8">
              {product.features.map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#D81B60]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-2 h-2 rounded-full bg-[#D81B60]" />
                  </div>
                  <span className="text-gray-300">{feature}</span>
                </div>
              ))}
            </div>

            {/* Shipping Info */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <InfoCard icon={<Truck className="w-6 h-6" />} text="Frete Grátis" />
              <InfoCard icon={<Shield className="w-6 h-6" />} text="Compra Segura" />
              <InfoCard icon={<Package className="w-6 h-6" />} text="Embalagem Discreta" />
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="mt-12 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-white mb-4">Sobre o Produto</h2>
          <p className="text-gray-300 leading-relaxed">{product.description}</p>
        </div>
      </div>
    </div>
  );
}

function InfoCard({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex flex-col items-center gap-2 p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl">
      <div className="text-[#D81B60]">{icon}</div>
      <span className="text-sm text-gray-300 text-center">{text}</span>
    </div>
  );
}
