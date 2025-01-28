import React, { createContext, useContext, useState } from 'react';
import { Product } from '../types';

interface ProductContextType {
  products: Product[];
  addProduct: (product: Product) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (productId: string) => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

const initialProducts: Product[] = [
  {
    id: '1',
    name: 'Classic White Sneakers',
    brand: 'Nike',
    price: 299.99,
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772',
    description: 'Classic white sneakers perfect for any occasion',
    category: 'Shoes',
  },
  {
    id: '2',
    name: 'Denim Jacket',
    brand: 'Levi\'s',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1601333144130-8cbb312386b6',
    description: 'Classic denim jacket with modern fit',
    category: 'Jackets',
  },
];

export function ProductProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>(initialProducts);

  const addProduct = (product: Product) => {
    setProducts((current) => [...current, product]);
  };

  const updateProduct = (product: Product) => {
    setProducts((current) =>
      current.map((p) => (p.id === product.id ? product : p))
    );
  };

  const deleteProduct = (productId: string) => {
    setProducts((current) => current.filter((p) => p.id !== productId));
  };

  return (
    <ProductContext.Provider
      value={{ products, addProduct, updateProduct, deleteProduct }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
}