/** @type {import('tailwindcss').Config} */
module.exports = {
  tailwindConfig: "./styles/tailwind.config.js",
  content: ["./src/**/*.{html,js,tsx}"],
  theme: {
    extend: {
      backgroundImage: (theme) => {
        'mobile': "url('/assets/images/bg-sidebar-mobile.svg')",
        'desktop': "url('/assets/images/bg-sidebar-desktop.svg')",
        'check': "url('/assets/images/check.svg')",
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
  purge: ["./src/components/**/*.{js,jsx}", "./public/index.html"],
};
