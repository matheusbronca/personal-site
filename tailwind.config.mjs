import defaultTheme from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    animation: {
      shimmer: "shimmer 2s linear infinite",
      fadein: "fadein 300ms linear",
      fadeout: "fadeout 300ms linear",
    },
    keyframes: {
      shimmer: {
        from: {
          backgroundPosition: "0 0",
        },
        to: {
          backgroundPosition: "-200% 0",
        },
      },
      fadein: {
        from: {
          opacity: "0",
        },
        to: {
          opacity: "100",
        },
      },
      fadeout: {
        from: {
          opacity: "100",
        },
        to: {
          opacity: "0",
        },
      },
    },

    extend: {
      maxWidth: {
        "1/2": "calc(100% / 2)",
        "1/3": "calc((100% / 3) - .45rem)",
      },
      aspectRatio: {
        "ig-story": "9 / 16",
      },
      fontFamily: {
        sans: ["Inter", ...defaultTheme.fontFamily.sans],
        serif: ["Lora", ...defaultTheme.fontFamily.serif],
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
