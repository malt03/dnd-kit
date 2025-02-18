import { Transform } from '@dnd-kit/utilities';
import type { UniqueIdentifier } from '../../../types';
import type { DraggableNodes } from '../../../store';
export interface DropAnimation {
    duration: number;
    easing: string;
    dragSourceOpacity?: number;
}
interface Arguments {
    activeId: UniqueIdentifier | null;
    animate: boolean;
    adjustScale: boolean;
    draggableNodes: DraggableNodes;
    duration: DropAnimation['duration'] | undefined;
    easing: DropAnimation['easing'] | undefined;
    dragSourceOpacity: DropAnimation['dragSourceOpacity'] | undefined;
    node: HTMLElement | null;
    transform: Transform | undefined;
}
export declare const defaultDropAnimation: DropAnimation;
export declare function useDropAnimation({ animate, adjustScale, activeId, draggableNodes, duration, dragSourceOpacity, easing, node, transform, }: Arguments): boolean;
export {};
