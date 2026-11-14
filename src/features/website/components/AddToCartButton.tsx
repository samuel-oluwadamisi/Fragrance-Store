"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import type { Perfume } from "./PerfumeCard";
import { CheckIcon, ShoppingBagIcon } from "../../../data/icons";

type AddToCartButtonProps = {
  perfume: Perfume;
  label?: string;
  className?: string;
  iconClassName?: string;
};

export default function AddToCartButton({
  perfume,
  label = "Add to Cart",
  className = "",
  iconClassName = "h-4 w-4",
}: AddToCartButtonProps) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  function handleClick() {
    addToCart({ name: perfume.name, brand: perfume.brand, price: perfume.price, src: perfume.src });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  return (
    <button type="button" onClick={handleClick} className={className}>
      {added ? (
        <CheckIcon className={iconClassName} />
      ) : (
        <ShoppingBagIcon className={iconClassName} />
      )}
      {added ? "Added" : label}
    </button>
  );
}