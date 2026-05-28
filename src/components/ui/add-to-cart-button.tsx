"use client";

import { useAppContext } from "@/context/AppContext";
import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";

type AddToCartButtonProps = {
  item: {
    id: number;
    name: string;
    price: number;
    image?: string;
    description?: string;
  };
};

export function AddToCartButton({ item }: AddToCartButtonProps) {
  const { addToCart } = useAppContext();
  const handleAdd = () => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: 1,
      image: item.image,
      description: item.description,
    });
  };

  return (
    <Button
      className="w-full font-bold h-12 rounded-xl shadow-sm bg-primary hover:bg-primary/90 text-white transition-all active:scale-95"
      onClick={handleAdd}
    >
      <ShoppingBag className="w-4 h-4 mr-2" />
      Add to Cart
    </Button>
  );
}
