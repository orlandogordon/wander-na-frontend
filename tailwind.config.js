/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "gray-20": "#E7ECEE",
        "gray-50": "#D8E0E3",
        "gray-100": "#DFCCCC",
        "gray-500": "#5E0000",
        "primary-100": "#EAF5BB",
        "primary-300": "#D9ED82",
        "primary-500": "#C3DA7C",
        "secondary-100": "#2D869F",
        "secondary-400": "#1F5E6F",
        "secondary-500": "#174451",
      },
      backgroundImage: (theme) => ({
        "gradient-yellowred": "linear-gradient(0deg, #FF616A 0%, #FFC837 100%)",
        "mobile-home": "url('./assets/HomePageGraphic.png')",
        "rocktunnel-home": "url('./assets/bg-rocktunnel.png')",
        "redrocks-home": "url('./assets/bg-redrocks.png')",
        "rockys-home": "url('./assets/bg-rockys.png')",
        "ropeswing-home":
          "linear-gradient(to top left, rgba(255, 255, 255, 0) 25%, rgba(0, 0, 0, 0.9)),url('./assets/bg-ropeswing.png')",
        "tour-card-overlay":
          "linear-gradient(to bottom right, rgba(255, 255, 255, 0) 15%, rgba(0, 0, 0, 0.9))",
        "text-background":
          "linear-gradient(to bottom right,rgba(49, 148, 175, 0.85) 75%, rgba(23, 68, 81, 0.85))",
        "text-background2":
          "linear-gradient(to bottom right,rgba(217, 237, 130, 0.85) 75%, rgba(124, 160, 13, 0.85))",
        "text-background3":
          "linear-gradient(to bottom right,rgba(141, 159, 188, 0.85) 75%, rgba(109, 123, 146, 0.85))",
        "signup-background":
          "linear-gradient(to bottom,rgba(100, 116, 139, 1.0) 25%, rgba(203, 213, 225, 0.85))",
        "contactus-background":
          "linear-gradient(to bottom right,rgba(100, 116, 139, 1.0) 55%, rgba(203, 213, 225, 0.85))",
      }),
      fontFamily: {
        dmsans: ["DM Sans", "sans-serif"],
        montserrat: ["Montserrat", "sans-serif"],
      },
      content: {
        evolvetext: "url('./assets/EvolveText.png')",
        abstractwaves: "url('./assets/AbstractWaves.png')",
        sparkles: "url('./assets/Sparkles.png')",
        circles: "url('./assets/Circles.png')",
      },
      maxWidth: {
        "1/4": "25%",
        "1/3": "33.333%",
        "1/2": "50%",
        "2/3": "66%",
        "3/4": "75%",
        "5/6": "83.333&",
      },
      maxHeight: {
        "1/4": "25%",
        "1/3": "33.333%",
        "1/2": "50%",
        "2/3": "66%",
        "3/4": "75%",
        "5/6": "83.333&",
      },
    },
    screens: {
      xs: "480px",
      sm: "768px",
      md: "1060px",
      lg: "1440px",
    },
  },
  plugins: [],
};
