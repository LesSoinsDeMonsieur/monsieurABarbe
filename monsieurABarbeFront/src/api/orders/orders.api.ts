import axiosI from "@/axiosInterceptor";

export async function createOrder(payload: { items: { quantity: number; productId: number }[] }) {
  const res = await axiosI.post<{ id: number }>("/orders", payload);
  return res.data;
}
