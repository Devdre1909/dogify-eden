module.exports = {
  globDirectory: "public/",
  globPatterns: ["**/*.{ico,html,css,js}"],
  swDest: "public/sw.js",
  ignoreURLParametersMatching: [/^utm_/, /^fbclid$/],
  runtimeCaching: [
    {
      urlPattern: /\.(?:png|jpg|jpeg|svg|json)$/,
      handler: "StaleWhileRevalidate",
    },
  ],
};
