
export type MechanicsStatusOptions = {
  [key: string] : { value : number, color: string };
}

export type MechanicsDifficultyOptions = {
  [key: string] : { value : number, color: string };
}

export type MechanicsImportanceOptions = {
  [key: string] : { value : number, color: string };
}

export type MechanicsTypeOptions = {
  [key: string] : { value : number };
}

export type FilterValues = {
  [key: string] : string;
}

export type DifficultyColors = {
  [key: string] : string
}

export type ImportanceColors = {
  [key: string] : string
}

export type IsDeleteOpen = {
  open: boolean;
  mech_id: null | number;
}

export type IsEditMechanicOpen = {
  open: boolean;
  mech_id: null | number;
}


// export type FilterValues = {
//   mechanic_status_value: string,
//   mech_difficulty: string,
//   mech_importance: string,
//   mech_type: string,
//   rating_difficulty: string,
//   rating_importance: string,
// }


export type MechanicData = {
  mech_name: string;
  mech_description: string;
  mech_difficulty: string;
  mech_importance: string;
  mech_yt_url_controller: string;
  mech_yt_url_kbm: string;
  mech_url: string;
  mech_type: string;
}

export type Mechanic = {
  mech_id: number;
  mech_type: string;
  mech_name: string;
  mech_description: string;
  mech_difficulty: string;
  mech_importance: string;
  mech_created_at: string;
  mech_yt_url_controller: string;
  mech_yt_url_kbm: string;
  mech_url: string;
}



type EditMechanicData = {
  mech_id: number;
  mech_name: string;
  mech_description: string;
  mech_difficulty: string;
  mech_importance: string;
  mech_yt_url_controller: string;
  mech_yt_url_kbm: string;
  mech_url: string;
  mech_type: string; 
}


//props

export type AddMechanicProps = {
  addMechanicIsOpenContext: {
    addMechanicIsOpen: boolean;
    setAddMechanicIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  };
}

export type MechanicsFiltersProps = {
  filterValuesContext: {
    filterValues: FilterValues;
    setFilterValues: React.Dispatch<React.SetStateAction<FilterValues>>;
  }
  searchValueContext: {
    searchValue:  string;
    setSearchValue: React.Dispatch<React.SetStateAction<string>>
  }
  userIsLoggedIn: boolean;
}

type EditMechanicProps = {
  editMechanicIsOpenContext: {
    editMechanicIsOpen: IsEditMechanicOpen;
    setEditMechanicIsOpen: React.Dispatch<React.SetStateAction<IsEditMechanicOpen>>;
  };
  mechanic: EditMechanicData
}