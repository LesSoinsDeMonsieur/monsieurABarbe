import axiosI from "@/axiosInterceptor";
import { UserLogin, UserSignup } from "@/contexts/AuthContext";

export async function loginRequest(
  user: UserLogin
): Promise<{ token: string }> {
  return (await axiosI.post("/auth/login", user)).data;
}

export async function registerRequest(user: UserSignup) {
  return await axiosI.post("/auth/register", user);
}
export async function getProtected() {
  //   return await axiosI.get("/auth/protected");
  return true;
}
