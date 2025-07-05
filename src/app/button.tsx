"use client";

import React, { useContext, useState } from 'react';
import { Products } from "./data";
import Image from "next/image";
import { CartContext } from './context';
 
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
  expirationDate: string | null; 
  shipping: boolean;
  weight: number | null;  
};
const Button = ({ product }: { product: Product }) => {
     const context = useContext(CartContext);
     if (!context) {
        throw new Error('useCart must be used within a CartProvider');
      }
        const { cart  } = context;
  return (
    <div>
 {/* Covering all corner cases      */}
 {cart.some((item) => item.name === product.name) ?
  
        <InCartButton product={product} />    
:  
        <div>
      {product.amount==0 ?
         <OutOfStockButton/>
           :
              <div>
                {product.expirationDate && new Date(product.expirationDate) < new Date()?
               <ExpiredButton/>
                : <AddToCartButton  product={product} /> }
              </div>
                          }
        </div>        }
    </div>
  );
}

export default Button;




const OutOfStockButton = () => {
  return  <div
           className='
                          bg-gray-500
                          border rounded-2xl 
                          py-1.5 w-30 
                          text-gray-400 text-xs
                          flex justify-center items-center gap-2 
                          relative bottom-4 left-7
                          '
          >Out Of Stock</div>
        }

        const ExpiredButton=()=>{
return  <div 
                 className='
                          bg-gray-500
                          border rounded-2xl 
                          py-1.5 w-30 
                          text-gray-400 text-xs
                          flex justify-center items-center gap-2 
                          relative bottom-4 left-7
                          '
                >exceed expiry date</div>
        }

const InCartButton=({ product }: { product: Product })=>{
    const context = useContext(CartContext);
     if (!context) {
        throw new Error('useCart must be used within a CartProvider');
      }
          const { cart ,decreaseAmount , increaseAmount } = context;

          return    <div
                          className='
                          cursor-pointer
                          border rounded-2xl  border-Red 
                          py-1.5 px-1 w-30 bg-Red 
                          text-white text-xs
                          flex justify-between
                          relative bottom-4 left-7
                          '
                          
                          > 
                           
                <div className='icon-hover-red border-1 border-white rounded-full flex justify-center items-center w-4 h-4  hover:bg-white '
                                  onClick={()=>decreaseAmount(product)}

                >


                  <div>
                      <Image
                  src="/assets/images/icon-decrement-quantity.svg"
                   alt={product.name}
                   width={11}
                  height={10}
                   className=" border rounded " /> 
                  </div>
                 
               </div>
                 <p>{cart.find((item) => item.name === product.name)?.amount}   </p>
                  <div className='icon-hover-red border-1 border-white rounded-full flex justify-center items-center w-4 h-4  hover:bg-white '
                  onClick={()=>increaseAmount(product)}
                  >

       <div>
                    <Image
                       src="/assets/images/icon-increment-quantity.svg"
                         alt={product.name}
                       width={10}
                      height={10}
                        className= "border rounded "
                         /> 
            </div>


                           
                          </div>
                          
  </div>  
        }
const AddToCartButton =({ product }: { product: Product })=>{
     const context = useContext(CartContext);
     if (!context) {
        throw new Error('useCart must be used within a CartProvider');
      }
        const { addToCart} = context;
  return <div
                          className='
                          cursor-pointer
                          border rounded-2xl  border-Red 
                          py-1.5 w-30 bg-white 
                          text-Red text-xs
                          flex justify-center items-center gap-2 
                          relative bottom-4 left-7
                          '
                           onClick={() => addToCart(product)}
                          > 
                  <Image
                  src="/assets/images/icon-add-to-cart.svg"
                   alt={product.name}
                   width={20}
                  height={20}
                  className="border rounded  "

                         /> 
                          Add To Cart
                </div>
}