import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	output: "standalone",
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "media.discordapp.net",
				port: "",
				pathname: "/**",
			},
		],
	},
};

export default nextConfig;
