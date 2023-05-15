import { MechanicsDifficultyOptions, MechanicsImportanceOptions, MechanicsStatusOptions, MechanicsTypeOptions } from "./types";

export const mechanicsStatusOptions : MechanicsStatusOptions = {
  'Consistent': { value : 2, color: 'text-blue-400'},
  'Inconsistent': { value : 1, color: 'text-yellow-400'},
  'Not Learned': { value : 0, color: 'text-gray-400'},
};

export const mechanicsDifficultyOptions: MechanicsDifficultyOptions = {
  'Insane': { value: 5, color: 'text-red-600'},
  'Hard': { value: 4, color: 'text-orange-400'},
  'Medium': { value: 3, color: 'text-yellow-400'},
  'Easy': { value: 2, color: 'text-green-400'},
  'Very Easy': { value: 1, color: 'text-blue-400'},
};

export const mechanicsImportanceOptions: MechanicsImportanceOptions = {
  'Essential': { value: 5, color: 'text-gray-100'},
  'Important': { value: 4, color: 'text-gray-200'},
  'Situational': { value: 3, color: 'text-gray-300'},
  'Not Needed': { value: 2, color: 'text-gray-400'},
  'Not Useful': { value: 1, color: 'text-gray-500'},
};

export const mechanicsTypeOptions: MechanicsTypeOptions = {
  'Aerial Takeoffs': {value: 1},
  'Aerial Movements': {value: 2},
  'Power Slides': {value: 3},
  'Wave Dashes': {value: 4},
  'Flips': {value: 5},
  'Basics': {value: 6},
  'Shooting': {value: 7},
  'Dribbling': {value: 8},
  'Flicks': {value: 9},
  'Pinches': {value: 10},
  'Kick Offs': {value: 11},
  'Air Dribbles': {value: 12},
  'Flip Reset': {value: 13},
  'Backboard': {value: 14}

}

// export const mechanicsTypeOptions: string[] = [
//   'Aerial Takeoffs', 'Aerial Movements', 'Power Slides', 
//   'Wave Dashes', 'Flips', 'Basics', 'Shooting',
//   'Dribbling', 'Flicks', 'Pinches', 'Kick Offs',
//   'Air Dribbles', 'Flip Reset', 'Backboard'
// ]