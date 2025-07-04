"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { getProtected, loginRequest, registerRequest, getMeRequest } from "@/api/auth/auth";
import axios from "axios";
import axiosI from "@/axiosInterceptor";
import { RoleEnum } from "@/types/role";
import { useRouter } from "next/navigation";

type UserInfo =
  | {
      state: LoginState.LOGGED_OUT;
    }
  | {
      state: LoginState.LOGGED_IN;
      id: number;
      username: string;
      email: string;
      role: RoleEnum;
    };

export type UserSignup = {
  userName: string;
  email: string;
  password: string;
};

export type UserLogin = {
  email: string;
  password: string;
};

interface IAuthContext {
  userInfo: UserInfo | null;
  isAuthReady: boolean; // ✅ Ajouté ici
  submitLogin: ({ email, password }: UserLogin) => Promise<AuthStatus>;
  logout: () => Promise<void>;
  submitRegister: ({ userName, email, password }: UserSignup) => Promise<AuthStatus>;
  retrieveUserInfos: () => void;
}

export enum AuthStatus {
  OK,
  WRONG_CREDENTIALS,
  INVALID_FORMAT,
  LOGIN_UNAVAILABLE,
  ERROR,
}

export enum LoginState {
  LOGGED_IN,
  LOGGED_OUT,
}

const AuthContext = createContext<IAuthContext>({
  userInfo: null,
  submitLogin: async () => AuthStatus.ERROR,
  logout: async () => {},
  submitRegister: async () => AuthStatus.ERROR,
  retrieveUserInfos: async () => {},
  isAuthReady: false,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isReady, setIsReady] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const router = useRouter();
  const [isAuthReady, setIsAuthReady] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      setAccessToken(token);
    }
    setIsReady(true);
  }, []);

  useEffect(() => {
    if (accessToken) {
      localStorage.setItem("accessToken", accessToken);
      const interceptor = axiosI.interceptors.request.use((config) => {
        if (config?.headers && !config.headers.Authorization) {
          config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
      });

      updateUserInfo();

      return () => axiosI.interceptors.request.eject(interceptor);
    }
    updateUserInfo();
  }, [accessToken, isReady]);

  const retrieveUserInfos = async () => {
    if (!isReady) {
      return;
    }

    if (!accessToken) {
      setUserInfo({ state: LoginState.LOGGED_OUT });
    }

    try {
      const me = await getMeRequest();
      if (me) {
        setUserInfo({
          state: LoginState.LOGGED_IN,
          ...(me as {
            id: number;
            username: string;
            email: string;
            role: RoleEnum;
          }),
        });
      } else {
        setUserInfo({ state: LoginState.LOGGED_OUT });
      }
    } catch {
      setUserInfo({ state: LoginState.LOGGED_OUT });
    }
  };

  const updateUserInfo = async () => {
    if (!isReady) return;

    if (!accessToken) {
      setUserInfo({ state: LoginState.LOGGED_OUT });
      setIsAuthReady(true); // ✅
      return;
    }

    try {
      const me = await getMeRequest();
      const isAllowed = await getProtected();

      if (me && isAllowed) {
        setUserInfo({
          state: LoginState.LOGGED_IN,
          id: me.id,
          username: me.username,
          email: me.email,
          role: me.role,
        });
      } else {
        setUserInfo({ state: LoginState.LOGGED_OUT });
      }
    } catch (e) {
      console.error(e);
      setUserInfo({ state: LoginState.LOGGED_OUT });
    } finally {
      setIsAuthReady(true); // ✅ toujours à la fin
    }
  };
  const submitLogin = async (user: UserLogin): Promise<AuthStatus> => {
    try {
      const result = await loginRequest(user);
      if (!result) {
        //Unknown error
        return AuthStatus.ERROR;
      }
      setAccessToken(result.token);
      setUserInfo(null); //Forces router to wait until user data has been re-retrieved

      return AuthStatus.OK;
    } catch (err) {
      console.error(err);
      if (axios.isAxiosError(err) && err.request?.status === 403) {
        //Wrong credentials
        return AuthStatus.WRONG_CREDENTIALS;
      }
      return AuthStatus.ERROR;
    }
  };
  const logout = async () => {
    setAccessToken(null);
    setUserInfo({ state: LoginState.LOGGED_OUT }); //Forces router to wait until user data has been re-retrieved
    localStorage.setItem("accessToken", "");
    router.push("/");
  };
  const submitRegister = async (user: UserSignup): Promise<AuthStatus> => {
    try {
      const result = await registerRequest({ ...user });
      if (!result) {
        return AuthStatus.ERROR;
      }
      return AuthStatus.OK;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.request.status === 400) {
          //Wrong credentials
          return AuthStatus.INVALID_FORMAT;
        }
        if (err.request.status === 409) {
          //Email already used
          return AuthStatus.LOGIN_UNAVAILABLE;
        }
      }
      return AuthStatus.ERROR;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        userInfo,
        isAuthReady,
        submitLogin,
        logout,
        submitRegister,
        retrieveUserInfos,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => useContext<IAuthContext>(AuthContext);
