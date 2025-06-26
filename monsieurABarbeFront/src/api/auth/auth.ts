import axiosI from "@/axiosInterceptor";
import { UserLogin, UserSignup } from "@/contexts/AuthContext";

export async function loginRequest(user: UserLogin): Promise<{ token: string }> {
  console.log(user);
  console.log(await axiosI.post("/auth/login", user));
  return (await axiosI.post("/auth/login", user)).data;
}

export async function registerRequest(user: UserSignup) {
  return await axiosI.post("/auth/register", {
    email: user.email,
    username: user.userName,
    password: user.password,
  });
}

export async function getProtected() {
  //   return await axiosI.get("/auth/protected");
  return true;
}

export async function getMeRequest() {
  const response = await axiosI.get("/users/me");
  return response.data;
}
