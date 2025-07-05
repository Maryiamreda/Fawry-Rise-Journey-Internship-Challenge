"use client";

import React, { createContext, useState, ReactNode, useContext, useEffect } from "react";
import { Products } from "./data";
type ImageSet = {
  thumbnail: string;
 
  desktop: string;
};

//every shippable item should provide its weight. 
export type Product = {
  image: ImageSet;
  name: string;
  category: string;
  price: number;
  amount: number;
  expirationDate: string | null; 
  shipping: boolean;
  weight: number | null;  
};


type CartContextType = {
  currentBalance:number;
  orderSubtotal:number;
  cart: Product[];
  modal:boolean;
  showModal: React.Dispatch<React.SetStateAction<boolean>>;

  setCart: React.Dispatch<React.SetStateAction<Product[]>>;
  addToCart: (product: Product) => void;
  increaseAmount:(product: Product) => void;
  decreaseAmount:(product: Product) => void;
removeFromCart:(product: Product) => void;
checkout: () => void;


};

export const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartProviderProps {
  children: ReactNode;
}


// Interface for ShippingService 
interface ShippingItem {
  getName(): string;
  getWeight(): number;
}
export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cart, setCart] = useState<Product[]>([]);
    const [modal, showModal] = useState(false);
const[currentBalance,setCurrentBalance]=useState(200)
const[orderSubtotal,setOrderSubtotal]=useState(0)


  const addToCart = (product: Product) => {

  if (!cart.some((item) => item.name === product.name)) {
    setCart((prev) => [...prev, { ...product, amount: 1 } ]);
  }
  };


const removeFromCart = (product: Product) => {
const newcart=cart.filter((item)=>item.name!=product.name);
setCart(newcart);
  };

//Customers are able to do checkout with items in the cart. 
const checkout = () => {
showModal(true);
const shippingItems: ShippingItem[] = cart
    .filter(Product => Product.shipping && Product.weight !== null)
    .map(Product => ({
      getName: () => Product.name,
      getWeight: () => Product.weight || 0
    }));
     if (shippingItems.length > 0) {
    ShippingService.processOurShippings(shippingItems);
  }
const paidAmount  = orderSubtotal + 50;
  if (currentBalance >= paidAmount) {
    setCurrentBalance(currentBalance - paidAmount);
  } 

};


//Customers should be able to add a product to cart with 
//specific quantity not more than the available product quantity. 
//and able to increase it also
const increaseAmount = (product: Product) => {
    const updatedCart = cart.map(item => {
      if (item.name === product.name) {
if (item.amount >= product.amount) {
        return item; 
      }        return { ...item, amount: item.amount + 1 };
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
    } 

    else  {
      removeFromCart(product);
    }
  }
};


useEffect(()=>{setOrderSubtotal(cart.reduce((accumulator, item) => accumulator + item.price * item.amount, 0))},[cart])





//Shipping Service which accepts items that need to be shipped 
class ShippingService {
  static processOurShippings(products: ShippingItem[]) {
    console.log('items need shipping', products.map(product => ({
      name: product.getName(),
      weight: product.getWeight()
    })));
  }
}
  return (
    <CartContext.Provider value={{ cart, setCart, addToCart  , decreaseAmount , increaseAmount , removeFromCart , modal , showModal , currentBalance , orderSubtotal , checkout }}>
      {children}
    </CartContext.Provider>
  );
};