import React, { useState } from 'react';
import { useProducts } from '../context/ProductContext';
import { ProductCard } from '../components/ProductCard';
import { Cart } from '../components/Cart';
import { ShoppingCart, X } from 'lucide-react';
import { useCart } from '../context/CartContext';

export function Store() {
  const { products } = useProducts();
  const { items } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = Array.from(
    new Set(products.map((product) => product.category))
  );

  const filteredProducts = products.filter(
    (product) =>
      (!selectedCategory || product.category === selectedCategory) &&
      (!searchTerm ||
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl sm:text-2xl font-bold">Multi Store</h1>
            <button
              onClick={() => setIsCartOpen(true)}
              className="bg-blue-600 text-white px-3 sm:px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 relative"
            >
              <ShoppingCart size={20} />
              <span className="hidden sm:inline">Carrinho</span>
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center animate-bounce">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
          <div className="mt-4 flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              placeholder="Buscar produtos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="border rounded-lg px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Todas as categorias</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              Nenhum produto encontrado
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </main>

      {/* Cart Sidebar */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity duration-300 ${
          isCartOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsCartOpen(false)}
      >
        <div
          className={`fixed inset-y-0 right-0 w-full max-w-md bg-white shadow-xl transform transition-transform duration-300 ${
            isCartOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-xl font-bold">Carrinho</h2>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X size={24} />
            </button>
          </div>
          <Cart onClose={() => setIsCartOpen(false)} />
        </div>
      </div>
    </div>
  );
}