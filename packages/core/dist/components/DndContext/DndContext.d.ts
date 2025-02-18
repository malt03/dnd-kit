import React from 'react';
import { Transform } from '@dnd-kit/utilities';
import type { AutoScrollOptions, DroppableMeasuring } from '../../hooks/utilities';
import { SensorDescriptor } from '../../sensors';
import { CollisionDetection } from '../../utilities';
import { Modifiers } from '../../modifiers';
import type { ClientRect, DragStartEvent, DragCancelEvent, DragEndEvent, DragMoveEvent, DragOverEvent } from '../../types';
import { Announcements, ScreenReaderInstructions } from '../Accessibility';
export interface Props {
    id?: string;
    autoScroll?: boolean | AutoScrollOptions;
    announcements?: Announcements;
    cancelDrop?: CancelDrop;
    children?: React.ReactNode;
    collisionDetection?: CollisionDetection;
    measuring?: MeasuringConfiguration;
    modifiers?: Modifiers;
    screenReaderInstructions?: ScreenReaderInstructions;
    sensors?: SensorDescriptor<any>[];
    onDragStart?(event: DragStartEvent): void;
    onDragMove?(event: DragMoveEvent): void;
    onDragOver?(event: DragOverEvent): void;
    onDragEnd?(event: DragEndEvent): void;
    onDragCancel?(event: DragCancelEvent): void;
}
interface Measuring {
    measure(node: HTMLElement): ClientRect;
}
export interface DraggableMeasuring extends Measuring {
}
export interface DragOverlayMeasuring extends Measuring {
}
export interface MeasuringConfiguration {
    draggable?: Partial<DraggableMeasuring>;
    droppable?: Partial<DroppableMeasuring>;
    dragOverlay?: Partial<DragOverlayMeasuring>;
}
export interface CancelDropArguments extends DragEndEvent {
}
export declare type CancelDrop = (args: CancelDropArguments) => boolean | Promise<boolean>;
export declare const ActiveDraggableContext: React.Context<Transform>;
export declare const DndContext: React.NamedExoticComponent<Props>;
export {};
