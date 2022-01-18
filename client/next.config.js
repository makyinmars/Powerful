/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  env: {
    API_URL: "https://powerful-server.herokuapp.com",
  },
  images: {
    domains: ["res.cloudinary.com"],
  },
};
