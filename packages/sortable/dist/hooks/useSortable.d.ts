/// <reference types="react" />
import { UseDraggableArguments, UseDroppableArguments } from '@dnd-kit/core';
import type { SortingStrategy } from '../types';
import type { AnimateLayoutChanges, NewIndexGetter, SortableTransition } from './types';
export interface Arguments extends UseDraggableArguments, Pick<UseDroppableArguments, 'resizeObserverConfig'> {
    animateLayoutChanges?: AnimateLayoutChanges;
    getNewIndex?: NewIndexGetter;
    strategy?: SortingStrategy;
    transition?: SortableTransition | null;
}
export declare function useSortable({ animateLayoutChanges, attributes: userDefinedAttributes, disabled, data: customData, getNewIndex, id, strategy: localStrategy, resizeObserverConfig, transition, }: Arguments): {
    active: import("@dnd-kit/core").Active | null;
    activeIndex: number;
    attributes: import("@dnd-kit/core").DraggableAttributes;
    rect: import("react").MutableRefObject<import("@dnd-kit/core").ClientRect | null>;
    index: number;
    newIndex: number;
    items: string[];
    isOver: boolean;
    isSorting: boolean;
    isDragging: boolean;
    listeners: import("@dnd-kit/core/dist/hooks/utilities").SyntheticListenerMap | undefined;
    node: import("react").MutableRefObject<HTMLElement | null>;
    overIndex: number;
    over: import("@dnd-kit/core").Over | null;
    setNodeRef: (node: HTMLElement | null) => void;
    setDroppableNodeRef: (element: HTMLElement | null) => void;
    setDraggableNodeRef: (element: HTMLElement | null) => void;
    transform: import("@dnd-kit/utilities").Transform | null;
    transition: string | undefined;
};
