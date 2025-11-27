{import('tailwindcss').Config}
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      colors: {
        neutral: {
          900: '#0b0b0c',
        },
      },
    },
  },
  plugins: [],
};
