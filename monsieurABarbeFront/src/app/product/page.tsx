"use client";

import PageProduit from "./pageProduct";
import { useState } from "react";

interface ProductType {
  name: string;
  description: string;
  price: string;
  stock: string;
  imageUrl: string;
  image2: string;
  image3: string;
}

export default function Page() {
  const [products] = useState<ProductType[]>([
    {
      name: "Crème Hydratante Pour Barbe Burberry",
      description:
        "Cette crème vous fera sentir comme un pélican. Un magnifique étalon dont les cheveux seront aussi doux que la crinière d'un cheval sauvage.<br />Je pense que cette crème est faite pour vous si vous pensez en avoir besoin...",
      price: "9,90€",
      stock: "20",
      imageUrl: "/Gel-douche-burberry-1.jpeg",
      image2: "/Gel-douche-burberry-2.jpg",
      image3: "/Gel-douche-burberry-2.jpg",
    },
  ]);

  return (
    <div>
      {products.map((product, index) => (
        <PageProduit key={index} product={product} />
      ))}
    </div>
  );
}
