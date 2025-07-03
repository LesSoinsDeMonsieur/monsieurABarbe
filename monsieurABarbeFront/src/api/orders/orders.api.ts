import axiosI from "@/axiosInterceptor";
import { Order } from "@/types/order";
import Product from "@/types/product";

export async function createOrder(payload: { items: { quantity: number; productId: number }[] }) {
  const res = await axiosI.post<{ id: number }>("/orders", payload);
  return res.data;
}

export async function getUserOrders2(userId: number): Promise<Order[]> {
  const response = await axiosI.get(`/orders/user/${userId}`);
  console.log("Données reçues des commandes :", response.data);
  return response.data;
}

export async function getProductById(id: number): Promise<Product> {
  const response = await axiosI.get(`/products/${id}`);
  return response.data;
}
