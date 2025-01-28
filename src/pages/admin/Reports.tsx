import React, { useState } from 'react';
import { useOrders } from '../../context/OrderContext';
import { FileText, Download } from 'lucide-react';

export function Reports() {
  const { orders } = useOrders();
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const filteredOrders = orders.filter((order) => {
    if (!startDate && !endDate) return true;
    const orderDate = new Date(order.createdAt);
    const start = startDate ? new Date(startDate) : new Date(0);
    const end = endDate ? new Date(endDate) : new Date();
    return orderDate >= start && orderDate <= end;
  });

  const totalRevenue = filteredOrders.reduce((sum, order) => sum + order.total, 0);
  const averageOrderValue =
    filteredOrders.length > 0 ? totalRevenue / filteredOrders.length : 0;

  const exportToCSV = () => {
    const headers = ['ID', 'Data', 'Itens', 'Total', 'Status'];
    const rows = filteredOrders.map((order) => [
      order.id,
      new Date(order.createdAt).toLocaleDateString(),
      order.items.length,
      order.total.toFixed(2),
      order.status,
    ]);

    const csv = [
      headers.join(','),
      ...rows.map((row) => row.join(',')),
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'relatorio-vendas.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Relatório de Vendas</h1>
        <button
          onClick={exportToCSV}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700"
        >
          <Download size={20} />
          Exportar CSV
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex flex-wrap gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium mb-1">Data Inicial</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="border rounded-lg px-4 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Data Final</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="border rounded-lg px-4 py-2"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">Total de Pedidos</p>
            <p className="text-2xl font-bold">{filteredOrders.length}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">Receita Total</p>
            <p className="text-2xl font-bold">R$ {totalRevenue.toFixed(2)}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">Ticket Médio</p>
            <p className="text-2xl font-bold">
              R$ {averageOrderValue.toFixed(2)}
            </p>
          </div>
        </div>

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
              {filteredOrders.map((order) => (
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