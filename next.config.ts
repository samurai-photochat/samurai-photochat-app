import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "???", // следует указать ХОСТ
        pathname: "///", // путь к картинкам ( часть после Хоста)
      },
    ],
  },
}

export default nextConfig
