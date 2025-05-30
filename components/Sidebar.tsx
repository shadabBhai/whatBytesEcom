// "use client";

// import React from "react";
// import { FilterX } from "lucide-react";
// import { categories, brands } from "@/mockupData/productData";

// export interface FiltersState {
//   categories: string[];
//   priceRange: number;
//   brands: string[];
// }

// interface SidebarProps {
//   filters: FiltersState;
//   onFilterChange: (
//     filterType: keyof Pick<FiltersState, "categories" | "brands">,
//     value: string,
//     isChecked: boolean
//   ) => void;
//   onPriceChange: (price: number) => void;
//   onBrandChange: (brand: string, isChecked: boolean) => void;
//   onClearFilters: () => void;
// }

// const Sidebar: React.FC<SidebarProps> = ({
//   filters,
//   onFilterChange,
//   onPriceChange,
//   onBrandChange,
//   onClearFilters,
// }) => {
//   const handlePriceSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     onPriceChange(parseInt(e.target.value, 10));
//   };

//   return (
//     <aside className="w-full lg:w-1/4 xl:w-1/5 p-5 bg-white rounded-lg shadow-lg h-fit lg:sticky top-24">
//       <div className="flex justify-between items-center mb-5">
//         <h2 className="text-xl font-semibold text-slate-800">Filters</h2>
//         <button
//           onClick={onClearFilters}
//           className="text-xs text-sky-600 hover:text-sky-800 flex items-center"
//           title="Clear all filters"
//         >
//           <FilterX size={14} className="mr-1" /> Clear All
//         </button>
//       </div>

//       <div className="mb-6">
//         <h3 className="text-md font-semibold text-slate-700 mb-2">Category</h3>
//         <div className="space-y-2">
//           {categories.map((category) => (
//             <label
//               key={category}
//               className="flex items-center space-x-2 cursor-pointer text-slate-600 hover:text-sky-600 text-sm"
//             >
//               <input
//                 type="checkbox"
//                 value={category}
//                 checked={
//                   category === "All"
//                     ? filters.categories.length === 0
//                     : filters.categories.includes(category)
//                 }
//                 onChange={(e) =>
//                   onFilterChange("categories", category, e.target.checked)
//                 }
//                 className="form-checkbox h-4 w-4 text-sky-600 border-slate-300 rounded focus:ring-sky-500"
//               />
//               <span>{category}</span>
//             </label>
//           ))}
//         </div>
//       </div>

//       <hr className="my-5 border-slate-200" />

//       <div className="mb-6">
//         <h3 className="text-md font-semibold text-slate-700 mb-2">Price</h3>
//         <div>
//           <input
//             type="range"
//             min="0"
//             max="1000"
//             value={filters.priceRange}
//             onChange={handlePriceSliderChange}
//             className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-sky-600"
//           />
//           <div className="flex justify-between text-xs text-slate-500 mt-1">
//             <span>$0</span>
//             <span>${filters.priceRange}</span>
//             <span>$1000</span>
//           </div>
//         </div>
//       </div>

//       <hr className="my-5 border-slate-200" />

//       <div>
//         <h3 className="text-md font-semibold text-slate-700 mb-2">Brands</h3>
//         <div className="space-y-2">
//           {brands.map((brand) => (
//             <label
//               key={brand}
//               className="flex items-center space-x-2 cursor-pointer text-slate-600 hover:text-sky-600 text-sm"
//             >
//               <input
//                 type="checkbox"
//                 value={brand}
//                 checked={
//                   brand === "All"
//                     ? filters.brands.length === 0
//                     : filters.brands.includes(brand)
//                 }
//                 onChange={(e) => onBrandChange(brand, e.target.checked)}
//                 className="form-checkbox h-4 w-4 text-sky-600 border-slate-300 rounded focus:ring-sky-500"
//               />
//               <span>{brand}</span>
//             </label>
//           ))}
//         </div>
//       </div>
//     </aside>
//   );
// };
// export default Sidebar;

"use client";

import React from "react";
import { FilterX, X } from "lucide-react"; // Added X for the close button
import { categories, brands } from "@/mockupData/productData"; // Assuming this path is correct

export interface FiltersState {
  categories: string[];
  priceRange: number;
  brands: string[];
}

interface SidebarProps {
  filters: FiltersState;
  onFilterChange: (
    filterType: keyof Pick<FiltersState, "categories" | "brands">,
    value: string,
    isChecked: boolean
  ) => void;
  onPriceChange: (price: number) => void;
  onBrandChange: (brand: string, isChecked: boolean) => void;
  onClearFilters: () => void;
  isMobileFiltersOpen?: boolean; // New: To control visibility on mobile
  onCloseMobileFilters?: () => void; // New: To close the sidebar from within
}

