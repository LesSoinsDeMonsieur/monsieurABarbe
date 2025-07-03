import type { NextConfig } from "next";

const backendImageUrl = process.env.NEXT_PUBLIC_BACKEND_URL_IMAGE || "http://localhost:8080/";
const url = new URL(backendImageUrl);

const proto = url.protocol.replace(":", "");
const protocol = proto === "http" || proto === "https" ? proto : undefined;

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: protocol,
        hostname: url.hostname,
        port: url.port,
        pathname: "/uploads/**",
      },
    ],
  },
};

export default nextConfig;
