'use client';

import { useContext } from "react";
import ProductsList from "./products";
import YourCart from "./YourCart";
import { CartContext } from "./context";
import Image from "next/image";

export default function Home() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }

  const { modal, showModal, cart ,setCart , orderSubtotal , currentBalance } = context;

  return (
    <div className="md:flex gap-10 ">
      <ProductsList />
      <YourCart />

      {modal && (
        <div className="modal-overlay ">
          <div className="bg-white p-6 rounded shadow-md text-center md:w-[35%] ">
              <Image
                src="/assets/images/icon-order-confirmed.svg"
                alt="icon-order-confirmed"
                width={30}
                height={30}
                className=""
              />
              {currentBalance-orderSubtotal<=0?            
                <h1 className="text-3xl font-semibold text-start mt-4">Error</h1>
:              <h1 className="text-3xl font-semibold text-start mt-4">Order Confirmed </h1>
}
            

            <p className="mb-4 text-xs text-Rose-500 text-start">We hope you enjoy your food!</p>

            <div className="bg-Rose-50 rounded p-5">
              {cart.map((product, index) => (
                <div key={index} className="flex justify-between items-start mt-4 pb-4 border-b-[0.08px] border-b-light-grayish-blue ">
                  <div className="flex gap-3">
                    <Image
                      src={product.image.thumbnail}
                      alt={product.name}
                      width={60}
                      height={30}
                      className="border rounded"
                    />

                    <div className="flex flex-col gap-4 text-left">
                      <h2 className="text-sm font-medium">{product.name}</h2>
                      <div className="flex gap-2">
                         <p className="font-semibold text-sm text-Red">{product.amount}x</p>
                      <p className="text-Rose-400 text-sm">
                        <span className="text-xs">@</span> ${product.price.toFixed(2)}
                      </p>
                      </div>
                    </div>
                  </div>

                  <p className="text-Rose-500 font-medium">
                    ${(product.amount * product.price).toFixed(2)}
                  </p>
                </div>
              ))}
      <div className='flex justify-between items-center mt-4'>
      <p className='text-Rose-900 text-sm'>Order Total</p>
      <h1 className='font-bold text-lg '>${orderSubtotal}</h1>
    </div>
     <div className='flex justify-between items-center mt-4'>
      <p className='text-Rose-900 text-sm'>shipping fees </p>
      <h1 className='font-bold text-lg '>$50</h1>
    </div>
      <div className='flex justify-between items-center mt-4'>
      <p className='text-Rose-900 text-sm'>paid amount</p>
      <h1 className='font-bold text-2xl '>${orderSubtotal+50} </h1>
    </div>
   {currentBalance-orderSubtotal<=0?<div className="text-center text-Red mt-4">Your  current balance is not enough: {currentBalance}</div>: 
   <div className='flex justify-between items-center mt-4'>
      <p className='text-Rose-900 text-sm'> Your  current balance after payment </p>
      <h1 className='font-bold text-2xl '>${currentBalance} </h1>

    </div>}
            </div>

   

            <div
              className="rounded-full bg-Red text-white text-sm py-2.5 mt-4 cursor-pointer"
              onClick={() => {
                setCart([])
                showModal(false)}}
            >
              Start New Order
            </div>
          </div>
        </div>
      )}
    </div>
  );
}