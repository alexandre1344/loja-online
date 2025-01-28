import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  LayoutDashboard,
  Package,
  FileText,
  LogOut,
  Menu,
  X,
} from 'lucide-react';

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const handleLogout = () => {
    logout();
    navigate('/admin');
  };

  const menuItems = [
    {
      path: '/admin/dashboard',
      label: 'Dashboard',
      icon: <LayoutDashboard size={20} />,
    },
    {
      path: '/admin/products',
      label: 'Produtos',
      icon: <Package size={20} />,
    },
    {
      path: '/admin/reports',
      label: 'Relatórios',
      icon: <FileText size={20} />,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile menu button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-md"
      >
        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 fixed lg:static inset-y-0 left-0 w-64 bg-white shadow-md transform transition-transform duration-200 ease-in-out lg:transform-none z-40`}
      >
        <div className="p-6">
          <h1 className="text-xl font-bold mb-8">Admin Panel</h1>
          <nav className="space-y-2">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                  location.pathname === item.path
                    ? 'bg-blue-50 text-blue-600'
                    : 'hover:bg-gray-50'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.icon}
                {item.label}
              </Link>
            ))}
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
            >
              <LogOut size={20} />
              Sair
            </button>
          </nav>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 lg:ml-64">
        <div className="min-h-screen">{children}</div>
      </main>
    </div>
  );
}