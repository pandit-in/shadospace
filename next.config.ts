import type { NextConfig } from "next"

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "p3qckvtohq.ufs.sh",
            },
        ],
    },
}

export default nextConfig
