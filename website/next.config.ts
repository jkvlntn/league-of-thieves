import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	output: "standalone",
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "i.ibb.co",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "lh3.googleusercontent.com",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "drive.google.com",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "cdn.discordapp.com",
				pathname: "/attachments/**",
			},
			{
				protocol: "https",
				hostname: "media.discordapp.net",
				pathname: "/attachments/**",
			},
		],
	},
};

export default nextConfig;
