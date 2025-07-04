"use client";

import React, { useContext } from 'react';
import { Products } from "./data";
import Image from "next/image";
import { CartContext } from './context';
import Button from './button';
const ProductsList = () => {
  const context = useContext(CartContext);
 if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }

  return (
     <div className="">
        <h1 className='font-bold text-3xl text-start mb-5 '>Products</h1>
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

     <Button product={product}/>

                     
            </div>
            <div className='text-start '>
                    <h3 className='text-xs font-extralight '>{product.category}</h3>
                    <h2 className='text-sm font-semibold '>{product.name}</h2>
                    <h2 className='text-sm font-light text-red-300 '>in stock: {product.amount}</h2>
                    <p className='font-semibold text-sm text-Red'>${product.price.toFixed(2)}</p>
            </div>
           
           </div>
         ))}
        </div>
        
       </div>
  );
}

export default ProductsList;