/** @type {import('next').NextConfig} */

// const withPWA = require("next-pwa")({
//   dest: "public",
// });

// module.exports = withPWA({
//   reactStrictMode: true,
//   images: {
//     remotePatterns: [
//       {
//         protocol: "https",
//         hostname: "imgfp.hotp.jp",
//         port: "",
//         pathname: "/**",
//       },
//     ],
//   },
// });

const withPWA = require("next-pwa");

const nextConfig = withPWA({
  pwa: {
    dest: "public",
  },
  reactStrictMode: true,
  trailingSlash: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "imgfp.hotp.jp",
        port: "",
        pathname: "/**",
      },
    ],
  },
});

module.exports = nextConfig;
