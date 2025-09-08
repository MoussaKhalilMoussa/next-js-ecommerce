"use client";

import useCartStore from "@/store/cartStore";
import { ProductType } from "@/types";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";

const ProductInterAction = ({
  product,
  selectedColor,
  selectedSize,
}: {
  product: ProductType;
  selectedColor: string;
  selectedSize: string;
}) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [quantity, setQuantity] = useState(1);

  const { addToCart } = useCartStore();
  const handleTypeChange = (type: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(type, value);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const changeQuantity = (type: "increment" | "decrement") => {
    if (type === "increment") {
      setQuantity((prev) => prev + 1);
    } else {
      if (quantity > 1) {
        setQuantity((prev) => prev - 1);
      }
    }
  };

  const handleAddToCart = () => {
    addToCart({
      ...product,
      quantity,
      selectedColor,
      selectedSize,
    });
    toast.success("Product added to cart.");
  };
  return (
    <div className="flex flex-col gap-4 mt-4">
      {/* SIZES */}
      <div className="flex flex-col gap-2 text-xs">
        <span className="text-gray-500"> Size </span>
        <div className="flex items-center gap-2">
          {product.sizes.map((size) => (
            <div
              className={` cursor-pointer border-1 p-[2px] ${
                selectedSize === size
                  ? " border-gray-600 "
                  : " border-gray-300 "
              } `}
              key={size}
              onClick={() => handleTypeChange("size", size)}
            >
              <div
                className={` w-6 h-6 text-center flex items-center justify-center ${
                  selectedSize === size
                    ? "bg-black text-white"
                    : "bg-white text-black "
                } `}
              >
                {size.toUpperCase()}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* COLOR */}
      <div className="flex flex-col gap-2 text-sm">
        <span className="text-gray-500"> Color </span>
        <div className="flex items-center gap-2">
          {product.colors.map((color) => (
            <div
              className={`cursor-pointer border-1 p-[2px] ${
                selectedColor === color ? "border-gray-300 " : "border-white"
              }  `}
              key={color}
              onClick={() => handleTypeChange("color", color)}
            >
              <div className="w-6 h-6" style={{ backgroundColor: color }}></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductInterAction;
