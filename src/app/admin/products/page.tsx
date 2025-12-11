"use client";

import { useState } from "react";
import { Plus, Edit, Trash2, Save, X, Upload } from "lucide-react";

interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  images: string[];
  tags: string[];
  stock: number;
}

const INITIAL_PRODUCTS: Product[] = [
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
];

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [isCreating, setIsCreating] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Product>>({
    title: "",
    description: "",
    price: 0,
    images: [],
    tags: [],
    stock: 0,
  });

  const handleCreate = () => {
    setIsCreating(true);
    setFormData({
      title: "",
      description: "",
      price: 0,
      images: [],
      tags: [],
      stock: 0,
    });
  };

  const handleEdit = (product: Product) => {
    setEditingId(product.id);
    setFormData(product);
  };

  const handleSave = () => {
    if (isCreating) {
      const newProduct: Product = {
        id: Date.now().toString(),
        title: formData.title || "",
        description: formData.description || "",
        price: formData.price || 0,
        images: formData.images || [],
        tags: formData.tags || [],
        stock: formData.stock || 0,
      };
      setProducts([...products, newProduct]);
      setIsCreating(false);
    } else if (editingId) {
      setProducts(
        products.map((p) =>
          p.id === editingId ? { ...p, ...formData } as Product : p
        )
      );
      setEditingId(null);
    }
    setFormData({
      title: "",
      description: "",
      price: 0,
      images: [],
      tags: [],
      stock: 0,
    });
  };

  const handleCancel = () => {
    setIsCreating(false);
    setEditingId(null);
    setFormData({
      title: "",
      description: "",
      price: 0,
      images: [],
      tags: [],
      stock: 0,
    });
  };

  const handleDelete = (id: string) => {
    if (confirm("Tem certeza que deseja deletar este produto?")) {
      setProducts(products.filter((p) => p.id !== id));
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "price" || name === "stock" ? parseFloat(value) || 0 : value,
    });
  };

  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tags = e.target.value.split(",").map((tag) => tag.trim());
    setFormData({ ...formData, tags });
  };

  const handleImageUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const urls = e.target.value.split(",").map((url) => url.trim());
    setFormData({ ...formData, images: urls });
  };

  return (
    <div className="min-h-screen bg-[#0E0A12]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Administração de Produtos</h1>
            <p className="text-gray-400">Gerencie o catálogo de produtos</p>
          </div>
          <button
            onClick={handleCreate}
            className="flex items-center gap-2 px-6 py-3 bg-[#D81B60] hover:bg-[#D81B60]/90 text-white rounded-full font-semibold transition-all duration-300 hover:scale-105 shadow-lg shadow-[#D81B60]/30"
          >
            <Plus className="w-5 h-5" />
            Novo Produto
          </button>
        </div>

        {/* Create/Edit Form */}
        {(isCreating || editingId) && (
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-white">
                {isCreating ? "Criar Novo Produto" : "Editar Produto"}
              </h2>
              <button
                onClick={handleCancel}
                className="p-2 text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Título
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#D81B60]/50 transition-colors"
                  placeholder="Nome do produto"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Preço (R$)
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  step="0.01"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#D81B60]/50 transition-colors"
                  placeholder="0.00"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Descrição
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#D81B60]/50 transition-colors resize-none"
                  placeholder="Descrição detalhada do produto"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Tags (separadas por vírgula)
                </label>
                <input
                  type="text"
                  value={formData.tags?.join(", ")}
                  onChange={handleTagsChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#D81B60]/50 transition-colors"
                  placeholder="pompoarismo, sensualidade"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Estoque
                </label>
                <input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#D81B60]/50 transition-colors"
                  placeholder="0"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  URLs das Imagens (separadas por vírgula)
                </label>
                <input
                  type="text"
                  value={formData.images?.join(", ")}
                  onChange={handleImageUrlChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#D81B60]/50 transition-colors"
                  placeholder="https://exemplo.com/imagem1.jpg, https://exemplo.com/imagem2.jpg"
                />
              </div>
            </div>

            <div className="flex gap-4 mt-6">
              <button
                onClick={handleSave}
                className="flex items-center gap-2 px-6 py-3 bg-[#D81B60] hover:bg-[#D81B60]/90 text-white rounded-lg font-semibold transition-all duration-300 hover:scale-105 shadow-lg shadow-[#D81B60]/30"
              >
                <Save className="w-5 h-5" />
                Salvar
              </button>
              <button
                onClick={handleCancel}
                className="px-6 py-3 bg-white/5 hover:bg-white/10 text-white rounded-lg font-semibold transition-colors"
              >
                Cancelar
              </button>
            </div>
          </div>
        )}

        {/* Products List */}
        <div className="space-y-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-[#D81B60]/50 transition-all duration-300"
            >
              <div className="flex gap-6">
                {/* Product Image */}
                <img
                  src={product.images[0]}
                  alt={product.title}
                  className="w-24 h-24 rounded-lg object-cover"
                />

                {/* Product Info */}
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-1">
                        {product.title}
                      </h3>
                      <p className="text-gray-400 text-sm mb-2">{product.description}</p>
                      <div className="flex flex-wrap gap-2 mb-2">
                        {product.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 text-xs bg-white/5 text-gray-300 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(product)}
                        className="p-2 bg-white/5 hover:bg-white/10 text-white rounded-lg transition-colors"
                      >
                        <Edit className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="p-2 bg-white/5 hover:bg-red-500/20 text-red-500 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 text-sm">
                    <div>
                      <span className="text-gray-400">Preço: </span>
                      <span className="text-white font-semibold">
                        R$ {product.price.toFixed(2)}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-400">Estoque: </span>
                      <span className="text-white font-semibold">{product.stock}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {products.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-400 text-lg mb-4">Nenhum produto cadastrado</p>
            <button
              onClick={handleCreate}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#D81B60] hover:bg-[#D81B60]/90 text-white rounded-full font-semibold transition-all duration-300 hover:scale-105 shadow-lg shadow-[#D81B60]/30"
            >
              <Plus className="w-5 h-5" />
              Criar Primeiro Produto
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
