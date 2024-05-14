module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"], // Specify the files that Tailwind CSS should scan for classes
  theme: {
    extend: {
      // Extend or override Tailwind CSS default theme here
      colors: {
        // Define custom colors or override existing ones
        primary: "#1e272e", // Example custom color
        white: "#fff",
        secondary: "#3e3e3e",
        tertiary: "#09c7e1",
        card: "#222b32",
        sidebar: "#2b343b",
      },
      fontFamily: {
        // Define custom font families
        headings: ["Poppins", "sans-serif"], // Example custom font family
        body: ["Montserrat", "sans-serif"],
      },
      backgroundImage: {
        // Define custom background images
        "hero-img": "url('./components/assets/bg.png')", // Example custom background image
        "footer-img": "url('./components/assets/footerbg.png')",
      },
      height: {
        // Define custom heights
        128: "39rem", // Example custom height
        130: "32rem",
      },
      width: {
        // Define custom widths
        129: "59rem", // Example custom width
        131: "30rem",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")], // Enable Tailwind CSS forms plugin
};
