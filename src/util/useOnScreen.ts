// props to https://stackoverflow.com/a/65008608

import React, { useState, useEffect, useMemo, useRef } from 'react';

export function useOnScreen<T extends Element = Element>(): [boolean, React.RefObject<T>, () => void] {
    const [isIntersecting, setIntersecting] = useState(false);
    const [flip, setFlip] = useState(false);
    const ref = useRef<Element>(null);

    const observer = useMemo(() =>
        new IntersectionObserver(([entry]) => setIntersecting(entry.isIntersecting))
    , []);

    useEffect(() => {
        if (ref.current)
            observer.observe(ref.current);

        // Remove the observer as soon as the component is unmounted
        return () => observer.disconnect();
    }, [observer, flip]);

    const reset = () => {
        setFlip(!flip);
        setIntersecting(false);
    };

    return [isIntersecting, ref as any, reset];
}
