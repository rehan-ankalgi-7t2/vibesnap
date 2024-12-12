import { createTheme } from "@mui/material";

const theme = createTheme({
    palette: {
        blue: {
            main: "#3A84D7",
        },
        green: {
            main: "#5DC48D",
        },
        paleGreen: {
            main: "#BFEC9C",
        },
        greenStroke: {
            main: "#11AF22",
        },
        primary: {
            main: "#161618",
            contrastText: "#fff"
        },
        appleBlack: {
            main: "#161618",
            contrastText: "#fff"
        },
        white: {
            main: "#ffffff",
        },
        orange: {
            main: "#e36048",
        },
        yellow: {
            main: "#F59E0B",
        },
        orangeTranslucent: {
            main: "rgb(227, 96, 72, 0.16)",
        },
        lightPink: {
            main: "#FCF4F0",
        },
        skyBlue: {
            main: "#D8E9FD",
        },
        darkNavyBlue: {
            main: "#042447",
        },
        grey: {
            main: "#D9DAD9",
        },
        darkerGrey: {
            main: "#7C7C7C",
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    variants: [
                        {   props: {},
                            style: {
                                borderRadius: "50px"
                            }
                        }
                    ]
                }
            }
        }
    },
    typography: {
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
    },
});

export default theme;