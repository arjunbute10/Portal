import React, { useCallback, useContext, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ApiProvider } from '../fetch/ApiProvider';
import LocalStorageUtil from '../useLocalStorage';

type AuthContextFunctions = {
    logout: () => void,
    isAuthenticated?: boolean,
};

const stub = (): never => {
    throw new Error('You forgot to wrap your component in <AuthProvider>.');
};

const AuthContext = React.createContext<AuthContextFunctions>({ logout: stub});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = (props) => {

    const navigate = useNavigate();

    const logout = useCallback(() => {
        LocalStorageUtil.clear();
        navigate('/login');
    }, []);

    const isAuthenticated = !!LocalStorageUtil.getItem('access_token', true);

    const contextValue = useMemo(() => ({
        logout,
        isAuthenticated
    }), [logout, isAuthenticated]);



    return (
        <AuthContext.Provider value={contextValue}>
            <ApiProvider>
                {props.children}
            </ApiProvider>
        </AuthContext.Provider>

    );
};