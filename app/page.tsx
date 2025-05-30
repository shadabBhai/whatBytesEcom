"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Header from "@/components/Header";
import Sidebar, { FiltersState } from "@/components/Sidebar";
import ProductGrid from "@/components/ProductGrid";
import { mockProducts, Product } from "@/mockupData/productData";
import { ListFilterPlus } from "lucide-react";

const buildQueryString = (
  params: Record<string, string | string[] | number | undefined>
): string => {
  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (
      value !== undefined &&
      value !== "" &&
      (!Array.isArray(value) || value.length > 0)
    ) {
      if (Array.isArray(value)) {
        value.forEach((v) => query.append(key, v));
      } else {
        query.append(key, String(value));
      }
    }
  });
  return query.toString();
};

function HomePageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [allProducts] = useState<Product[]>(mockProducts);
  const [filteredProducts, setFilteredProducts] =
    useState<Product[]>(mockProducts);

  const [searchTerm, setSearchTerm] = useState<string>(
    () => searchParams.get("search") || ""
  );
  const [filters, setFilters] = useState<FiltersState>(() => {
    const initialCategories = searchParams.getAll("category");
    const initialBrands = searchParams.getAll("brand");
    const initialPrice = searchParams.get("priceMax");
    return {
      categories: initialCategories.length > 0 ? initialCategories : [],
      priceRange: initialPrice ? parseInt(initialPrice, 10) : 1000,
      brands: initialBrands.length > 0 ? initialBrands : [],
    };
  });
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] =
    useState<boolean>(false);

  useEffect(() => {
    const queryParams = {
      search: searchTerm || undefined,
      category: filters.categories.length > 0 ? filters.categories : undefined,
      brand: filters.brands.length > 0 ? filters.brands : undefined,
      priceMax: filters.priceRange < 1000 ? filters.priceRange : undefined,
    };
    const queryString = buildQueryString(queryParams);

    if (queryString !== searchParams.toString()) {
      router.push(`/?${queryString}`, { scroll: false });
    }
  }, [searchTerm, filters, router, searchParams]);

  useEffect(() => {
    let currentProducts = [...allProducts];

    if (searchTerm) {
      currentProducts = currentProducts.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (product.description &&
            product.description
              .toLowerCase()
              .includes(searchTerm.toLowerCase())) ||
          product.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filters.categories.length > 0) {
      currentProducts = currentProducts.filter((product) =>
        filters.categories.includes(product.category)
      );
    }

    if (filters.brands.length > 0) {
      currentProducts = currentProducts.filter((product) =>
        filters.brands.includes(product.brand)
      );
    }

    currentProducts = currentProducts.filter(
      (product) => product.price <= filters.priceRange
    );

    setFilteredProducts(currentProducts);
  }, [searchTerm, filters, allProducts]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const handleFilterChange = (
    filterType: keyof Pick<FiltersState, "categories" | "brands">,
    value: string,
    isChecked: boolean
  ) => {
    setFilters((prevFilters) => {
      let newValues;
      if (value === "All") {
        newValues = [];
      } else {
        const currentSpecificValues = prevFilters[filterType].filter(
          (v) => v !== "All"
        );
        newValues = isChecked
          ? [...currentSpecificValues, value]
          : currentSpecificValues.filter((v) => v !== value);
      }
      return { ...prevFilters, [filterType]: newValues };
    });
  };

  const handleBrandChange = (brand: string, isChecked: boolean) => {
    handleFilterChange("brands", brand, isChecked);
  };

  const handlePriceChange = (price: number) => {
    setFilters((prevFilters) => ({ ...prevFilters, priceRange: price }));
  };

  const handleClearFilters = () => {
    setFilters({
      categories: [],
      priceRange: 1000,
      brands: [],
    });
    setSearchTerm("");
  };

  return (
    <>
      <Header onSearch={handleSearch} />
      <main className="flex-grow container mx-auto px-4 py-8">
        <ListFilterPlus
          onClick={() =>
            setIsMobileFiltersOpen(
              (isMobileFiltersOpen) => !isMobileFiltersOpen
            )
          }
          className="flex items-end lg:hidden text-start text-2xl font-semibold "
          size={28}
        />
        <div className="text-xl lg:text-2xl font-semibold text-slate-800 my-6">
          Products List
        </div>
        <div className="flex flex-col lg:flex-row gap-8">
          <Sidebar
            filters={filters}
            onFilterChange={handleFilterChange}
            onPriceChange={handlePriceChange}
            onBrandChange={handleBrandChange}
            onClearFilters={handleClearFilters}
            isMobileFiltersOpen={isMobileFiltersOpen}
            onCloseMobileFilters={() => setIsMobileFiltersOpen(false)}
          />
          <div className="w-full lg:w-3/4 xl:w-4/5">
            <ProductGrid products={filteredProducts} />
          </div>
        </div>
      </main>
    </>
  );
}

export default function HomePage() {
  return (
    <Suspense fallback={<div>Loading filters...</div>}>
      <HomePageContent />
    </Suspense>
  );
}
