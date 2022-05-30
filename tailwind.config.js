module.exports = {
    mode: 'jit',
    purge: [
        './pages/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}',
        './layout/**/*.{js,ts,jsx,tsx}',
        './section/**/*.{js,ts,jsx,tsx}',
    ],
    content: [
        './pages/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}',
        './layout/**/*.{js,ts,jsx,tsx}',
        './section/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            colors: {
                'custom-sora': '#245eff',
                'custom-roboco': '#a36694',
                'custom-suisei': '#50e5f9',
                'custom-azki': '#f4348b',
                'custom-miko': '#ff9cb4',
            },
        },
    },
    plugins: [],
};
