import { extendTheme } from "@chakra-ui/react";

export const colors = {
    white: {
        '700': '#AAA',
        '900': '#9A9C9C',
    },
    red: {
        '100': '#FF5C5C'
    },
    orange: {
        '500': '#FF9C21'
    },
    green: {
        '200': '#00E525',
        '400': '#254138',
        '500': '#2C3C3B',
        '600': '#32554A',
        '700': '#354043',
        '800': '#252E30',
        '900': '#161A1D'
    },
    black: {
        '100': '#1D2024',
        '500': '#18191D'
    },
    gray: {
        '100': '#565959',
        '200': '#2D3639',
        '700': '#1F2729'
    }
};

export const theme = extendTheme({
    colors,
    fonts: {
        body: "DM Sans",
    },
    styles: {
        global: {
            body: {
                fontSize: '24px',
                outline: 'none'
            },
        },
    },

});