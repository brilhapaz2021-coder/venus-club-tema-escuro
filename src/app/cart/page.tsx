"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft } from "lucide-react";

// Mock products data
const PRODUCTS = [
  {
    id: "1",
    title: "Kit Pompoarismo Iniciante",
    price: 149.90,
    image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=400&h=400&fit=crop",
  },
  {
    id: "2",
    title: "Óleo Sensual Premium",
    price: 89.90,
    image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=400&h=400&fit=crop",
  },
  {
    id: "3",
    title: "Velas Aromáticas Conjunto",
    price: 79.90,
    image: "https://images.unsplash.com/photo-1602874801006-94c4e4c0f665?w=400&h=400&fit=crop",
  },
];

interface CartItem {
  productId: string;
  quantity: number;
}

export default function CartPage() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { productId: "1", quantity: 1 },
    { productId: "2", quantity: 2 },
  ]);

  const updateQuantity = (productId: string, delta: number) => {
    setCartItems((items) =>
      items.map((item) =>
        item.productId === productId
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const removeItem = (productId: string) => {
    setCartItems((items) => items.filter((item) => item.productId !== productId));
  };

  const getProduct = (productId: string) => {
    return PRODUCTS.find((p) => p.id === productId);
  };

  const subtotal = cartItems.reduce((sum, item) => {
    const product = getProduct(item.productId);
    return sum + (product?.price || 0) * item.quantity;
  }, 0);

  const shipping = subtotal > 200 ? 0 : 15.90;
  const total = subtotal + shipping;

  const handleCheckout = () => {
    router.push("/checkout");
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-[#0E0A12] flex items-center justify-center">
        <div className="text-center">
          <ShoppingBag className="w-24 h-24 text-gray-600 mx-auto mb-6" />
          <h1 className="text-2xl font-bold text-white mb-4">Seu carrinho está vazio</h1>
          <p className="text-gray-400 mb-8">Adicione produtos para continuar</p>
          <Link
            href="/vitrine"
            className="inline-block px-8 py-3 bg-[#D81B60] hover:bg-[#D81B60]/90 text-white rounded-full font-semibold transition-all duration-300 hover:scale-105 shadow-lg shadow-[#D81B60]/30"
          >
            Explorar Produtos
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0E0A12]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Link
          href="/vitrine"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Continuar comprando
        </Link>

        <h1 className="text-3xl font-bold text-white mb-8">Carrinho de Compras</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => {
              const product = getProduct(item.productId);
              if (!product) return null;

              return (
                <div
                  key={item.productId}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-[#D81B60]/50 transition-all duration-300"
                >
                  <div className="flex gap-6">
                    {/* Product Image */}
                    <Link href={`/product/${product.id}`}>
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-24 h-24 rounded-lg object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </Link>

                    {/* Product Info */}
                    <div className="flex-1">
                      <Link href={`/product/${product.id}`}>
                        <h3 className="text-lg font-semibold text-white mb-2 hover:text-[#D81B60] transition-colors">
                          {product.title}
                        </h3>
                      </Link>
                      <p className="text-2xl font-bold text-white mb-4">
                        R$ {product.price.toFixed(2)}
                      </p>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => updateQuantity(product.id, -1)}
                            className="p-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-colors"
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="w-4 h-4 text-white" />
                          </button>
                          <span className="text-lg font-semibold text-white w-8 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(product.id, 1)}
                            className="p-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-colors"
                          >
                            <Plus className="w-4 h-4 text-white" />
                          </button>
                        </div>

                        <button
                          onClick={() => removeItem(product.id)}
                          className="ml-auto p-2 text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 sticky top-24">
              <h2 className="text-xl font-bold text-white mb-6">Resumo do Pedido</h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-400">
                  <span>Subtotal</span>
                  <span className="text-white font-semibold">R$ {subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Frete</span>
                  <span className="text-white font-semibold">
                    {shipping === 0 ? "GRÁTIS" : `R$ ${shipping.toFixed(2)}`}
                  </span>
                </div>
                {subtotal < 200 && (
                  <p className="text-sm text-[#FFB039]">
                    Falta R$ {(200 - subtotal).toFixed(2)} para frete grátis!
                  </p>
                )}
                <div className="border-t border-white/10 pt-4">
                  <div className="flex justify-between text-xl font-bold">
                    <span className="text-white">Total</span>
                    <span className="text-[#D81B60]">R$ {total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full px-8 py-4 bg-[#D81B60] hover:bg-[#D81B60]/90 text-white rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 shadow-lg shadow-[#D81B60]/30 mb-4"
              >
                Finalizar Compra
              </button>

              <div className="space-y-3 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#00CFEA] rounded-full" />
                  <span>Entrega discreta e segura</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#00CFEA] rounded-full" />
                  <span>Embalagem sem identificação</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#00CFEA] rounded-full" />
                  <span>Garantia de 30 dias</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
