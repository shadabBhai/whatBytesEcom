"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { Trash2, PlusCircle, MinusCircle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity, cartTotal, cartCount } =
    useCart();

  if (cartItems.length === 0) {
    return (
      <>
        <Header onSearch={(term) => console.log("Search from Cart:", term)} />
        <main className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-3xl font-semibold text-slate-800 mb-6">
            Your Cart is Empty
          </h1>
          <p className="text-slate-600 mb-8">
            Looks like you haven't added anything to your cart yet.
          </p>
          <Link
            href="/"
            className="bg-sky-600 hover:bg-sky-700 text-white font-medium py-3 px-6 rounded-md transition-colors"
          >
            Continue Shopping
          </Link>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header onSearch={(term) => console.log("Search from Cart:", term)} />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-semibold text-slate-800 mb-8">
          Your Shopping Cart ({cartCount} items)
        </h1>
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="bg-white p-4 rounded-lg shadow-md flex flex-col sm:flex-row items-center gap-4"
              >
                <div className="w-24 h-24 relative rounded-md overflow-hidden bg-slate-100 flex-shrink-0">
                  <Image
                    src={item.imageUrl}
                    alt={item.name}
                    layout="fill"
                    objectFit="contain"
                    className="p-1"
                  />
                </div>
                <div className="flex-grow text-center sm:text-left">
                  <Link
                    href={`/product/${item.id}`}
                    className="text-lg font-medium text-slate-800 hover:text-sky-600"
                  >
                    {item.name}
                  </Link>
                  <p className="text-sm text-slate-500">{item.category}</p>
                  <p className="text-md font-semibold text-sky-600 mt-1 sm:mt-0">
                    ${item.price.toFixed(2)}
                  </p>
                </div>
                <div className="flex items-center space-x-3 my-2 sm:my-0">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                    className="text-slate-500 hover:text-sky-600 disabled:opacity-50"
                  >
                    <MinusCircle size={22} />
                  </button>
                  <span className="w-10 text-center font-medium">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="text-slate-500 hover:text-sky-600"
                  >
                    <PlusCircle size={22} />
                  </button>
                </div>
                <p className="text-lg font-semibold text-slate-800 w-24 text-center sm:text-right">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 hover:text-red-700 transition-colors"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            ))}
          </div>

          <div className="lg:col-span-1 bg-white p-6 rounded-lg shadow-lg h-fit sticky top-24">
            <h2 className="text-2xl font-semibold text-slate-800 mb-6 border-b pb-3">
              Order Summary
            </h2>
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-slate-700">
                <span>Subtotal ({cartCount} items)</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-700">
                <span>Shipping</span>
                <span className="text-green-600">FREE</span>
              </div>
            </div>
            <div className="flex justify-between text-xl font-bold text-slate-800 border-t pt-4">
              <span>Total</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>
            <button className="w-full bg-sky-600 hover:bg-sky-700 text-white font-semibold py-3 px-6 rounded-md mt-8 transition-colors text-lg">
              Proceed to Checkout
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default CartPage;
