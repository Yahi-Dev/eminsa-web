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
            DEFAULT: '#001689',
            50: '#E6E8F5',
            100: '#C0C4E8',
            200: '#8086D0',
            300: '#4049B9',
            400: '#1A239E',
            500: '#001689',
            600: '#00126E',
            700: '#000E53',
            800: '#000A38',
            900: '#00061D',
          },
          gray: {
            DEFAULT: '#76777A',
            50: '#F5F5F5',
            100: '#E8E8E9',
            200: '#CBCCCD',
            300: '#AEAFB1',
            400: '#929395',
            500: '#76777A',
            600: '#5E5F61',
            700: '#474849',
            800: '#2F3031',
            900: '#181818',
          },
          orange: '#FF5500',
          cyan: '#00A3E0',
          green: '#00B140',
        },
        // Alias para facilitar el uso
        primary: {
          DEFAULT: '#001689',
          foreground: '#FFFFFF',
        },
        secondary: {
          DEFAULT: '#76777A',
          foreground: '#FFFFFF',
        },
        accent: {
          DEFAULT: '#00A3E0',
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
        'hero-pattern': 'linear-gradient(135deg, #001689 0%, #000E53 50%, #001689 100%)',
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
          '0%': { boxShadow: '0 0 5px rgba(0, 163, 224, 0.5)' },
          '100%': { boxShadow: '0 0 20px rgba(0, 163, 224, 0.8)' },
        },
      },
      boxShadow: {
        'eminsa': '0 10px 40px -10px rgba(0, 22, 137, 0.3)',
        'eminsa-lg': '0 25px 50px -12px rgba(0, 22, 137, 0.4)',
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'card-hover': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      },
    },
  },
  plugins: [],
};

export default config;
