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

export async function addImages({ images, id }: { id: number; images: File[] }) {
  const formData = new FormData();
  images.forEach((file) => formData.append("images", file));
  await axiosI.post(`/products/${id}/images`, formData);
}

export async function deleteImage(id: number) {
  await axiosI.delete(`/products/images/${id}`);
}
