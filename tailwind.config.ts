import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        // Luminous Spiritual Palette: Bleu Ciel, Noir, Blanc & Bleu Pure (AWS: Africa World Saving)
        cosmos: {
          950: "#ffffff", // Pure Blanc
          900: "#f8fafc", // Luminous Slate 50
          850: "#f0f7ff", // Celestial Sky Mist
          800: "#e0f2fe", // Bleu Ciel 100
          700: "#bae6fd", // Bleu Ciel 200
          600: "#7dd3fc", // Bleu Ciel 300
        },
        gold: {
          300: "#0284c7", // Bleu ciel profond contrasté
          400: "#0052ff", // Bleu pur vif
          500: "#0052ff", // Bleu pur électrique
          600: "#1d4ed8", // Bleu pur cobalt
          700: "#1e40af", // Bleu pur nuit
        },
        bleuPure: {
          DEFAULT: "#0052ff",
          400: "#3b82f6",
          500: "#2563eb",
          600: "#0052ff",
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#1e3a8a",
        },
        bleuCiel: {
          50: "#f0f9ff",
          100: "#e0f2fe",
          200: "#bae6fd",
          300: "#7dd3fc",
          400: "#38bdf8",
          500: "#0ea5e9",
          600: "#0284c7",
        },
        noir: "#09090b",
        blanc: "#ffffff",
        terracotta: {
          400: "#38bdf8",
          500: "#0ea5e9",
          600: "#0284c7",
        },
        emeraldSacred: {
          400: "#38bdf8",
          500: "#0ea5e9",
          600: "#0052ff",
          700: "#1d4ed8",
        },
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      animation: {
        "float": "float 6s ease-in-out infinite",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "glow": "glow 3s ease-in-out infinite alternate",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        glow: {
          "0%": { opacity: "0.4", filter: "blur(20px)" },
          "100%": { opacity: "0.8", filter: "blur(30px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
