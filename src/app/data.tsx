
type ImageSet = {
  thumbnail: string;
 
  desktop: string;
};

export type Product = {
  image: ImageSet;
  name: string;
  category: string;
  price: number;
  amount: number;
  expirationDate: string | null; 
  shipping: boolean;
  weight: number | null;  
};

export type ProductType = Product[];

export const Products = [
   {
    image: {
      thumbnail: "/assets/images/image-waffle-thumbnail.jpg",
      desktop: "/assets/images/image-waffle-desktop.jpg"
    },
    name: "Waffle with Berries",
    category: "Waffle",
    price: 6.50,
    amount: 0,
    expirationDate: "08/21/2025", 
    shipping: true,
    weight: 0.5
  },
  {
    image: {
      thumbnail: "/assets/images/image-creme-brulee-thumbnail.jpg",
      desktop: "/assets/images/image-creme-brulee-desktop.jpg"
    },
    name: "Vanilla Bean Crème Brûlée",
    category: "Crème Brûlée",
    price: 7.00,
    amount: 10,
    expirationDate: "06/21/2025",
    shipping: true,
    weight: 0.4
  },
  {
    image: {
      thumbnail: "/assets/images/image-macaron-thumbnail.jpg",
      desktop: "/assets/images/image-macaron-desktop.jpg"
    },
    name: "Macaron Mix of Five",
    category: "Macaron",
    price: 8.00,
    amount: 80,
    expirationDate: "06/21/2026",
    shipping: true,
    weight: 0.3
  },
  {
    image: {
      thumbnail: "/assets/images/image-mobile-thumbnail.jpg",
      desktop: "/assets/images/image-mobile-desktop.jpg"
    },
    name: "Mobile Scratch Card",
    category: "Electronics",
    price: 10.00,
    amount: 40,
    expirationDate: null,
    shipping: false,
    weight: null
  },
  {
    image: {
      thumbnail: "/assets/images/image-tv-thumbnail.jpg",
      desktop: "/assets/images/image-tv-desktop.jpg"
    },
    name: "Smart TV",
    category: "Electronics",
    price: 250.00,
    amount: 40,
    expirationDate: null,
    shipping: true,
    weight: 15
  }
];