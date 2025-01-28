import React, { useState } from 'react';
import { useProducts } from '../context/ProductContext';
import { Product } from '../types';
import { Pencil, Trash2, Plus } from 'lucide-react';

export function Admin() {
  const { products, addProduct, updateProduct, deleteProduct } = useProducts();
  const [isEditing, setIsEditing] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Partial<Product>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentProduct.id) {
      updateProduct(currentProduct as Product);
    } else {
      addProduct({
        ...currentProduct,
        id: Date.now().toString(),
      } as Product);
    }
    setCurrentProduct({});
    setIsEditing(false);
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gerenciar Produtos</h1>
        <button
          onClick={() => setIsEditing(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700"
        >
          <Plus size={20} />
          Novo Produto
        </button>
      </div>

      {isEditing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-lg p-6 max-w-md w-full"
          >
            <h2 className="text-xl font-bold mb-4">
              {currentProduct.id ? 'Editar' : 'Novo'} Produto
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Nome</label>
                <input
                  type="text"
                  value={currentProduct.name || ''}
                  onChange={(e) =>
                    setCurrentProduct((p) => ({ ...p, name: e.target.value }))
                  }
                  className="w-full border rounded-lg p-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Marca</label>
                <input
                  type="text"
                  value={currentProduct.brand || ''}
                  onChange={(e) =>
                    setCurrentProduct((p) => ({ ...p, brand: e.target.value }))
                  }
                  className="w-full border rounded-lg p-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Preço</label>
                <input
                  type="number"
                  value={currentProduct.price || ''}
                  onChange={(e) =>
                    setCurrentProduct((p) => ({
                      ...p,
                      price: parseFloat(e.target.value),
                    }))
                  }
                  className="w-full border rounded-lg p-2"
                  required
                  step="0.01"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  URL da Imagem
                </label>
                <input
                  type="url"
                  value={currentProduct.image || ''}
                  onChange={(e) =>
                    setCurrentProduct((p) => ({ ...p, image: e.target.value }))
                  }
                  className="w-full border rounded-lg p-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Descrição
                </label>
                <textarea
                  value={currentProduct.description || ''}
                  onChange={(e) =>
                    setCurrentProduct((p) => ({
                      ...p,
                      description: e.target.value,
                    }))
                  }
                  className="w-full border rounded-lg p-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Categoria
                </label>
                <input
                  type="text"
                  value={currentProduct.category || ''}
                  onChange={(e) =>
                    setCurrentProduct((p) => ({ ...p, category: e.target.value }))
                  }
                  className="w-full border rounded-lg p-2"
                  required
                />
              </div>
            </div>
            <div className="mt-6 flex gap-2">
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex-1"
              >
                Salvar
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsEditing(false);
                  setCurrentProduct({});
                }}
                className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-md">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="p-4 text-left">Imagem</th>
              <th className="p-4 text-left">Nome</th>
              <th className="p-4 text-left">Marca</th>
              <th className="p-4 text-left">Preço</th>
              <th className="p-4 text-left">Ações</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-b">
                <td className="p-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                </td>
                <td className="p-4">{product.name}</td>
                <td className="p-4">{product.brand}</td>
                <td className="p-4">R$ {product.price.toFixed(2)}</td>
                <td className="p-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setCurrentProduct(product);
                        setIsEditing(true);
                      }}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                    >
                      <Pencil size={20} />
                    </button>
                    <button
                      onClick={() => deleteProduct(product.id)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}