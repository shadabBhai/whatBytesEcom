export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  brand: string;
  imageUrl: string;
  rating: number;
  description: string;
}

export const mockProducts: Product[] = [
  {
    id: "1",
    name: "Running Shoes",
    price: 90.0,
    category: "Clothing",
    brand: "Speedster",
    imageUrl: "/images/running-shoes.jpg",
    rating: 4,
    description:
      "Lightweight and comfortable running shoes for peak performance.",
  },
  {
    id: "2",
    name: "Wireless Headphones",
    price: 129.0,
    category: "Electronics",
    brand: "SoundWave",
    imageUrl: "/images/wireless-headphone.jpg",
    rating: 5,
    description: "Immersive sound experience with these wireless headphones.",
  },
  {
    id: "3",
    name: "Backpack",
    price: 75.0,
    category: "Accessories",
    brand: "UrbanCarry",
    imageUrl: "/images/backpack.jpg",
    rating: 4,
    description: "Stylish and durable backpack for everyday use.",
  },
  {
    id: "4",
    name: "Smartwatch",
    price: 249.0,
    category: "Electronics",
    brand: "TechTime",
    imageUrl: "/images/smartwatch.jpg",
    rating: 5,
    description: "Stay connected and track your fitness with this smartwatch.",
  },
  {
    id: "5",
    name: "Sunglasses",
    price: 149.0,
    category: "Accessories",
    brand: "ShadyCo",
    imageUrl: "/images/sunglasses.jpg",
    rating: 4,
    description: "Protect your eyes in style with these designer sunglasses.",
  },
  {
    id: "6",
    name: "Digital Camera",
    price: 499.0,
    category: "Electronics",
    brand: "PixelPerfect",
    imageUrl: "/images/camera.jpg",
    rating: 4,
    description:
      "Capture stunning photos with this high-resolution digital camera.",
  },
  {
    id: "7",
    name: "T-shirt",
    price: 29.0,
    category: "Clothing",
    brand: "ComfyWear",
    imageUrl: "/images/t-shirt.jpg",
    rating: 3,
    description: "A classic cotton T-shirt for everyday comfort.",
  },
  {
    id: "8",
    name: "Smartphone",
    price: 699.0,
    category: "Electronics",
    brand: "ConnectX",
    imageUrl: "/images/mobile.jpg",
    rating: 5,
    description:
      "Latest generation smartphone with advanced features. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
];

export const categories: string[] = [
  "All",
  "Electronics",
  "Clothing",
  "Home",
  "Accessories",
];
export const brands: string[] = [
  "All",
  "Speedster",
  "SoundWave",
  "UrbanCarry",
  "TechTime",
  "ShadyCo",
  "PixelPerfect",
  "ComfyWear",
  "ConnectX",
];
