import React from "react";
import { Product } from "@/mockupData/productData";
import ProductCard from "./ProductCard";

interface ProductGridProps {
  products: Product[];
}

const ProductGrid: React.FC<ProductGridProps> = ({ products }) => {
  if (!products || products.length === 0) {
    return (
      <div className="text-center text-slate-500 py-12 bg-white rounded-lg shadow-md col-span-full">
        <h2 className="text-2xl font-semibold mb-2">No Products Found</h2>
        <p>Try adjusting your filters or search term.</p>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
export default ProductGrid;
