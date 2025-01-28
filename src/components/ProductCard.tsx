import React from 'react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { ShoppingCart } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative pb-[75%]">
        <img
          src={product.image}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold truncate">{product.name}</h3>
        <p className="text-sm text-gray-600 truncate">{product.brand}</p>
        <p className="text-sm text-gray-500 mt-1 line-clamp-2">{product.description}</p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-xl font-bold">
            R$ {product.price.toFixed(2)}
          </span>
          <button
            onClick={() => addToCart(product)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors transform active:scale-95"
          >
            <ShoppingCart size={20} />
            <span className="hidden sm:inline">Adicionar</span>
          </button>
        </div>
      </div>
    </div>
  );
}