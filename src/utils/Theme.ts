import { extendTheme, NativeBaseProvider } from "native-base";
// 2. Extend the theme to include custom colors, fonts, etc
export const theme = extendTheme({
    colors: {
        primary: {
            50: '#fef2f3',
            100: '#fde3e5',
            200: '#fcccd0',
            300: '#f9a8ae',
            400: '#f3767f',
            500: '#e63946',
            600: '#d52d3a',
            700: '#b3222d',
            800: '#942029',
            900: '#7b2128',
        },
    },
    fontConfig: {
        Rubik: {
            100: {
                normal: "Rubik-Light",
                italic: "Rubik-LightItalic",
            },
            200: {
                normal: "Rubik-Light",
                italic: "Rubik-LightItalic",
            },
            300: {
                normal: "Rubik-Light",
                italic: "Rubik-LightItalic",
            },
            400: {
                normal: "Rubik-Regular",
                italic: "Rubik-Italic",
            },
            500: {
                normal: "Rubik-Medium",
            },
            600: {
                normal: "Rubik-Medium",
                italic: "Rubik-MediumItalic",
            },
        },
    },
    components: {
        Text: {
            baseStyle: {
                color: 'black'
            },
            defaultProps: {
                size: 'md',
            },
            sizes: {
                xl: {
                    fontSize: '64px'
                },
                lg: {
                    fontSize: '32px'
                },
                md: {
                    fontSize: '16px'
                },
                sm: {
                    fontSize: '12px'
                }
            }
        }
    },
    fonts: {
        heading: "Rubik",
        body: "Rubik",
        mono: "Rubik",
    },
})
