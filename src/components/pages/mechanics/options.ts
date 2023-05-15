import { MechanicsDifficultyOptions, MechanicsImportanceOptions, MechanicsStatusOptions, MechanicsTypeOptions } from "./types";

export const mechanicsStatusOptions : MechanicsStatusOptions = {
  'Consistent': { value : 2, color: 'text-blue-400'},
  'Inconsistent': { value : 1, color: 'text-yellow-400'},
  'Not Learned': { value : 0, color: 'text-gray-400'},
};

export const mechanicsDifficultyOptions: string[] = [
  'Insane',
  'Hard',
  'Medium',
  'Easy',
  'Very Easy',
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