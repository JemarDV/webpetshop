import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

const WishlistContext = createContext(null);

const STORAGE_KEY = 'webpetshop-wishlist';

function loadWishlist() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function WishlistProvider({ children }) {
  const [items, setItems] = useState(loadWishlist);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const isInWishlist = useCallback(
    (id) => items.some((item) => item.id === id),
    [items],
  );

  const toggleWishlist = (product) => {
    setItems((current) =>
      current.some((item) => item.id === product.id)
        ? current.filter((item) => item.id !== product.id)
        : [...current, product],
    );
  };

  const clearWishlist = () => {
    setItems([]);
  };

  const value = useMemo(
    () => ({
      items,
      wishlistCount: items.length,
      isInWishlist,
      toggleWishlist,
      clearWishlist,
    }),
    [items, isInWishlist],
  );

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
}

function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist debe usarse dentro de un WishlistProvider');
  }
  return context;
}

export { WishlistProvider, useWishlist };