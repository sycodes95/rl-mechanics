import { MechanicsDifficultyOptions, MechanicsImportanceOptions, MechanicsStatusOptions, MechanicsTypeOptions } from "./types";

export const mechanicsStatusOptions : string[] = [
  'Consistent',
  'Inconsistent',
  'Not Learned',
];

export const mechanicsDifficultyOptions = [
  { name: 'Very Easy', value: 1 },
  { name: 'Easy', value: 2 },
  { name: 'Medium', value: 3 },
  { name: 'Hard', value: 4 },
  { name: 'Insane', value: 5 },
];

export const mechanicsImportanceOptions: string[] = [
  'Essential',
  'Important',
  'Situational',
  'Not Needed',
  'Not Useful',
];

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
]

// export const mechanicsTypeOptions: string[] = [
//   'Aerial Takeoffs', 'Aerial Movements', 'Power Slides', 
//   'Wave Dashes', 'Flips', 'Basics', 'Shooting',
//   'Dribbling', 'Flicks', 'Pinches', 'Kick Offs',
//   'Air Dribbles', 'Flip Reset', 'Backboard'
// ]