import { FilterValues } from "../../types/mechanics/types";

export type MechanicsStatusOptions = {
  [key: string] : number;
}

export type MechanicsDifficultyOptions = {
  [key: string] : number;
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
}