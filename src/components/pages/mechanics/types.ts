import { FilterValues } from "../../types/mechanics/types";

export type MechanicsStatusOptions = {
  [key: string] : { value : number, color: string};
}

export type MechanicsDifficultyOptions = {
  [key: string] : { value : number, color: string};
}

export type MechanicsImportanceOptions = {
  [key: string] : { value : number, color: string};
}







//props

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