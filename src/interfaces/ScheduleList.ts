import { ScheduleItem } from './ScheduleItem';

export interface ScheduleList {
    morning?: ScheduleItem;
    lunch?: ScheduleItem;
    evening?: ScheduleItem;
    sncaks?: ScheduleItem;
    [key: string]: any;
}
