"use client";

import React, { useContext } from 'react';
import { Products } from "./data";
import Image from "next/image";
import { CartContext } from './context';

const ProductsList = () => {
  const context = useContext(CartContext);
 if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
    const { addToCart ,cart ,decreaseAmount , increaseAmount } = context;

  return (
     <div className="">
        <h1 className='font-bold text-3xl text-start mb-5 '>  Desserts</h1>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 '>
           {Products.map((product, index) => (
           <div key={index} className="">
            <div className=''>
               <Image
                  src={product.image.desktop} 
                   alt={product.name}
                   width={180}
                  height={180}
               className="border rounded  "
                         /> 

{cart.some((item) => item.name === product.name) ?
  
               <div
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
:  
                         <div
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
                          </div>  }

                     
            </div>
            <div className='text-start '>
                    <h3 className='text-xs font-extralight '>{product.category}</h3>
                    <h2 className='text-sm font-semibold '>{product.name}</h2>
                    <p className='font-semibold text-sm text-Red'>${product.price.toFixed(2)}</p>
            </div>
           
           </div>
         ))}
        </div>
        
       </div>
  );
}

export default ProductsList;