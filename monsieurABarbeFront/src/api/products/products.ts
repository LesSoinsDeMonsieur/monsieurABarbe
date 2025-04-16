import axiosI from "@/axiosInterceptor";
import { Product } from "@/types/products";

export async function addProducts(data: Product) {
  const response = axiosI.post("products", data);
}
