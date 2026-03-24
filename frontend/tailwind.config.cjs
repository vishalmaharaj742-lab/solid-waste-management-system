module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["'Space Grotesk'", "sans-serif"],
        body: ["'Plus Jakarta Sans'", "sans-serif"]
      },
      colors: {
        ink: "#0f172a",
        mint: "#34d399",
        sky: "#38bdf8",
        sand: "#f8fafc",
        coral: "#fb7185",
        citrus: "#facc15",
        ocean: "#0ea5e9"
      },
      boxShadow: {
        soft: "0 20px 60px -40px rgba(15, 23, 42, 0.4)",
        glow: "0 30px 80px -40px rgba(14, 165, 233, 0.45)"
      },
      keyframes: {
        floaty: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" }
        },
        pulseSoft: {
          "0%, 100%": { opacity: "0.6" },
          "50%": { opacity: "1" }
        }
      },
      animation: {
        floaty: "floaty 6s ease-in-out infinite",
        pulseSoft: "pulseSoft 4s ease-in-out infinite"
      }
    }
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/typography")]
};
