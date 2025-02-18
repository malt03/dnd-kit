/// <reference types="react" />
import { Action } from '../../store';
import type { DragStartEvent, DragCancelEvent, DragEndEvent, DragMoveEvent, DragOverEvent } from '../../types';
export interface Arguments {
    onDragStart?(event: DragStartEvent): void;
    onDragMove?(event: DragMoveEvent): void;
    onDragOver?(event: DragOverEvent): void;
    onDragEnd?(event: DragEndEvent): void;
    onDragCancel?(event: DragCancelEvent): void;
}
export interface DndMonitorState {
    type: Action | null;
    event: null | DragStartEvent | DragMoveEvent | DragOverEvent | DragEndEvent | DragCancelEvent;
}
export declare const DndMonitorContext: import("react").Context<DndMonitorState>;
export declare function useDndMonitor({ onDragStart, onDragMove, onDragOver, onDragEnd, onDragCancel, }: Arguments): void;
