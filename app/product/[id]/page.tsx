"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation"; // For App Router
import { Product, mockProducts } from "@/mockupData/productData";
import Image from "next/image";
import { Star, ShoppingCart as CartIcon } from "lucide-react";
import { useCart } from "@/context/CartContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const ProductDetailPage = () => {
  const params = useParams();
  const { id } = params;
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  useEffect(() => {
    if (id) {
      const foundProduct = mockProducts.find((p) => p.id === id);
      setProduct(foundProduct || null);
    }
  }, [id]);

  if (!product) {
    return (
      <>
        <Header onSearch={(term) => console.log("Search from PDP:", term)} />
        <main className="container mx-auto px-4 py-8 text-center">
          <p className="text-xl text-slate-600">
            Loading product or product not found...
          </p>
        </main>
        <Footer />
      </>
    );
  }

  const handleQuantityChange = (change: number) => {
    setQuantity((prev) => Math.max(1, prev + change));
  };

  return (
    <>
      <Header onSearch={(term) => console.log("Search from PDP:", term)} />
      <main className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 bg-white p-6 rounded-lg shadow-lg">
          <div className="relative w-full h-80 md:h-96 rounded-lg overflow-hidden bg-slate-100">
            <Image
              src={product.imageUrl}
              alt={product.name}
              layout="fill"
              objectFit="contain"
              className="p-4"
            />
          </div>

          <div className="flex flex-col justify-center">
            <h1 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-3">
              {product.name}
            </h1>
            <p className="text-sm text-slate-500 mb-3">
              Category: {product.category} | Brand: {product.brand}
            </p>

            <div className="flex items-center mb-4">
              {Array(5)
                .fill(0)
                .map((_, i) => (
                  <Star
                    key={i}
                    size={20}
                    className={` ${
                      i < product.rating
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-slate-300 fill-slate-300"
                    }`}
                  />
                ))}
              <span className="ml-2 text-sm text-slate-600">
                ({product.rating}.0 stars)
              </span>
            </div>

            <p className="text-3xl font-semibold text-sky-600 mb-6">
              ${product.price.toFixed(2)}
            </p>

            <p className="text-slate-700 mb-6 leading-relaxed">
              {product.description}
            </p>

            <div className="flex items-center space-x-4 mb-6">
              <label htmlFor="quantity" className="font-medium text-slate-700">
                Quantity:
              </label>
              <div className="flex items-center border border-slate-300 rounded-md">
                <button
                  onClick={() => handleQuantityChange(-1)}
                  className="px-3 py-1 text-lg text-slate-600 hover:bg-slate-100 rounded-l-md"
                >
                  -
                </button>
                <input
                  type="number"
                  id="quantity"
                  value={quantity}
                  readOnly
                  className="w-12 text-center text-black border-none focus:ring-0"
                />
                <button
                  onClick={() => handleQuantityChange(1)}
                  className="px-3 py-1 text-lg text-slate-600 hover:bg-slate-100 rounded-r-md"
                >
                  +
                </button>
              </div>
            </div>

            <button
              onClick={() => addToCart({ ...product, quantity })}
              className="w-full md:w-auto bg-sky-600 text-white py-3 px-8 rounded-md hover:bg-sky-700 transition-colors duration-300 text-lg font-medium flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
            >
              <CartIcon size={22} className="mr-2" /> Add to Cart
            </button>
          </div>
        </div>
      </main>
    </>
  );
};

export default ProductDetailPage;
