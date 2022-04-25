import { Rect, getTransformAgnosticClientRect } from '../../utilities/rect';
export declare function useRects(elements: Element[], forceRecompute?: boolean, measure?: typeof getTransformAgnosticClientRect): Rect[];
