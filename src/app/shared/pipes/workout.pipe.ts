import { Pipe, PipeTransform } from '@angular/core';
import { Workout } from 'src/interfaces/Workout';

@Pipe({
  name: 'workout'
})
export class WorkoutPipe implements PipeTransform {

  transform(value: Workout, args?: any): any {
    if (value.type === 'endurance') {
      return `
      ${value.endurance['distance'] ? 'Distance: ' + value.endurance['distance'] + ', ' : ''}
        ${value.endurance['duration'] ? 'Duration: ' + value.endurance['duration'] : ''}
        `;
    } else {
      return `${value.strength['weight'] ? 'Weight: ' + value.strength['weight'] + ', ' : ''}
        ${value.strength['reps'] ? 'Reps: ' + value.strength['reps'] + ', ' : ''}
          ${value.strength['sets'] ? 'Sets: ' + value.strength['sets'] : ''} `;
    }
  }

}