const Sidebar: React.FC<SidebarProps> = ({
  filters,
  onFilterChange,
  onPriceChange,
  onBrandChange,
  onClearFilters,
  isMobileFiltersOpen, // Prop to control mobile visibility
  onCloseMobileFilters, // Prop to handle closing on mobile
}) => {
  const handlePriceSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onPriceChange(parseInt(e.target.value, 10));
  };

  // Base classes for the sidebar, including transition for smooth animation
  const baseClasses =
    "bg-white p-5 shadow-lg transition-transform duration-300 ease-in-out h-full overflow-y-auto";

  // Classes for mobile/tablet view (off-canvas, fixed, sliding)
  // It's positioned off-screen by default and slides in when isMobileFiltersOpen is true
  const mobileClasses = `fixed inset-y-0 left-0 z-40 w-full max-w-xs sm:max-w-sm transform ${
    isMobileFiltersOpen ? "translate-x-0" : "-translate-x-full"
  }`;

  // Classes for desktop view (sticky, original layout)
  // lg:translate-x-0 ensures any mobile transform is reset on larger screens
  const desktopClasses =
    "lg:sticky lg:top-24 lg:w-1/4 xl:w-1/5 lg:rounded-lg lg:h-fit lg:translate-x-0 lg:shadow-lg";

  return (
    <>
      {/* Overlay for mobile view: shown when sidebar is open, closes sidebar on click */}
      {isMobileFiltersOpen && onCloseMobileFilters && (
        <div
          className="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={onCloseMobileFilters}
          aria-hidden="true"
        />
      )}

      {/* The main aside element with combined classes */}
      <aside className={`${baseClasses} ${mobileClasses} ${desktopClasses}`}>
        {/* Header section of the sidebar */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-slate-800">Filters</h2>
          <div className="flex items-center space-x-3">
            <button
              onClick={onClearFilters}
              className="text-xs text-sky-600 hover:text-sky-700 flex items-center"
              title="Clear all filters"
            >
              <FilterX size={14} className="mr-1" /> Clear All
            </button>
            {/* Close button for mobile view, hidden on larger screens */}
            {onCloseMobileFilters && (
              <button
                onClick={onCloseMobileFilters}
                className="text-slate-500 hover:text-slate-700 lg:hidden"
                title="Close filters"
              >
                <X size={22} />
              </button>
            )}
          </div>
        </div>

        {/* Category Filter Section */}
        <div className="mb-6">
          <h3 className="text-md font-semibold text-slate-700 mb-3">
            Category
          </h3>
          <div className="space-y-2.5">
            {categories.map((category) => (
              <label
                key={category}
                className="flex items-center space-x-2.5 cursor-pointer text-slate-600 hover:text-sky-600 text-sm group"
              >
                <input
                  type="checkbox"
                  value={category}
                  checked={
                    category === "All"
                      ? filters.categories.length === 0 ||
                        filters.categories.includes("All")
                      : filters.categories.includes(category)
                  }
                  onChange={(e) =>
                    onFilterChange("categories", category, e.target.checked)
                  }
                  className="form-checkbox h-4 w-4 text-sky-600 border-slate-300 rounded focus:ring-2 focus:ring-sky-500 focus:ring-offset-1"
                />
                <span className="group-hover:text-sky-600">{category}</span>
              </label>
            ))}
          </div>
        </div>

        <hr className="my-6 border-slate-200" />

        {/* Price Filter Section */}
        <div className="mb-6">
          <h3 className="text-md font-semibold text-slate-700 mb-3">Price</h3>
          <div>
            <input
              type="range"
              min="0"
              max="1000" // Consider making this dynamic or a prop
              value={filters.priceRange}
              onChange={handlePriceSliderChange}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
            />
            <div className="flex justify-between text-xs text-slate-500 mt-2">
              <span>$0</span>
              <span className="font-medium text-sky-700">
                ${filters.priceRange}
              </span>
              <span>$1000</span>
            </div>
          </div>
        </div>

        <hr className="my-6 border-slate-200" />

        {/* Brands Filter Section */}
        <div>
          <h3 className="text-md font-semibold text-slate-700 mb-3">Brands</h3>
          <div className="space-y-2.5">
            {brands.map((brand) => (
              <label
                key={brand}
                className="flex items-center space-x-2.5 cursor-pointer text-slate-600 hover:text-sky-600 text-sm group"
              >
                <input
                  type="checkbox"
                  value={brand}
                  checked={
                    brand === "All"
                      ? filters.brands.length === 0 ||
                        filters.brands.includes("All")
                      : filters.brands.includes(brand)
                  }
                  onChange={(e) => onBrandChange(brand, e.target.checked)}
                  className="form-checkbox h-4 w-4 text-sky-600 border-slate-300 rounded focus:ring-2 focus:ring-sky-500 focus:ring-offset-1"
                />
                <span className="group-hover:text-sky-600">{brand}</span>
              </label>
            ))}
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
