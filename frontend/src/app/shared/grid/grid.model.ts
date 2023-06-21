import { GridActions } from './grid.constant';

export interface GridPayload {
    action: GridActions;
    data: string | GridItem;
}

export interface GridItem {
    id: string;
    text: string;
}