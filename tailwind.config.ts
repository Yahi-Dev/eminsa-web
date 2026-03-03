import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Colores corporativos EMINSA
        eminsa: {
          blue: {
            DEFAULT: '#00269b',
            50: '#e8ebf7',
            100: '#c5cceb',
            200: '#8a99d7',
            300: '#5066c3',
            400: '#2846af',
            500: '#00269b',
            600: '#001f7c',
            700: '#00175d',
            800: '#00103e',
            900: '#00081f',
          },
          gray: {
            DEFAULT: '#6d6e6d',
            50: '#f4f4f4',
            100: '#e6e6e6',
            200: '#cccdcc',
            300: '#b3b3b3',
            400: '#909190',
            500: '#6d6e6d',
            600: '#575857',
            700: '#414241',
            800: '#2c2c2c',
            900: '#161616',
          },
          orange: '#e9862c',
          cyan: '#0099ce',
          green: '#009e49',
        },
        // Alias para facilitar el uso
        primary: {
          DEFAULT: '#00269b',
          foreground: '#FFFFFF',
        },
        secondary: {
          DEFAULT: '#6d6e6d',
          foreground: '#FFFFFF',
        },
        accent: {
          DEFAULT: '#0099ce',
          foreground: '#FFFFFF',
        },
      },
      fontFamily: {
        sans: ['var(--font-montserrat)', 'system-ui', 'sans-serif'],
        display: ['var(--font-montserrat)', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'hero-pattern': 'linear-gradient(135deg, #00269b 0%, #00175d 50%, #00269b 100%)',
        'mesh-gradient': 'radial-gradient(at 40% 20%, hsla(220,100%,27%,1) 0px, transparent 50%), radial-gradient(at 80% 0%, hsla(210,100%,44%,1) 0px, transparent 50%), radial-gradient(at 0% 50%, hsla(220,100%,27%,1) 0px, transparent 50%)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'fade-in-up': 'fadeInUp 0.6s ease-out',
        'fade-in-down': 'fadeInDown 0.6s ease-out',
        'slide-in-left': 'slideInLeft 0.6s ease-out',
        'slide-in-right': 'slideInRight 0.6s ease-out',
        'scale-in': 'scaleIn 0.5s ease-out',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-50px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(50px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(0, 153, 206, 0.5)' },
          '100%': { boxShadow: '0 0 20px rgba(0, 153, 206, 0.8)' },
        },
      },
      boxShadow: {
        'eminsa': '0 10px 40px -10px rgba(0, 38, 155, 0.3)',
        'eminsa-lg': '0 25px 50px -12px rgba(0, 38, 155, 0.4)',
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'card-hover': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      },
    },
  },
  plugins: [],
};

export default config;
