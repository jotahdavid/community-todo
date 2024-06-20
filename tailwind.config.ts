import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'green-dark': '#223622',
        'green-light': '#7BC35C',
      },
      fontFamily: {
        'vt323': 'var(--font-vt323)',
      },
    },
  },
  plugins: [],
};
export default config;
