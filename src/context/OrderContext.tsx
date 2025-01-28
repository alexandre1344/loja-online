import React, { createContext, useContext, useState } from 'react';
import { Order, CartItem } from '../types';

interface OrderContextType {
  orders: Order[];
  addOrder: (items: CartItem[], total: number) => void;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export function OrderProvider({ children }: { children: React.ReactNode }) {
  const [orders, setOrders] = useState<Order[]>([]);

  const addOrder = (items: CartItem[], total: number) => {
    const newOrder: Order = {
      id: Date.now().toString(),
      items,
      total,
      createdAt: new Date().toISOString(),
      status: 'pending',
    };
    setOrders((current) => [newOrder, ...current]);
  };

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders((current) =>
      current.map((order) =>
        order.id === orderId ? { ...order, status } : order
      )
    );
  };

  return (
    <OrderContext.Provider value={{ orders, addOrder, updateOrderStatus }}>
      {children}
    </OrderContext.Provider>
  );
}

export function useOrders() {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
}