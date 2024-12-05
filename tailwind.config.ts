import type { Config } from 'tailwindcss';

const config: Config = {
  content:
    process.env.NODE_ENV === 'production'
      ? [
          './src/**/*.{js,ts,jsx,tsx,mdx}',
          './app/**/*.{js,ts,jsx,tsx,mdx}',
          './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
        ]
      : ['./src/**/*.{js,ts,jsx,tsx,mdx}', './app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      gridTemplateColumns: {
        'main-layout': '210px 4fr',
        'profile-layout': 'repeat(2, 1fr)',
        'post-layout': '400px 2.5fr',
      },
      boxShadow: {
        custom: '0 0 10px 3px rgba(116, 116, 116, 0.3)',
      },
      spacing: {
        'arrow-top': 'calc(50% - 15px)',
      },
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],
};
export default config;
