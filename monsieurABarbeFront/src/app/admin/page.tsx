"use client";

import AdminTabsPage from "@/components/AdminTabsPage";
import { LoginState, useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AdminPage() {
  const { userInfo, isAuthReady } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (!isAuthReady) return;

    if (!userInfo || userInfo.state == LoginState.LOGGED_OUT) {
      router.push("/login");
    }
  }, [userInfo, isAuthReady]);

  return (
    <div style={{ height: "100%" }}>
      <AdminTabsPage />
    </div>
  );
}
