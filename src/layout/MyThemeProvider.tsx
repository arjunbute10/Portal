import { createTheme, PaletteOptions, ThemeProvider } from '@mui/material/styles';
import { createContext, useState } from 'react';

const _paletteOptions: PaletteOptions = {
    mode: 'light',
    primary: {
        main: '#F47920',
        contrastText: '#FFFFFF'
    },
    secondary: {
        main: '#637381',
        contrastText: '#ffffff'
    },
    success: {
        main: '#229A16',
        contrastText: '#ffffff'
    },
    error: {
        main: '#DB1F35',
        contrastText: '#ffffff'
    },
    warning: {
        main: '#FFC107',
        contrastText: '#ffffff'
    },
    info: {
        main: '#1035BB',
        contrastText: '#ffffff'
    },
    text: {
        primary: '#212B36',
        secondary: '#637381',
        // disabled:'',
    },
}

const themeOptions: any = {
    palette: _paletteOptions,
    components: {
        MuiCard: {
            styleOverrides: {
                root: {
                    boxShadow: '0px 12px 24px -4px rgba(145, 158, 171, 0.12), 0px 0px 2px 0px rgba(145, 158, 171, 0.20)',
                    borderRadius: 12,
                },
            },
        },
        MuiTabPanel: {
            styleOverrides: {
                root: {
                    padding: 0,
                },
            },
        },
        MuiDataGrid: {
            styleOverrides: {
                root: {
                    boxShadow: '0px 12px 24px -4px rgba(145, 158, 171, 0.12), 0px 0px 2px 0px rgba(145, 158, 171, 0.20)',
                    borderRadius: 12,
                    border: 0,
                },
            },
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                },
            },
        }
    },
    shape: {
    },
    text: {
        primary: '#212B36',
        secondary: '#637381',
        dark: '#000',
        light: '#fff',
        // disabled:'',
        // hint:'',
    },
    typography: {
        button: {
            textTransform: "capitalize"
        },
        caption: {
            fontSize: 16,
        },
        subtitle1: {
            fontSize: 17,
            fontWeight: 600,
        },
        subtitle2: {
            fontSize: 14,
            color: '#637381',
            fontWeight: 600,
            paddingInline: 8,
            borderRadius: 4,
            background: '#63738129',
        },
        body1: {
            fontSize: 17,
            color: '#637381',
        },
        body2: {
            fontSize: 14,
            color: '#637381',
        },
        h1: {
            color: '#212B36',
            fontSize: 36,
            paddingBlock: 12,
            fontWeight: 700,
        },
        h2: {
            fontWeight: 600,
            fontSize: 24,
            color: "#212B36"
        },
        h3: {
            fontWeight: 600,
            fontSize: 22,
            color: "#F47920"
        },
        h4: {
            fontSize: 16,
            color: "#fff",
            fontWeight: 500,
        },
        h5: {
            fontWeight: 600,
            color: "#212B36",
            fontSize: 18,
        },
        h6: {
            fontWeight: 500,
            fontSize: 15,
            color: "#212B36"
        },
    },
    // transitions: {
    //     duration: {
    //         shortest: 300,
    //         shorter: 500,
    //         short: 1000,
    //         // most basic recommended timing
    //         standard: 500,
    //         // this is to be used in complex animations
    //         complex: 750,
    //         // recommended when something is entering screen
    //         enteringScreen: 600,
    //         // recommended when something is leaving screen
    //         leavingScreen: 300,
    //     },
    // },
}

const useDarkMode = () => {
    const [theme, settheme] = useState<any>(themeOptions)
    const _mode = theme.palette.mode === 'light' ? 'light' : 'light'
    const toggleDarkMode = () => {
        const updatedTheme = {
            ...theme,
            palette: {
                ...theme.palette,
                mode: _mode
            }
        }
        settheme(updatedTheme)
    }
    return [theme, toggleDarkMode]
}

export const ThemeContext = createContext<any>(null);


export type MyThemeProviderProp = {
    children?: React.ReactNode;
}


export default function MyThemeProvider({ children }: MyThemeProviderProp) {
    const [theme, toggleDarkMode] = useDarkMode()
    const themeConfig = createTheme(theme)

    return (
        <ThemeContext.Provider value={{ onToggle: toggleDarkMode, theme: theme.palette.mode }}>
            <ThemeProvider theme={themeConfig}>
                {children}
            </ThemeProvider>
        </ThemeContext.Provider>
    )
}
