import React from 'react';
import { ClientRect, UniqueIdentifier } from '@dnd-kit/core';
import type { SortingStrategy } from '../types';
export interface Props {
    children: React.ReactNode;
    items: (UniqueIdentifier | {
        id: UniqueIdentifier;
    })[];
    strategy?: SortingStrategy;
    id?: string;
}
interface ContextDescriptor {
    activeIndex: number;
    containerId: string;
    disableTransforms: boolean;
    items: UniqueIdentifier[];
    overIndex: number;
    useDragOverlay: boolean;
    sortedRects: ClientRect[];
    strategy: SortingStrategy;
}
export declare const Context: React.Context<ContextDescriptor>;
export declare function SortableContext({ children, id, items: userDefinedItems, strategy, }: Props): JSX.Element;
export {};
