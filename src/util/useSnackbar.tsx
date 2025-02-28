// SnackbarContext.tsx

import React, { useState, useContext, useCallback, useMemo, createContext } from 'react';
import { MyThemeProviderProp } from '../layout/MyThemeProvider';
import SnackbarComponent from '../controls/Snackbar';

export type SnackbarMessage = {
    message: string;
    severity: 'success' | 'warning' | 'error' | 'info';
    position?: 'right' | 'left' | 'center';
};

type SnackbarContextValue = {
    showMessage: (message: SnackbarMessage) => void;
    hideMessage: () => void;
    message: SnackbarMessage | null;
};

export const SnackbarContext = createContext<SnackbarContextValue>({
    showMessage: () => {},
    hideMessage: () => {},
    message: null,
});

export const useSnackbar = () => useContext(SnackbarContext);

export const SnackbarProvider = ({ children }: MyThemeProviderProp) => {
    const [message, setMessage] = useState<SnackbarMessage | null>(null);

    const showMessage = useCallback((message: SnackbarMessage) => {
        setMessage(message);
    }, []);

    const hideMessage = useCallback(() => {
        setMessage(null);
    }, []);

    const contextValue = useMemo(() => ({ showMessage, hideMessage, message }), [showMessage, hideMessage, message]);

    return (
        <SnackbarContext.Provider value={contextValue}>
            {children}
            <SnackbarComponent /> {/* Include SnackbarComponent here */}
        </SnackbarContext.Provider>
    );
};