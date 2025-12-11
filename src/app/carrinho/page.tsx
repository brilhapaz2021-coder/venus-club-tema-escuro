"use client";

import { useState } from "react";
import Link from "next/link";
import { Heart, Trash2, Plus, Minus, ShoppingBag, Tag } from "lucide-react";

type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  variant: string;
  image: string;
};

export default function CarrinhoPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      name: "Kit Essencial Premium",
      price: 299.90,
      quantity: 1,
      variant: "Standard",
      image: "from-[#00CFEA] to-[#FF4D6D]",
    },
    {
      id: 2,
      name: "Coleção Especial Luxo",
      price: 449.90,
      quantity: 1,
      variant: "Deluxe",
      image: "from-[#FF4D6D] to-[#FFB039]",
    },
    {
      id: 3,
      name: "Starter Pack Iniciante",
      price: 149.90,
      quantity: 2,
      variant: "Standard",
      image: "from-[#FFB039] to-[#00CFEA]",
    },
  ]);

  const [couponCode, setCouponCode] = useState("");

  const updateQuantity = (id: number, delta: number) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = subtotal > 200 ? 0 : 15.90;
  const discount = 0;
  const total = subtotal + shipping - discount;

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
              href="/vitrine"
              className="text-gray-400 hover:text-white text-sm transition-colors"
            >
              Continuar Comprando
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-3xl font-bold text-white mb-8">Seu Carrinho</h2>

        {cartItems.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4">
              <ShoppingBag className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">
              Seu carrinho está vazio
            </h3>
            <p className="text-gray-400 mb-6">
              Adicione produtos para começar suas compras
            </p>
            <Link
              href="/vitrine"
              className="inline-flex px-8 py-4 bg-[#D81B60] hover:bg-[#D81B60]/90 text-white rounded-full font-semibold transition-all duration-300 hover:scale-105 shadow-lg shadow-[#D81B60]/30"
            >
              Explorar Produtos
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-[#D81B60]/50 transition-all"
                >
                  <div className="flex gap-6">
                    {/* Product Image */}
                    <div
                      className={`w-24 h-24 rounded-xl bg-gradient-to-br ${item.image} flex items-center justify-center flex-shrink-0`}
                    >
                      <Heart className="w-8 h-8 text-white/30" />
                    </div>

                    {/* Product Info */}
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="text-lg font-semibold text-white mb-1">
                            {item.name}
                          </h3>
                          <p className="text-sm text-gray-400">{item.variant}</p>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="p-2 hover:bg-white/5 rounded-lg text-gray-400 hover:text-red-400 transition-colors"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>

                      <div className="flex items-center justify-between mt-4">
                        {/* Quantity Controls */}
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="w-8 h-8 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg flex items-center justify-center text-white transition-all"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="text-white font-medium w-8 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="w-8 h-8 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg flex items-center justify-center text-white transition-all"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Price */}
                        <div className="text-right">
                          <div className="text-xl font-bold text-white">
                            R$ {(item.price * item.quantity).toFixed(2)}
                          </div>
                          <div className="text-sm text-gray-400">
                            R$ {item.price.toFixed(2)} cada
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 sticky top-24">
                <h3 className="text-xl font-bold text-white mb-6">
                  Resumo do Pedido
                </h3>

                {/* Coupon */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Cupom de Desconto
                  </label>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Código"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#D81B60] focus:border-transparent transition-all"
                      />
                    </div>
                    <button className="px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white font-medium transition-all">
                      Aplicar
                    </button>
                  </div>
                </div>

                {/* Price Breakdown */}
                <div className="space-y-3 mb-6 pb-6 border-b border-white/10">
                  <div className="flex justify-between text-gray-300">
                    <span>Subtotal</span>
                    <span>R$ {subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-300">
                    <span>Frete</span>
                    <span className={shipping === 0 ? "text-green-400" : ""}>
                      {shipping === 0 ? "Grátis" : `R$ ${shipping.toFixed(2)}`}
                    </span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-green-400">
                      <span>Desconto</span>
                      <span>-R$ {discount.toFixed(2)}</span>
                    </div>
                  )}
                </div>

                {/* Total */}
                <div className="flex justify-between items-center mb-6">
                  <span className="text-lg font-semibold text-white">Total</span>
                  <span className="text-2xl font-bold text-white">
                    R$ {total.toFixed(2)}
                  </span>
                </div>

                {/* Checkout Button */}
                <Link href="/checkout">
                  <button className="w-full py-4 bg-[#D81B60] hover:bg-[#D81B60]/90 text-white rounded-xl font-semibold transition-all duration-300 hover:scale-105 shadow-lg shadow-[#D81B60]/30 mb-4">
                    Finalizar Compra
                  </button>
                </Link>

                {/* Free Shipping Notice */}
                {shipping > 0 && (
                  <div className="text-center text-sm text-gray-400">
                    Falta R$ {(200 - subtotal).toFixed(2)} para frete grátis
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
