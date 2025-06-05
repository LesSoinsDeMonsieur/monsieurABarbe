import axiosI from "@/axiosInterceptor";
import Product, { NewProduct } from "@/types/product";

export async function addProducts(data: NewProduct): Promise<Product> {
  const response = await axiosI.post("/products", data);
  return response.data;
}

export async function updateProduct({
  id,
  updatedProduct,
}: {
  id: number;
  updatedProduct: Product;
}) {
  await axiosI.put(`/products/${id}`, updatedProduct);
}

export async function getProduct({ id }: { id: number }): Promise<Product | null> {
  try {
    const response = await axiosI.get<Product>(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/products/${id}`,
    );
    return response.data;
  } catch (err) {
    console.error(err);
    return null;
  }
}
