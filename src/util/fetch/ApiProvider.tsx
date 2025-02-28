import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import React, { useCallback, useContext, useEffect } from 'react';
import LocalStorageUtil from '../useLocalStorage';
import { useAuth } from '../auth/AuthProvider';


export type CallApiType = <TResponseBody = any>(config: Config<TResponseBody>) => Promise<TResponseBody>;

// eslint-disable-next-line
export interface Config<TResponseBody = any> {
    endpoint: string,
    method?: Method,
    body?: object | Blob | FormData | string,
    headers?: Headers,
    returnResponseObject?: boolean,
    signal?: AbortSignal
    url?: string
}

export enum Method {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE',
    PATCH = 'PATCH'
}

export type ApiContextType = {
    callApi: CallApiType, 
    externalCallApi: CallApiType
};

const stub = (): never => {
    throw new Error('You forgot to wrap your component in <ApiProvider>.');
};

/** Get access to methods provided by the ApiContext */
export const useApi = () => useContext(ApiContext);

export const ApiContext = React.createContext<ApiContextType>({ callApi: stub, externalCallApi: stub });

// Determines if we need to convert a config body to a JSON string
function isJson(obj: Config['body']) {
    return !isBody(obj);
}

// Determines if a config body can be submitted as the body of a request
function isBody(obj: Config['body']): obj is (Blob | FormData | string) {
    return obj instanceof Blob || obj instanceof FormData || typeof obj === 'string';
}

export const ApiProvider: React.FC<{ children: React.ReactNode }> = (props) => {
    const { logout } = useAuth();

    const callApi = useCallback(async <TResponseBody extends any = any>(config: Config<TResponseBody>): Promise<TResponseBody> => {
        try {
            let url = 'https://ajni.sundeus.com/portal' + config.endpoint;
            let method = config.method || Method.GET;
            let headers = config.headers || new Headers();
            let returnResponse = config.returnResponseObject || false;
            const decryptedToken = LocalStorageUtil.getItem('access_token', true);

            headers.append('authorization', decryptedToken);

            if (method !== Method.GET && isJson(config.body) && !headers.has('content-type')) {
                headers.append('content-type', 'application/json');
            }
            try {
                const response = await fetch(url, {
                    method: method,
                    body: isBody(config.body) ? config.body : JSON.stringify(config.body),
                    headers: headers,
                    signal: config.signal
                });
                
                if (response.ok) {
                    return returnResponse ? response : response.json();
                } else if (response && response.status === 401) {
                    logout(); // Token is expired, perform logout
                    throw response;
                } else {
                    throw response;
                }
            } catch (err) {
                throw err; // pass the error up to the caller
            }
        } catch (err: any) {
            throw err;
        }
    }, []);

    const externalCallApi = useCallback(async <TResponseBody extends any = any>(config: Config<TResponseBody>): Promise<TResponseBody> => {
        try {
            let url = config.endpoint;
            let method = config.method || Method.GET;
            let headers = config.headers || new Headers();
            let returnResponse = config.returnResponseObject || false;

            if (method !== Method.GET && isJson(config.body) && !headers.has('content-type')) {
                headers.append('content-type', 'application/json');
            }
            try {
                const response = await fetch(url, {
                    method: method,
                    body: isBody(config.body) ? config.body : JSON.stringify(config.body),
                    headers: headers,
                    signal: config.signal
                });

                if (response.ok) {
                    return returnResponse ? response : response.json();
                } else {
                    throw response;
                }
            } catch (err) {
                throw err; // pass the error up to the caller
            }
        } catch (err: any) {
            throw err;
        }
    }, []);

    return (
        <ApiContext.Provider
            value={{
                callApi,
                externalCallApi
            }}
        >
            {props.children}
        </ApiContext.Provider>
    );
};

/** Swallow AbortError responses, otherwise throw */
export const ignoreAbort = (error: any): void => {
    if (error?.name !== 'AbortError') throw error;
};

/** A useEffect hook that provides a wrapped version of the callApi method that aborts the GET if the component is unmounted */
export const useApiEffect = (func: (callApi: CallApiType, eatAbort: typeof ignoreAbort) => void | (() => void | undefined), deps: React.DependencyList) => {
    const { callApi } = useApi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    func = useCallback(func, deps);

    useEffect(() => {
        const abortCtrl = new AbortController();
        const wrappedCallApi = <TResponseBody extends any = any>(config: Config<TResponseBody>) => callApi<TResponseBody>({ ...config, signal: abortCtrl.signal });

        const funcCleanUp = func(wrappedCallApi, ignoreAbort);

        return () => {
            funcCleanUp && funcCleanUp();
            abortCtrl.abort();
        };
    }, [func, callApi]);
};