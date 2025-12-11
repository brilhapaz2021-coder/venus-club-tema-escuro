"use client";

import { useState } from "react";
import Link from "next/link";
import { ShoppingCart, Heart, Filter, Search } from "lucide-react";

// Mock products data
const PRODUCTS = [
  {
    id: "1",
    title: "Kit Pompoarismo Iniciante",
    description: "Kit completo para iniciar sua jornada de autoconhecimento",
    price: 149.90,
    images: ["https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=400&h=400&fit=crop"],
    tags: ["pompoarismo", "auto-cuidado"],
    stock: 15,
  },
  {
    id: "2",
    title: "Óleo Sensual Premium",
    description: "Óleo aromático para massagens relaxantes e sensuais",
    price: 89.90,
    images: ["https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=400&h=400&fit=crop"],
    tags: ["sensualidade", "auto-cuidado"],
    stock: 30,
  },
  {
    id: "3",
    title: "Velas Aromáticas Conjunto",
    description: "Set de 3 velas com aromas afrodisíacos",
    price: 79.90,
    images: ["https://images.unsplash.com/photo-1602874801006-94c4e4c0f665?w=400&h=400&fit=crop"],
    tags: ["sensualidade", "auto-cuidado"],
    stock: 25,
  },
  {
    id: "4",
    title: "Bolas Tailandesas Luxo",
    description: "Bolas de pompoarismo em silicone médico premium",
    price: 199.90,
    images: ["https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=400&h=400&fit=crop"],
    tags: ["pompoarismo"],
    stock: 10,
  },
  {
    id: "5",
    title: "Lingerie Sensual Deluxe",
    description: "Conjunto de lingerie elegante e confortável",
    price: 129.90,
    images: ["https://images.unsplash.com/photo-1583846112476-f5e88f0c2c3e?w=400&h=400&fit=crop"],
    tags: ["sensualidade"],
    stock: 20,
  },
  {
    id: "6",
    title: "Kit Auto-Cuidado Completo",
    description: "Tudo que você precisa para um momento especial",
    price: 249.90,
    images: ["https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=400&h=400&fit=crop"],
    tags: ["auto-cuidado", "sensualidade"],
    stock: 12,
  },
];

const TAGS = ["Todos", "pompoarismo", "sensualidade", "auto-cuidado"];

export default function VitrinePage() {
  const [selectedTag, setSelectedTag] = useState("Todos");
  const [searchQuery, setSearchQuery] = useState("");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [cart, setCart] = useState<string[]>([]);

  const filteredProducts = PRODUCTS.filter((product) => {
    const matchesTag = selectedTag === "Todos" || product.tags.includes(selectedTag);
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTag && matchesSearch;
  });

  const toggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]
    );
  };

  const addToCart = (id: string) => {
    setCart((prev) => [...prev, id]);
  };

  return (
    <div className="min-h-screen bg-[#0E0A12]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Vitrine de Produtos</h1>
            <p className="text-gray-400">Produtos selecionados especialmente para você</p>
          </div>
          <Link
            href="/cart"
            className="flex items-center gap-2 px-6 py-3 bg-[#D81B60] hover:bg-[#D81B60]/90 text-white rounded-full font-semibold transition-all duration-300 hover:scale-105 shadow-lg shadow-[#D81B60]/30"
          >
            <ShoppingCart className="w-5 h-5" />
            Carrinho ({cart.length})
          </Link>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar produtos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#D81B60]/50 transition-colors"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-3 mb-8 overflow-x-auto pb-2">
          <Filter className="w-5 h-5 text-gray-400 flex-shrink-0" />
          {TAGS.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-4 py-2 rounded-full font-medium whitespace-nowrap transition-all duration-300 ${
                selectedTag === tag
                  ? "bg-[#D81B60] text-white shadow-lg shadow-[#D81B60]/30"
                  : "bg-white/5 text-gray-400 hover:bg-white/10"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:border-[#D81B60]/50 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-[#D81B60]/20"
            >
              {/* Product Image */}
              <Link href={`/product/${product.id}`}>
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={product.images[0]}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </Link>

              {/* Product Info */}
              <div className="p-5">
                <div className="flex items-start justify-between mb-2">
                  <Link href={`/product/${product.id}`}>
                    <h3 className="text-lg font-semibold text-white group-hover:text-[#D81B60] transition-colors">
                      {product.title}
                    </h3>
                  </Link>
                  <button
                    onClick={() => toggleFavorite(product.id)}
                    className="flex-shrink-0 ml-2"
                  >
                    <Heart
                      className={`w-5 h-5 transition-all duration-300 ${
                        favorites.includes(product.id)
                          ? "fill-[#D81B60] text-[#D81B60]"
                          : "text-gray-400 hover:text-[#D81B60]"
                      }`}
                    />
                  </button>
                </div>

                <p className="text-sm text-gray-400 mb-3 line-clamp-2">
                  {product.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {product.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 text-xs bg-white/5 text-gray-300 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Price and Action */}
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-bold text-white">
                      R$ {product.price.toFixed(2)}
                    </span>
                    <p className="text-xs text-gray-500">Em estoque: {product.stock}</p>
                  </div>
                  <button
                    onClick={() => addToCart(product.id)}
                    className="px-4 py-2 bg-[#D81B60] hover:bg-[#D81B60]/90 text-white rounded-lg font-medium transition-all duration-300 hover:scale-105 shadow-lg shadow-[#D81B60]/30"
                  >
                    Adicionar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-400 text-lg">Nenhum produto encontrado</p>
          </div>
        )}
      </div>
    </div>
  );
}
