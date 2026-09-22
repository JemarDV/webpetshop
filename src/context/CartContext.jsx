import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const CartContext = createContext(null);

const STORAGE_KEY = 'webpetshop-cart';
const FREE_SHIPPING_THRESHOLD = 79;
const SHIPPING_COST = 9.99;

function loadCart() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function CartProvider({ children }) {
  const [items, setItems] = useState(loadCart);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addToCart = (product, quantity = 1) => {
    setItems((current) => {
      const existing = current.find((item) => item.id === product.id);
      if (existing) {
        return current.map((item) =>
          item.id === product.id
            ? { ...item, qty: item.qty + quantity }
            : item,
        );
      }
      return [
        ...current,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          category: product.category,
          qty: quantity,
        },
      ];
    });
  };

  const removeFromCart = (productId) => {
    setItems((current) => current.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity < 1) return;
    setItems((current) =>
      current.map((item) =>
        item.id === productId ? { ...item, qty: quantity } : item,
      ),
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const value = useMemo(() => {
    const cartCount = items.reduce((total, item) => total + item.qty, 0);
    const subtotal = items.reduce(
      (total, item) => total + item.price * item.qty,
      0,
    );
    const shipping =
      subtotal === 0 || subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
    const total = subtotal + shipping;

    return {
      items,
      cartCount,
      subtotal,
      shipping,
      total,
      freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
    };
  }, [items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart debe usarse dentro de un CartProvider');
  }
  return context;
}

export { CartProvider, useCart };