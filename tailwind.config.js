/** @type {import('tailwindcss').Config} */
module.exports = {
  tailwindConfig: "./styles/tailwind.config.js",
  content: ["./src/**/*.{html,js,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
<<<<<<< HEAD
        mobile: "url('./assets/images/bg-sidebar-desktop.svg')",
        desktop: "url('./assets/images/bg-sidebar-desktop.svg')",
        check: "url('./assets/images/check.svg')",
=======
        mobile: "url('../public/assets/images/bg-sidebar-desktop.svg')",
        desktop: "url('../public/assets/images/bg-sidebar-desktop.svg')",
        check: "url('../public/assets/images/check.svg')",
>>>>>>> 1d3dbb546f41a974be2a64963aab236a55bff6a1
      },
      borderWidth: {
        1: "1px",
      },
      backgroundColor: {
        "light-blue": "hsl(206, 94%, 87%)",
      },
      height: {
        7: "25px",
      },
      fontWeight: {
        400: "400",
        500: "500",
      },
      screens: {
        desktop: "1320px",
      },
      height: {
        530: "530px",
      },
      width: {
        850: "850px",
      },
    },
  },
  plugins: [],
  safelist: ["bg-mobile", "bg-desktop", "bg-check"],
};
