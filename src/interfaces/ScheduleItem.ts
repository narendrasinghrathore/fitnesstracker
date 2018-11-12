import { Meal } from './Meal';
import { Workout } from './Workout';

export interface ScheduleItem {
    meals?: Meal[];
    workouts?: Workout[];
    section?: string;
    timestamp?: number;
    key?: string;
}
