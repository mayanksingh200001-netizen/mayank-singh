import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, ProductVariant, CartItem, Order } from '../types';

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number, variant?: ProductVariant) => void;
  removeFromCart: (productId: string, variantId: string) => void;
  updateQuantity: (productId: string, variantId: string, quantity: number) => void;
  clearCart: () => void;
  totalCartItems: number;
  subtotal: number;
  discountAmount: number;
  shippingFee: number;
  totalPrice: number;
  freeShippingThreshold: number;
  
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;
  isWishlistOpen: boolean;
  setIsWishlistOpen: (open: boolean) => void;

  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;

  discountCode: string;
  discountRate: number;
  discountMessage: string | null;
  applyDiscountCode: (code: string) => boolean;
  removeDiscountCode: () => void;

  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;

  orders: Order[];
  createOrder: (customer: Order['customer']) => Order;
  isOrderHistoryOpen: boolean;
  setIsOrderHistoryOpen: (open: boolean) => void;
  lastPlacedOrder: Order | null;
  setLastPlacedOrder: (order: Order | null) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const FREE_SHIPPING_THRESHOLD = 300;
const STANDARD_SHIPPING = 25;

const PROMO_CODES: Record<string, number> = {
  'NORD10': 0.10,
  'STUDIO15': 0.15,
  'ARCHITECT': 0.20,
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const stored = localStorage.getItem('atelier_nord_cart');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('atelier_nord_wishlist');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const stored = localStorage.getItem('atelier_nord_orders');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isOrderHistoryOpen, setIsOrderHistoryOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [lastPlacedOrder, setLastPlacedOrder] = useState<Order | null>(null);

  const [discountCode, setDiscountCode] = useState<string>('');
  const [discountRate, setDiscountRate] = useState<number>(0);
  const [discountMessage, setDiscountMessage] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('atelier_nord_cart', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('atelier_nord_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.error(e);
    }
  }, [wishlist]);

  useEffect(() => {
    try {
      localStorage.setItem('atelier_nord_orders', JSON.stringify(orders));
    } catch (e) {
      console.error(e);
    }
  }, [orders]);

  const addToCart = (product: Product, quantity = 1, variant?: ProductVariant) => {
    const chosenVariant = variant || product.variants[0];
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.product.id === product.id && item.selectedVariant.id === chosenVariant.id
      );

      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + quantity,
        };
        return next;
      } else {
        return [...prev, { product, quantity, selectedVariant: chosenVariant }];
      }
    });

    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string, variantId: string) => {
    setCart((prev) =>
      prev.filter(
        (item) => !(item.product.id === productId && item.selectedVariant.id === variantId)
      )
    );
  };

  const updateQuantity = (productId: string, variantId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId, variantId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => {
        if (item.product.id === productId && item.selectedVariant.id === variantId) {
          return { ...item, quantity };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  const isWishlisted = (productId: string) => wishlist.includes(productId);

  const applyDiscountCode = (code: string) => {
    const clean = code.trim().toUpperCase();
    if (PROMO_CODES[clean]) {
      setDiscountCode(clean);
      setDiscountRate(PROMO_CODES[clean]);
      setDiscountMessage(`Promo code ${clean} applied (${PROMO_CODES[clean] * 100}% off)`);
      return true;
    } else {
      setDiscountMessage('Invalid voucher code. Try NORD10 or STUDIO15');
      return false;
    }
  };

  const removeDiscountCode = () => {
    setDiscountCode('');
    setDiscountRate(0);
    setDiscountMessage(null);
  };

  const totalCartItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const discountAmount = Math.round(subtotal * discountRate);
  const shippingFee = subtotal === 0 || subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : STANDARD_SHIPPING;
  const totalPrice = Math.max(0, subtotal - discountAmount + shippingFee);

  const createOrder = (customer: Order['customer']): Order => {
    const orderNumber = `AN-${Math.floor(100000 + Math.random() * 900000)}`;
    const newOrder: Order = {
      id: orderNumber,
      createdAt: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
      items: [...cart],
      subtotal,
      discount: discountAmount,
      shipping: shippingFee,
      total: totalPrice,
      customer,
      status: 'Confirmed',
      estimatedDelivery: 'Oct 14 – 17, 2026',
    };

    setOrders((prev) => [newOrder, ...prev]);
    setLastPlacedOrder(newOrder);
    clearCart();
    return newOrder;
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalCartItems,
        subtotal,
        discountAmount,
        shippingFee,
        totalPrice,
        freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
        isCartOpen,
        setIsCartOpen,
        wishlist,
        toggleWishlist,
        isWishlisted,
        isWishlistOpen,
        setIsWishlistOpen,
        quickViewProduct,
        setQuickViewProduct,
        discountCode,
        discountRate,
        discountMessage,
        applyDiscountCode,
        removeDiscountCode,
        isCheckoutOpen,
        setIsCheckoutOpen,
        orders,
        createOrder,
        isOrderHistoryOpen,
        setIsOrderHistoryOpen,
        lastPlacedOrder,
        setLastPlacedOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
