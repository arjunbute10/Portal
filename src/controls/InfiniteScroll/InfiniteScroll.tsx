
import React, { useEffect, useState } from 'react';
import { useOnScreen } from '../../util/useOnScreen';
import clsx from 'clsx';
import styles from './InfiniteScroll.module.scss';
import Loading from '../loading/Loading';

export interface InfiniteScrollProps {
    initialCount?: number,
    increaseCount?: number,
    items: React.ReactElement[],
    sentinal?: SentinalOptions,
}

const showDebug = false;

const Sentinal: React.FC<{isVisible: boolean,children: React.ReactNode, options?: SentinalOptions}> = ({isVisible, children, options}) => {
    const className = clsx(styles.loadContainer, {[styles.visible]: isVisible || showDebug, [styles.debug]: showDebug});
    if (options?.type === 'tr') return <tr className={className}><td colSpan={options.colSpan}>{children}</td></tr>;
    return <div className={className}>{children}</div>;
};

type SentinalOptions = DivSentinalOptions | TrSentinalOptions;

type DivSentinalOptions = {
    type: 'div'
};

type TrSentinalOptions = {
    type: 'tr',
    colSpan?: number,
};


const InfiniteScroll: React.FC<InfiniteScrollProps> = ({initialCount, increaseCount, items, sentinal}) => {
    sentinal = sentinal || {type: 'div'};
    increaseCount = increaseCount || items.length;
    initialCount = initialCount || increaseCount;

    // Current number of items shown
    const [length, setLength] = useState(initialCount);

    // keep track of when component is first visible, so we can wait until then to render the Sparkline
    const [onScreen, sentinalRef, resetOnScreen] = useOnScreen<HTMLDivElement>();
    useEffect(() => {
        if (!increaseCount || length > items.length) {
            setLength(Math.max(initialCount || 0, items.length));
        }
        else if (initialCount && length < initialCount && items.length >= initialCount) {
            setLength(initialCount);
        }
        else if (onScreen && length < items.length) {
            const newLength = Math.min(length + (increaseCount || items.length), items.length);
            if (newLength !== length) {
                    setLength(newLength);
                    resetOnScreen();
            }
        }

    }, [onScreen, increaseCount, items, length, resetOnScreen, initialCount]);

    return <>
        {items.filter((_, index) => index < length)}
        <Sentinal options={sentinal} isVisible={length < items.length}>
            <div ref={sentinalRef} className={clsx(styles.loadGuard)} />
            <Loading className={clsx(styles.loadingIndicator)}  />
        </Sentinal>
        {/* <Sentinal options={sentinal} isVisible={length > items.length}>
            <div ref={sentinalRef} className={clsx(styles.loadGuard)} />
            No
        </Sentinal> */}
    </>;
};

export default InfiniteScroll;