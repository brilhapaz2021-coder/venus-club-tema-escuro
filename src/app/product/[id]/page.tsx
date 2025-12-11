"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ShoppingCart, Heart, ArrowLeft, Plus, Minus, Star } from "lucide-react";

// Mock products data (same as vitrine)
const PRODUCTS = [
  {
    id: "1",
    title: "Kit Pompoarismo Iniciante",
    description: "Kit completo para iniciar sua jornada de autoconhecimento. Inclui bolas de diferentes tamanhos, guia de exercícios e acesso exclusivo a vídeos tutoriais. Material em silicone médico hipoalergênico.",
    price: 149.90,
    images: [
      "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=800&h=800&fit=crop",
    ],
    tags: ["pompoarismo", "auto-cuidado"],
    stock: 15,
    rating: 4.8,
    reviews: 127,
  },
  {
    id: "2",
    title: "Óleo Sensual Premium",
    description: "Óleo aromático para massagens relaxantes e sensuais. Fórmula natural com óleos essenciais de ylang-ylang e sândalo. Hidrata profundamente e deixa a pele macia.",
    price: 89.90,
    images: [
      "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=800&h=800&fit=crop",
    ],
    tags: ["sensualidade", "auto-cuidado"],
    stock: 30,
    rating: 4.9,
    reviews: 89,
  },
  {
    id: "3",
    title: "Velas Aromáticas Conjunto",
    description: "Set de 3 velas com aromas afrodisíacos: rosa, jasmim e baunilha. Feitas com cera de soja natural e óleos essenciais puros. Duração de 40 horas cada.",
    price: 79.90,
    images: [
      "https://images.unsplash.com/photo-1602874801006-94c4e4c0f665?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1602874801006-94c4e4c0f665?w=800&h=800&fit=crop",
    ],
    tags: ["sensualidade", "auto-cuidado"],
    stock: 25,
    rating: 4.7,
    reviews: 64,
  },
  {
    id: "4",
    title: "Bolas Tailandesas Luxo",
    description: "Bolas de pompoarismo em silicone médico premium. Design ergonômico com cordão de segurança. Três níveis de peso para progressão gradual.",
    price: 199.90,
    images: [
      "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=800&h=800&fit=crop",
    ],
    tags: ["pompoarismo"],
    stock: 10,
    rating: 5.0,
    reviews: 43,
  },
  {
    id: "5",
    title: "Lingerie Sensual Deluxe",
    description: "Conjunto de lingerie elegante e confortável. Renda francesa premium com detalhes em cetim. Disponível em diversos tamanhos.",
    price: 129.90,
    images: [
      "https://images.unsplash.com/photo-1583846112476-f5e88f0c2c3e?w=800&h=800&fit=crop",
    ],
    tags: ["sensualidade"],
    stock: 20,
    rating: 4.6,
    reviews: 98,
  },
  {
    id: "6",
    title: "Kit Auto-Cuidado Completo",
    description: "Tudo que você precisa para um momento especial. Inclui óleo, velas, máscara de seda, sais de banho e playlist exclusiva.",
    price: 249.90,
    images: [
      "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=800&h=800&fit=crop",
    ],
    tags: ["auto-cuidado", "sensualidade"],
    stock: 12,
    rating: 4.9,
    reviews: 156,
  },
];

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const productId = params.id as string;
  
  const product = PRODUCTS.find((p) => p.id === productId);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen bg-[#0E0A12] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Produto não encontrado</h1>
          <Link
            href="/vitrine"
            className="text-[#D81B60] hover:underline"
          >
            Voltar para vitrine
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    // Add to cart logic here
    router.push("/cart");
  };

  return (
    <div className="min-h-screen bg-[#0E0A12]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Link
          href="/vitrine"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Voltar para vitrine
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Images Section */}
          <div>
            {/* Main Image */}
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-white/5 border border-white/10 mb-4">
              <img
                src={product.images[selectedImage]}
                alt={product.title}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className="absolute top-4 right-4 p-3 bg-black/50 backdrop-blur-sm rounded-full hover:bg-black/70 transition-colors"
              >
                <Heart
                  className={`w-6 h-6 transition-all duration-300 ${
                    isFavorite
                      ? "fill-[#D81B60] text-[#D81B60]"
                      : "text-white"
                  }`}
                />
              </button>
            </div>

            {/* Thumbnail Images */}
            <div className="flex gap-3 overflow-x-auto pb-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                    selectedImage === index
                      ? "border-[#D81B60] scale-105"
                      : "border-white/10 hover:border-white/30"
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.title} - ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info Section */}
          <div>
            <h1 className="text-3xl font-bold text-white mb-4">{product.title}</h1>

            {/* Rating */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(product.rating)
                        ? "fill-[#FFB039] text-[#FFB039]"
                        : "text-gray-600"
                    }`}
                  />
                ))}
              </div>
              <span className="text-gray-400">
                {product.rating} ({product.reviews} avaliações)
              </span>
            </div>

            {/* Price */}
            <div className="mb-6">
              <span className="text-4xl font-bold text-white">
                R$ {product.price.toFixed(2)}
              </span>
              <p className="text-gray-400 mt-2">Em estoque: {product.stock} unidades</p>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {product.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-white/5 text-gray-300 rounded-full text-sm border border-white/10"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Description */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-white mb-3">Descrição</h2>
              <p className="text-gray-400 leading-relaxed">{product.description}</p>
            </div>

            {/* Quantity Selector */}
            <div className="mb-8">
              <label className="block text-white font-medium mb-3">Quantidade</label>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-colors"
                  disabled={quantity <= 1}
                >
                  <Minus className="w-5 h-5 text-white" />
                </button>
                <span className="text-2xl font-bold text-white w-12 text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="p-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-colors"
                  disabled={quantity >= product.stock}
                >
                  <Plus className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-[#D81B60] hover:bg-[#D81B60]/90 text-white rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 shadow-lg shadow-[#D81B60]/30"
            >
              <ShoppingCart className="w-6 h-6" />
              Adicionar ao Carrinho
            </button>

            {/* Additional Info */}
            <div className="mt-8 p-6 bg-white/5 border border-white/10 rounded-xl">
              <h3 className="text-white font-semibold mb-3">Informações Adicionais</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>✓ Entrega discreta e segura</li>
                <li>✓ Embalagem sem identificação</li>
                <li>✓ Garantia de 30 dias</li>
                <li>✓ Suporte 24/7</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
