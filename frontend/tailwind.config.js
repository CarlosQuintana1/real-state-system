/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' }
                },
                modalIn: {
                    '0%': { 
                        opacity: '0',
                        transform: 'scale(0.95) translateY(-10px)'
                    },
                    '100%': { 
                        opacity: '1',
                        transform: 'scale(1) translateY(0)'
                    }
                }
            },
            animation: {
                fadeIn: 'fadeIn 0.3s ease-out',
                modalIn: 'modalIn 0.3s ease-out'
            }
        },
    },
    plugins: [],
}
