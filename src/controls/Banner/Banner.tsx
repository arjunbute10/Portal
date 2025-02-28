import React, { useContext, useState, useCallback, useMemo } from 'react';
import clsx from 'clsx';
import hoistNonReactStatics from 'hoist-non-react-statics';
import './banner.scss';
import PrimaryButton from '../FormControls/PrimaryButton';
import Collapse from '../Collapse';

export type BannerAction = {
    actionName: string,
    actionFunc: () => void
};

export type BannerMessage = {
    /** Optional banner title */
    title?: string;
    /** Text or JSX to put in main body of banner */
    body: string | JSX.Element;
    /** Text to show only in non-production environments (raw error messages perhaps) */
    devText?: string;
    /** Banner color variant; defaults to 'info' */
    flavor?: 'info' | 'warning' | 'error' | 'success';
    /** Whether to show the Dismiss action; defaults to true */
    hasDismiss?: boolean;
    /** Optional additional actions to show buttons for in the banner */
    actions?: BannerAction[];
};

export function createOopsMessageWithDevText(devText?: string) {
    return {
        title: "Oops!",
        body: "We encountered an error trying to perform an operation.",
        flavor: 'error',
        hasDismiss: true,
        devText
    } as BannerMessage;
}

// Publically-consumed context
export type BannerContextValue = {
    push: (message: BannerMessage) => void;
    dismiss: () => void;
    handleApiResponse: (
        response: Response,
        overrides?: { [i: number]: (sepMessage: string) => BannerMessage | undefined },
        devMessage?: string,
    ) => void;
};

export const BannerContext = React.createContext<BannerContextValue>({ push: () => { }, dismiss: () => { }, handleApiResponse: () => { } });
BannerContext.displayName = 'BannerContext';

export const useBanner = () => useContext(BannerContext);

/** For internal context that's just used by the Banner component; ONLY IMPORT FOR TESTING */
export type InternalBannerContextValue = {
    message?: BannerMessage;
    show: boolean;
};

/** Internal context that's just used by the Banner component; ONLY IMPORT FOR TESTING */
export const InternalBannerContext = React.createContext<InternalBannerContextValue>({ show: false });
InternalBannerContext.displayName = "InternalBannerContext";

/** Creates a banner context for its descendants */
export function BannerProvider(props: { children: React.ReactNode }) {
    const [message, setMessage] = useState<BannerMessage>();
    const [show, setShow] = useState(false);

    const push = useCallback((message: BannerMessage) => {
        setMessage(message);
        setShow(true);
    }, []);

    const dismiss = useCallback(() => setShow(false), []);

    const handleApiResponse: BannerContextValue['handleApiResponse'] = useCallback(async (response, overrides, devMessage) => {
        // grab response body as text if sep-Message header is present
        const sepMessage = (response.headers && response.headers.get('sep-Message') === 'true') ? await response.json() : undefined;

        // if an override function is defined for this status code
        if (overrides && overrides[response.status]) {
            // then call it
            const message = overrides[response.status](sepMessage);

            if (message) // if it returned a BannerMessage object
                push(message); // then push it
        }
        else {
            if (response.ok) {
                if (sepMessage)
                    push({ body: sepMessage });
            } else if (sepMessage) {
                push({ body: sepMessage, flavor: 'error' });
            } else {
                // standard banners by status code
                switch (response.status) {
                    case 401:
                    case 403:
                        push({ title: "Access Denied!", body: "Your access has been forbidden. Unauthorized!", flavor: 'error' });
                        break;
                    case 200:
                    case 201:
                        push({ title: "Yay", body: devMessage ? devMessage : 'Request Successful', flavor: 'success' });
                        break;
                    case 204:
                        push({ title: "Bad Request", body: devMessage ? devMessage : 'Request Unsuccessful', flavor: 'warning' });
                        break;
                    default:
                        if (response.status)
                            push(createOopsMessageWithDevText(response.status.toString() + ' ' + response.statusText));
                        else // not actually a Response object?
                            push(createOopsMessageWithDevText(response.toString()));
                }
            }
        }
    }, [push]);

    const bannerContextValue = useMemo(() => ({ push, dismiss, handleApiResponse }), [push, dismiss, handleApiResponse]);

    return (
        <InternalBannerContext.Provider value={{ message, show }}>
            <BannerContext.Provider value={bannerContextValue}>
                {props.children}
            </BannerContext.Provider>
        </InternalBannerContext.Provider>
    );
}

/** HOC to add BannerProvider around something */
export function withBannerSupport<InnerComponentProps extends object>(InnerComponent: React.ComponentType<InnerComponentProps>) {

    if (InnerComponent === undefined) {
        throw new Error('You are calling withBannerSupport with an undefined component.\nYou may have forgotten to import it.');
    }

    // React.forwardRef is what I see other high-order components doing, so we're jumping off the bridge too
    const WithBannerSupport = React.forwardRef(function (props: InnerComponentProps, ref) {
        return (
            <BannerProvider>
                <InnerComponent ref={ref} {...props} />
            </BannerProvider>
        );
    });
    WithBannerSupport.displayName = "WithBannerSupport";

    // hoistNonReactStatics is what I see other high-order components doing, so we're jumping off the bridge too
    hoistNonReactStatics(WithBannerSupport, InnerComponent);

    // add reference to InnerComponent as a 'static' property to help with unit testing
    type WithInnerComponentRef = typeof WithBannerSupport & { InnerComponent: typeof InnerComponent };

    return WithBannerSupport as WithInnerComponentRef;
};


export interface DumbBannerProps extends React.HTMLAttributes<HTMLElement> {
    message: BannerMessage,
    show: boolean,
    fullBorder?: boolean,
    onDismiss: () => void,
}
/** Mostly-internal "dumb" component used by Banner to do the actual banner-drawing */
export function DumbBanner(props: DumbBannerProps) {
    const { message, show, fullBorder, onDismiss, className: classNameProp, children, ...htmlProps } = props;
    const { title, body, devText, flavor = 'warning', hasDismiss = true, actions = [] } = message;
    const className = clsx(
        classNameProp,
        "sep-banner",
        `sep-banner--${flavor}`,
        { "sep-banner--full-border": fullBorder }
    );

    return (
        <Collapse data-test-id="banner" isOpen={show} className={className} {...htmlProps}>
            <div className="sep-banner__guts">
                <div className="sep-banner__content">
                    {title &&
                        <header data-test-id="banner-title" className={clsx("sep-banner__title", "text-body1")}>{title}</header>
                    }
                    <article data-test-id="banner-body" className={clsx("sep-banner__body", "text-body2")}>
                        {body}
                        {devText &&
                            <pre>{devText}</pre>
                        }
                    </article>
                </div>
                <div className="sep-banner__buttons">
                    {hasDismiss &&
                        <PrimaryButton variant={"outlined"} type="button" onClick={onDismiss} color={flavor} label="Dismiss" />
                    }
                    {actions.map((act, index) =>
                        <PrimaryButton variant={"outlined"} key={index} type="button" onClick={act.actionFunc} label={act.actionName} />
                    )}
                </div>
            </div>
        </Collapse>
    );
}

/**
 * This makes the banner appear. Put it where you want that to happen.  
 * Don't put more than one Banner inside a single BannerProvider; only one of the Banners will end up working (probably).
 */
export default function Banner() {
    const { dismiss } = useContext(BannerContext);
    const { message, show } = useContext(InternalBannerContext);

    return (
        <DumbBanner message={message || { body: "" }} show={show} onDismiss={dismiss} />
    );
}