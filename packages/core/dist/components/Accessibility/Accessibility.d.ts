import React from 'react';
import type { Announcements, ScreenReaderInstructions } from './types';
import type { UniqueIdentifier } from '../../types';
interface Props {
    announcements?: Announcements;
    screenReaderInstructions: ScreenReaderInstructions;
    hiddenTextDescribedById: UniqueIdentifier;
}
export declare function Accessibility({ announcements, hiddenTextDescribedById, screenReaderInstructions, }: Props): React.ReactPortal | null;
export {};
