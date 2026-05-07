import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        border: "var(--border)",
        muted: "var(--muted)",
        "muted-foreground": "var(--muted-foreground)",
      },
      boxShadow: {
        'wireframe': '4px 4px 0px 0px rgba(0,0,0,1)',
        'wireframe-white': '4px 4px 0px 0px rgba(255,255,255,1)',
        'wireframe-sm': '2px 2px 0px 0px rgba(0,0,0,1)',
        'wireframe-white-sm': '2px 2px 0px 0px rgba(255,255,255,1)',
        'wireframe-left': '-8px 0px 0px 0px rgba(0,0,0,1)',
        'wireframe-left-white': '-8px 0px 0px 0px rgba(255,255,255,1)',
      },
      borderWidth: {
        '3': '3px',
      },
    },
  },
  plugins: [],
};
export default config;
