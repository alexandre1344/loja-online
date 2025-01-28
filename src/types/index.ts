export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  image: string;
  description: string;
  category: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  createdAt: string;
  status: 'pending' | 'completed' | 'cancelled';
}

export interface User {
  email: string;
  password: string;
}