import React from 'react';
import { useCart } from '../context/CartContext';
import { useOrders } from '../context/OrderContext';
import { Minus, Plus, Trash2, Send, ShoppingCart } from 'lucide-react';

interface CartProps {
  onClose?: () => void;
}

export function Cart({ onClose }: CartProps) {
  const { items, removeFromCart, updateQuantity, total, clearCart } = useCart();
  const { addOrder } = useOrders();

  const sendToWhatsApp = () => {
    const message = `Novo Pedido:\n\n${items
      .map(
        (item) =>
          `${item.name} (${item.brand})\nQuantidade: ${
            item.quantity
          }\nPreço: R$ ${(item.price * item.quantity).toFixed(2)}\n`
      )
      .join('\n')}
      \nTotal: R$ ${total.toFixed(2)}`;

    const whatsappUrl = `https://wa.me/5511999999999?text=${encodeURIComponent(
      message
    )}`;
    
    // Add order to the system before clearing cart
    addOrder(items, total);
    
    window.open(whatsappUrl, '_blank');
    clearCart();
    if (onClose) onClose();
  };

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-80px)] p-4 text-center text-gray-500">
        <ShoppingCart size={48} className="mb-4 text-gray-400" />
        <p className="text-lg">Seu carrinho está vazio</p>
        <p className="text-sm mt-2">Adicione produtos para começar</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[calc(100vh-80px)]">
      <div className="flex-1 overflow-y-auto p-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-4 border-b py-4"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-20 h-20 object-cover rounded"
            />
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold truncate">{item.name}</h3>
              <p className="text-sm text-gray-600 truncate">{item.brand}</p>
              <p className="text-sm font-semibold">
                R$ {(item.price * item.quantity).toFixed(2)}
              </p>
            </div>
            <div className="flex flex-col items-end gap-2">
              <div className="flex items-center gap-2">
                <button
                  onClick={() =>
                    updateQuantity(item.id, Math.max(1, item.quantity - 1))
                  }
                  className="p-1 hover:bg-gray-100 rounded transition-colors"
                >
                  <Minus size={16} />
                </button>
                <span className="w-8 text-center">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="p-1 hover:bg-gray-100 rounded transition-colors"
                >
                  <Plus size={16} />
                </button>
              </div>
              <button
                onClick={() => removeFromCart(item.id)}
                className="p-1 text-red-500 hover:bg-red-50 rounded transition-colors"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="border-t p-4 bg-white">
        <div className="text-xl font-bold mb-4">
          Total: R$ {total.toFixed(2)}
        </div>
        <button
          onClick={sendToWhatsApp}
          className="w-full bg-green-500 text-white py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-green-600 transition-colors"
        >
          <Send size={20} />
          Enviar pedido no WhatsApp
        </button>
      </div>
    </div>
  );
}