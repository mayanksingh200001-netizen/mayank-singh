export type Category = 'all' | 'audio' | 'seating' | 'lighting' | 'living';

export interface ProductVariant {
  id: string;
  name: string;
  colorHex: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
}

export interface Product {
  id: string;
  name: string;
  subtitle: string;
  category: Category;
  categoryLabel: string;
  price: number;
  originalPrice?: number;
  inStock: boolean;
  stockCount: number;
  badge?: string;
  image: string;
  fallbackColor: string;
  description: string;
  specs: {
    materials: string;
    dimensions: string;
    origin: string;
    warranty: string;
  };
  variants: ProductVariant[];
  rating: number;
  reviewCount: number;
  reviews: Review[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedVariant: ProductVariant;
}

export interface Order {
  id: string;
  createdAt: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  customer: {
    fullName: string;
    email: string;
    address: string;
    city: string;
    postalCode: string;
    paymentMethod: 'card' | 'cod';
  };
  status: 'Confirmed' | 'In Production' | 'Dispatched';
  estimatedDelivery: string;
}
