import { useRef } from 'react';

/** Pass in a value you want to *never **ever*** change after first initialization. If value is non-primitive, the same instance will always be returned. */
export function useEternal<T>(value: T) {
    const { current } = useRef(value);
    return current;
}