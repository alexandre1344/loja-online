import React from 'react';
import { useOrders } from '../../context/OrderContext';
import { useProducts } from '../../context/ProductContext';
import { Package, DollarSign, ShoppingBag, TrendingUp } from 'lucide-react';

export function Dashboard() {
  const { orders } = useOrders();
  const { products } = useProducts();

  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  const totalOrders = orders.length;
  const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

  const recentOrders = orders.slice(0, 5);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center gap-4">
            <div className="bg-blue-100 p-3 rounded-full">
              <DollarSign className="text-blue-600" size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-600">Receita Total</p>
              <p className="text-xl font-bold">R$ {totalRevenue.toFixed(2)}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center gap-4">
            <div className="bg-green-100 p-3 rounded-full">
              <ShoppingBag className="text-green-600" size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total de Pedidos</p>
              <p className="text-xl font-bold">{totalOrders}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center gap-4">
            <div className="bg-purple-100 p-3 rounded-full">
              <Package className="text-purple-600" size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total de Produtos</p>
              <p className="text-xl font-bold">{products.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center gap-4">
            <div className="bg-orange-100 p-3 rounded-full">
              <TrendingUp className="text-orange-600" size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-600">Ticket Médio</p>
              <p className="text-xl font-bold">
                R$ {averageOrderValue.toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold mb-4">Pedidos Recentes</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3">ID</th>
                <th className="text-left py-3">Data</th>
                <th className="text-left py-3">Itens</th>
                <th className="text-left py-3">Total</th>
                <th className="text-left py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr key={order.id} className="border-b">
                  <td className="py-3">{order.id}</td>
                  <td className="py-3">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-3">{order.items.length}</td>
                  <td className="py-3">R$ {order.total.toFixed(2)}</td>
                  <td className="py-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        order.status === 'completed'
                          ? 'bg-green-100 text-green-800'
                          : order.status === 'cancelled'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}