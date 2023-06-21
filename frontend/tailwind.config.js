export const content = ["./src/**/*.{js,jsx,ts,tsx}"];
export const darkMode = "class";
export const theme = {
  fontFamily: {
    display: ["Open Sans", "sans-serif"],
    body: ["Open Sans", "sans-serif"],
  },
  extend: {
    fontSize: {
      14: "14px",
    },
    backgroundColor: {
      "main-bg": "#FAFBFB",
      "main-dark-bg": "#20232A",
      "secondary-dark-bg": "#33373E",
      "light-gray": "#F7F7F7",
      "half-transparent": "rgba(0, 0, 0, 0.5)",
    },
    borderWidth: {
      1: "1px",
    },
    borderColor: {
      color: "rgba(0, 0, 0, 0.1)",
    },
    width: {
      400: "400px",
      760: "760px",
      780: "780px",
      800: "800px",
      1000: "1000px",
      1200: "1200px",
      1400: "1400px",
    },
    height: {
      80: "80px",
    },
    minHeight: {
      590: "590px",
    },

    backgroundImage: {
      "hero-1": "url('./assets/images/hero/hero1-blue.svg')",
      "hero-2": "url('./assets/images/hero/hero2-green.svg')",
      "hero-3": "url('./assets/images/hero/hero3-purple.svg')",
      "hero-4": "url('./assets/images/hero/hero4-red.svg')",
      "hero-5": "url('./assets/images/hero/hero5-indigo.svg')",
      "hero-6": "url('./assets/images/hero/hero6-orange.svg')",
      "logo-zidyia": "url('./assets/images/zidyia-logo.jpeg')",
    },
  },
};
export const plugins = [require("tailwind-scrollbar-hide")];
