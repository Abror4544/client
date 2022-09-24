module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      laptop: { max: "1600px" },
      laptopMini: { max: "1280px" },
      tablet: { max: "1024px" },
      tabletMini: { max: "768px" },
      mobile: { max: "640px" },
      mobileMini: { max: "300px" },
    },
  },
  plugins: [],
};
