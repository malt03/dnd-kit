import React from 'react';
import { Modifiers } from '../../modifiers';
import { DropAnimation } from './hooks';
declare type TransitionGetter = (activatorEvent: Event | null) => React.CSSProperties['transition'] | undefined;
export interface Props {
    adjustScale?: boolean;
    children?: React.ReactNode;
    className?: string;
    dropAnimation?: DropAnimation | null | undefined;
    style?: React.CSSProperties;
    transition?: string | TransitionGetter;
    modifiers?: Modifiers;
    wrapperElement?: keyof JSX.IntrinsicElements;
    zIndex?: number;
}
export declare const DragOverlay: React.MemoExoticComponent<({ adjustScale, children, dropAnimation, style: styleProp, transition, modifiers, wrapperElement, className, zIndex, }: Props) => JSX.Element | null>;
export {};
