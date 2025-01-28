import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Store } from './pages/Store';
import { Login } from './pages/admin/Login';
import { Dashboard } from './pages/admin/Dashboard';
import { Admin } from './pages/Admin';
import { Reports } from './pages/admin/Reports';
import { CartProvider } from './context/CartContext';
import { ProductProvider } from './context/ProductContext';
import { AuthProvider } from './context/AuthContext';
import { OrderProvider } from './context/OrderContext';
import { AdminLayout } from './components/AdminLayout';
import { useAuth } from './context/AuthContext';

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/admin" replace />;
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ProductProvider>
          <OrderProvider>
            <CartProvider>
              <Routes>
                <Route path="/" element={<Store />} />
                <Route path="/admin" element={<Login />} />
                <Route
                  path="/admin/dashboard"
                  element={
                    <PrivateRoute>
                      <AdminLayout>
                        <Dashboard />
                      </AdminLayout>
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/admin/products"
                  element={
                    <PrivateRoute>
                      <AdminLayout>
                        <Admin />
                      </AdminLayout>
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/admin/reports"
                  element={
                    <PrivateRoute>
                      <AdminLayout>
                        <Reports />
                      </AdminLayout>
                    </PrivateRoute>
                  }
                />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </CartProvider>
          </OrderProvider>
        </ProductProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;