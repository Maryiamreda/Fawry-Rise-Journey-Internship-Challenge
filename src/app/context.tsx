"use client";

import React, { createContext, useState, ReactNode, useContext } from "react";
type ImageSet = {
  thumbnail: string;
 
  desktop: string;
};

export type Product = {
  image: ImageSet;
  name: string;
  category: string;
  price: number;
  amount: number;
  quantity: number;       
  expirationDate: string | null; 
  shipping: boolean;
  weight: number | null;  
};


type CartContextType = {
  cart: Product[];
  modal:boolean;
  showModal: React.Dispatch<React.SetStateAction<boolean>>;

  setCart: React.Dispatch<React.SetStateAction<Product[]>>;
  addToCart: (product: Product) => void;
  increaseAmount:(product: Product) => void;
    decreaseAmount:(product: Product) => void;
removeFromCart:(product: Product) => void;


};

export const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cart, setCart] = useState<Product[]>([]);
    const [modal, showModal] = useState(false);


  const addToCart = (product: Product) => {

  if (!cart.some((item) => item.name === product.name)) {
    setCart((prev) => [...prev, { ...product, amount: 1 } ]);
  }
  };


const removeFromCart = (product: Product) => {
const newcart=cart.filter((item)=>item.name!=product.name);
setCart(newcart);
  };

  const increaseAmount = (product: Product) => {
    const updatedCart = cart.map(item => {
      if (item.name === product.name) {
        return { ...item, amount: item.amount + 1 };
      }
      return item;
    });
    setCart(updatedCart);
  };
const decreaseAmount = (product: Product) => {
  const foundItem = cart.find(item => item.name === product.name);

  if (foundItem) {
    if (foundItem.amount > 1) {
      const updatedCart = cart.map(item =>
        item.name === product.name
          ? { ...item, amount: item.amount - 1 }
          : item
      );
      setCart(updatedCart);
    } else {
      removeFromCart(product);
    }
  }
};

  return (
    <CartContext.Provider value={{ cart, setCart, addToCart  , decreaseAmount , increaseAmount , removeFromCart , modal , showModal }}>
      {children}
    </CartContext.Provider>
  );
};