import axiosI from "@/axiosInterceptor";

export async function createStripeSession() {
  const res = await axiosI.post<{ sessionId: string; error?: string }>("/stripe/create-session");
  return res.data;
}
