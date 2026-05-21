"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type UserDetails = {
  name: string;
  phone: string;
  address: string;
};

export type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  description?: string;
};

export type Order = {
  id: string;
  items: CartItem[];
  total: number;
  status: 'Preparing' | 'Out for Delivery' | 'Delivered';
  date: string;
  estimatedTime: string;
};

interface AppContextType {
  user: UserDetails | null;
  setUser: (user: UserDetails) => void;
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  currentOrder: Order | null;
  setOrder: (order: Order) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUserState] = useState<UserDetails | null>(null);
  const [cart, setCartState] = useState<CartItem[]>([]);
  const [currentOrder, setCurrentOrderState] = useState<Order | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const storedUser = localStorage.getItem("shawarmastart_user");
    const storedCart = localStorage.getItem("shawarmastart_cart");
    const storedOrder = localStorage.getItem("shawarmastart_order");

    if (storedUser) setUserState(JSON.parse(storedUser));
    if (storedCart) setCartState(JSON.parse(storedCart));
    if (storedOrder) setCurrentOrderState(JSON.parse(storedOrder));
  }, []);

  const setUser = (newUser: UserDetails) => {
    setUserState(newUser);
    localStorage.setItem("shawarmastart_user", JSON.stringify(newUser));
  };

  const setCart = (newCart: CartItem[]) => {
    setCartState(newCart);
    localStorage.setItem("shawarmastart_cart", JSON.stringify(newCart));
  };

  const setOrder = (newOrder: Order) => {
    setCurrentOrderState(newOrder);
    localStorage.setItem("shawarmastart_order", JSON.stringify(newOrder));
  };

  const addToCart = (item: CartItem) => {
    const existingItem = cart.find((i) => i.id === item.id);
    if (existingItem) {
      setCart(
        cart.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
        )
      );
    } else {
      setCart([...cart, item]);
    }
  };

  const removeFromCart = (id: number) => {
    setCart(cart.filter((i) => i.id !== id));
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCart(
      cart.map((i) => (i.id === id ? { ...i, quantity } : i))
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  if (!isMounted) {
    return null;
  }

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        currentOrder,
        setOrder,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
}
