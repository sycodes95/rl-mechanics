import Icon from '@mdi/react';
import { mdiCircleOutline, mdiMinusCircleOutline, mdiCircleSlice4, mdiCrownCircleOutline } from '@mdi/js';

export const mechanicsStatusOptions: {[key: number]: { src : string, tooltip : string, color: string}} = {
  1 : {src : mdiMinusCircleOutline, tooltip: 'Not Learned', color: 'text-gray-400'},
  2 : {src : mdiCircleSlice4, tooltip: 'Inconsistent', color: 'text-yellow-400'},
  3 : {src : mdiCrownCircleOutline, tooltip: 'Consistent', color: 'text-green-400'},
}

export const mechanicsDifficultyOptions: {[key: number]: string} = {
  1 : 'Very Easy' ,
  2 : 'Easy',
  3 : 'Medium' ,
  4 : 'Hard',
  5 : 'Extreme',
};

export const mechanicsImportanceOptions: {[key: number]: string} = {
  1 : 'Ineffective',
  2 : 'Situational',
  3 : 'Beneficial',
  4 : 'Important',
  5 : 'Essential',
};

export const mechanicsTypeOptions: string[] = [
  'Aerial Takeoffs',
  'Aerial Movements',
  'Power Slides',
  'Wave Dashes',
  'Flips',
  'Basics',
  'Shooting',
  'Dribbling',
  'Flicks',
  'Pinches',
  'Kick Offs',
  'Air Dribbles',
  'Flip Reset',
  'Backboard',
  'Misc'
]



