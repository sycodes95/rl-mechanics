
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
  mechanic_status_value: number,
  mech_difficulty: number,
  mech_importance: number,
  mech_type: string,
  rating_difficulty: number,
  rating_importance: number,
}

export type MechanicData = {
  mech_name: string;
  mech_description: string;
  mech_difficulty: number;
  mech_importance: number;
  mech_yt_url_controller: string;
  mech_yt_url_kbm: string;
  mech_url: string;
  mech_type: number;
}

export type Mechanic = {
  mech_id: number;
  mech_type: number;
  mech_name: string;
  mech_description: string;
  mech_difficulty: number;
  mech_importance: number;
  mech_created_at: string;
  mech_yt_url_controller: string;
  mech_yt_url_kbm: string;
  mech_url: string;
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