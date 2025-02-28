// Lovingly stolen and modified from https://github.com/reactstrap/reactstrap/blob/master/src/Collapse.js

import React from 'react';
import clsx from 'clsx';
import { Transition } from 'react-transition-group';
import { EnterHandler, ExitHandler } from 'react-transition-group/Transition';

import './collapse.scss';

const TransitionPropNames = [
    'in',
    'mountOnEnter',
    'unmountOnExit',
    'appear',
    'enter',
    'exit',
    'timeout',
    'onEnter',
    'onEntering',
    'onEntered',
    'onExit',
    'onExiting',
    'onExited',
];

const TransitionStatuses = {
    ENTERING: 'entering',
    ENTERED: 'entered',
    EXITING: 'exiting',
    EXITED: 'exited',
};
const transitionStatusToClassHash = {
    [TransitionStatuses.ENTERING]: 'collapse-animating',
    [TransitionStatuses.ENTERED]:  'collapse show',
    [TransitionStatuses.EXITING]:  'collapse-animating collapsing',
    [TransitionStatuses.EXITED]:   'collapse',
};

function getTransitionClass(status : string) {
    return transitionStatusToClassHash[status] || transitionStatusToClassHash[TransitionStatuses.EXITED];
}

function getHeight(node : HTMLElement) {
    return node.scrollHeight;
}

export interface CollapseProps extends React.HTMLProps<HTMLElement> {
    isOpen?: boolean;
    classNames?: string;
    tag?: any;
    navbar?: boolean;
    delay?: {
        show: number
        hide: number
    };
    onEntering?: EnterHandler<undefined>;
    onEntered?: EnterHandler<undefined>;
    onExit?: ExitHandler<undefined>;
    onExiting?: ExitHandler<undefined>;
    onExited?: ExitHandler<undefined>;
    innerRef?: React.RefObject<undefined>
}

export interface CollapseState {
    height: number | null
}

class Collapse extends React.Component<CollapseProps, CollapseState> {
    constructor(props: CollapseProps) {
        super(props);

        this.state = {
            height: null
        };

        this.onEntering = this.onEntering.bind(this);
        this.onEntered  = this.onEntered.bind(this);
        this.onExit     = this.onExit.bind(this);
        this.onExiting  = this.onExiting.bind(this);
        this.onExited   = this.onExited.bind(this);
    }

    static defaultProps = {
        ...(Transition as any).defaultProps,
        isOpen: false,
        appear: false,
        enter: true,
        exit: true,
        tag: 'div',
        timeout: 1000000
    };

    onEntering(node: HTMLElement, isAppearing: boolean) {
        this.setState({ height: getHeight(node) });
        // Add the "I'm opening" class here, AFTER the element is already visible (no longer display: none), so it can trigger additional CSS transitions if desired
        node.classList.add('expanding');
        this.props.onEntering!(node, isAppearing);
    };

    onEntered(node: HTMLElement, isAppearing: boolean) {
        this.setState({ height: null });
        this.props.onEntered!(node, isAppearing);
    }

    onExit(node: HTMLElement) {
        this.setState({ height: getHeight(node) });
        this.props.onExit!(node);
    }

    onExiting(node: HTMLElement) {
        // getting this variable triggers a reflow
        const _unused = node.offsetHeight; // eslint-disable-line @typescript-eslint/no-unused-vars
        this.setState({ height: 0 });
        this.props.onExiting!(node);
    }

    onExited(node: HTMLElement) {
        this.setState({ height: null });
        this.props.onExited!(node);
    }

    render() {
        const {
            tag,
            isOpen,
            className,
            navbar,
            children,
            innerRef,
            ...otherProps
        } = this.props;
        const Tag = tag || 'div';

        const { height } = this.state;

        const transitionProps = pick(otherProps, TransitionPropNames);
        const childProps = omit(otherProps, TransitionPropNames);
        return (
            <Transition
                {...transitionProps}
                in={isOpen}
                onEntering={this.onEntering}
                onEntered={this.onEntered}
                onExit={this.onExit}
                onExiting={this.onExiting}
                onExited={this.onExited}
            >
                {(status: string) => {
                    let collapseClass = getTransitionClass(status);

                    const classes = clsx(
                        className,
                        collapseClass,
                        navbar && 'navbar-collapse'
                    );

                    const style = (height === null) ? null : { height };
                    return (
                        <Tag
                            {...childProps}
                            style={{ ...childProps.style, ...style }}
                            className={classes}
                            ref={this.props.innerRef}
                            aria-expanded={isOpen ? 'true' : 'false'}
                        >
                            {children}
                        </Tag>
                    );
                }}
            </Transition>
        );
    }
}

export default Collapse;

// MAYBE TODO: put these methods in a shared location
/**
 * Returns a new object with the key/value pairs from `obj` that are not in the array `omitKeys`.
 */
/* export */ function omit(obj: {[key: string]: any}, omitKeys: string[]) {
    const result: any = {};
    Object.keys(obj).forEach(key => {
        if (!omitKeys.includes(key)) {
            result[key] = obj[key];
        }
    });
    return result;
}

/**
 * Returns a filtered copy of an object with only the specified keys.
 */
/* export */ function pick(obj: { [key: string]: any }, keys: string[]) {
    const pickKeys = Array.isArray(keys) ? keys : [keys];
    let length = pickKeys.length;
    let key;
    const result: any = {};

    while (length > 0) {
        length -= 1;
        key = pickKeys[length];
        result[key] = obj[key];
    }
    return result;
}