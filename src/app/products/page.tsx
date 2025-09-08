import ProductList from "@/components/ProductList";
import React from "react";

async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ category: string }>;
}) {
  const category = (await searchParams).category;

  return (
    <div className="">
      <ProductList category={category} params="products" />
    </div>
  );
}

export default ProductsPage;
