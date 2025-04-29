module.exports = {
    content: [
      "./src/**/*.{html,js,jsx,ts,tsx}", // Make sure you have the correct paths
    ],
    theme: {
      extend: {
        // Custom animations and keyframes
        animation: {
          'fade-in': 'fadeIn 500ms ease-in-out', // Example fade-in animation
          'slide-up': 'slideUp 500ms ease-in-out', // Example slide-up animation
          'fade-out': 'fadeOut 500ms ease-in-out', // Example fade-out animation
          'slide-down': 'slideDown 500ms ease-in-out', // Example slide-down animation
        },
        keyframes: {
          fadeIn: {
            '0%': { opacity: 0 },
            '100%': { opacity: 1 },
          },
          slideUp: {
            '0%': { transform: 'translateY(10px)', opacity: 0 },
            '100%': { transform: 'translateY(0)', opacity: 1 },
          },
          fadeOut: {
            '0%': { opacity: 1 },
            '100%': { opacity: 0 },
          },
          slideDown: {
            '0%': { transform: 'translateY(0)', opacity: 1 },
            '100%': { transform: 'translateY(10px)', opacity: 0 },
          },
        },
      },
    },
    plugins: [],
  };
  