/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
  	extend: {
  borderRadius: {
    lg: '1rem',
    md: '0.375rem',
    sm: 'calc(var(--radius) - 4px)'
  },
  colors: {
    background: 'hsl(var(--background))',
    foreground: 'hsl(var(--foreground))',
    card: {
      DEFAULT: 'hsl(var(--card))',
      foreground: 'hsl(var(--card-foreground))'
    },
    popover: {
      DEFAULT: 'hsl(var(--popover))',
      foreground: 'hsl(var(--popover-foreground))'
    },
    primary: {
      DEFAULT: 'hsl(var(--primary))',
      foreground: 'hsl(var(--primary-foreground))'
    },
    secondary: {
      DEFAULT: 'hsl(var(--secondary))',
      foreground: 'hsl(var(--secondary-foreground))'
    },
    muted: {
      DEFAULT: 'hsl(var(--muted))',
      foreground: 'hsl(var(--muted-foreground))'
    },
    accent: {
      DEFAULT: 'hsl(var(--accent))',
      foreground: 'hsl(var(--accent-foreground))'
    },
    destructive: {
      DEFAULT: 'hsl(var(--destructive))',
      foreground: 'hsl(var(--destructive-foreground))'
    },
    border: 'hsl(var(--border))',
    input: 'hsl(var(--input))',
    ring: 'hsl(var(--ring))',
    chart: {
      '1': 'hsl(var(--chart-1))',
      '2': 'hsl(var(--chart-2))',
      '3': 'hsl(var(--chart-3))',
      '4': 'hsl(var(--chart-4))',
      '5': 'hsl(var(--chart-5))'
    },

//     "mint-leaf": {
//     "50": "#edf7f3",
//     "100": "#dbf0e6",
//     "200": "#b7e1cd",
//     "300": "#93d2b5",
//     "400": "#6fc39c",
//     "500": "#4bb483",
//     "600": "#3c9069",
//     "700": "#2d6c4f",
//     "800": "#1e4834",
//     "900": "#0f241a",
//     "950": "#0b1912"
//   },

//   "cornflower-ocean": {
//     "50": "#ebf2f9",
//     "100": "#d7e6f4",
//     "200": "#b0cce8",
//     "300": "#88b2dd",
//     "400": "#6199d1",
//     "500": "#397fc6",
//     "600": "#2e669e",
//     "700": "#224c77",
//     "800": "#17334f",
//     "900": "#0b1928",
//     "950": "#08121c"
// },

    // Existing colors you had
    "primary-blue": "#135bec",
    "background-light": "#f6f6f8",
    "background-dark": "#101622",
    "sidebar-dark": "#151c29",
    "border-light": "#e5e7eb",
    "border-dark": "#2d3748",
  }
}

  },
  plugins: [require("tailwindcss-animate")],
}
