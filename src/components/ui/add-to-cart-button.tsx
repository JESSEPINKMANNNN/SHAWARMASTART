"use client";

import { useAppContext } from "@/context/AppContext";
import { Button } from "@/components/ui/button";
import { Minus, Plus, ShoppingBag } from "lucide-react";

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
  const { cart, addToCart, updateQuantity } = useAppContext();
  const cartItem = cart.find((i) => i.id === item.id);

  if (!cartItem) {
    return (
      <Button 
        className="w-full font-bold h-12 rounded-xl shadow-sm bg-primary hover:bg-primary/90 text-white transition-all active:scale-95"
        onClick={() => addToCart({ id: item.id, name: item.name, price: item.price, quantity: 1, image: item.image, description: item.description })}
      >
        <ShoppingBag className="w-4 h-4 mr-2" />
        Add to Cart
      </Button>
    );
  }

  return (
    <div className="flex items-center justify-between w-full h-12 bg-primary/10 border border-primary/30 rounded-xl px-1 shadow-sm">
      <button 
        onClick={() => updateQuantity(item.id, cartItem.quantity - 1)}
        className="w-10 h-10 flex items-center justify-center text-primary bg-background hover:bg-primary hover:text-white rounded-lg transition-colors shadow-sm"
      >
        <Minus className="w-5 h-5" />
      </button>
      <span className="font-black text-lg text-foreground px-4">{cartItem.quantity}</span>
      <button 
        onClick={() => updateQuantity(item.id, cartItem.quantity + 1)}
        className="w-10 h-10 flex items-center justify-center text-primary bg-background hover:bg-primary hover:text-white rounded-lg transition-colors shadow-sm"
      >
        <Plus className="w-5 h-5" />
      </button>
    </div>
  );
}
