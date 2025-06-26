import axiosI from "@/axiosInterceptor";

export async function createOrder(payload: any) {
  const res = await axiosI.post<{ id: number }>("/orders", payload);
  return res.data;
}
