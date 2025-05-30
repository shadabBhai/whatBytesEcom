"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image"; // Using Next.js Image component
import { Star } from "lucide-react";
import { Product } from "@/mockupData/productData";
import { useCart } from "@/context/CartContext";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col group">
      <Link href={`/product/${product.id}`} className="block">
        <div className="relative w-full h-48 bg-gray-200 overflow-hidden">
          <Image
            src={product.imageUrl}
            alt={product.name}
            width={300}
            height={200}
            className="w-full h-full object-cover p-2 group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      </Link>
      <div className="p-4 flex flex-col flex-grow">
        <Link href={`/product/${product.id}`} className="block">
          <h3
            className="text-md font-semibold text-slate-800 mb-1 truncate group-hover:text-sky-600 transition-colors"
            title={product.name}
          >
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center my-2">
          {Array(5)
            .fill(0)
            .map((_, i) => (
              <Star
                key={i}
                size={16}
                className={` ${
                  i < product.rating
                    ? "text-yellow-400 fill-yellow-400"
                    : "text-slate-300 fill-slate-300"
                }`}
              />
            ))}
        </div>
        <p className="text-lg font-bold text-slate-800 mb-3">
          ${product.price.toFixed(2)}
        </p>
        <button
          onClick={() => addToCart(product)}
          className="w-full bg-sky-600 text-white py-2 px-4 rounded-md hover:bg-sky-700 transition-colors duration-300 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 mt-auto"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};
export default ProductCard;
