/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "hsl(var(--vort-primary))",
          foreground: "hsl(var(--vort-primary-foreground))",
        },
        border: "hsl(var(--vort-border))",
        background: "hsl(var(--vort-background))",
        foreground: "hsl(var(--vort-foreground))",
      },
    },
  },
  plugins: [],
};
