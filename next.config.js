/** @type {import('next').NextConfig} */

module.exports = {
  reactStrictMode: true,
  images: {
    loader: "akamai",
    path: "",
    domains: [
      "www.visitbusan.net",
      "ukcooyocdlvo8099722.cdn.ntruss.com",
      "busan.go.kr",
    ],
  },
};
