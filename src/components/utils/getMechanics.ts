import { ColumnSortOrder, FilterData, SelectedSortColumn } from "../types/mechanicsAdmin/types";

const getMechanics = (searchValue: string, filterValues: FilterData | null, selectedSortColumn: SelectedSortColumn) => {
  return fetch(`${import.meta.env.VITE_API_HOST_URL}/mechanics-get?searchValue=${searchValue}&filterValues=${JSON.stringify(filterValues)}&selectedSortColumn=${JSON.stringify(selectedSortColumn)}`)
  .then(res => res.json())
  .then(data => {
    if(data && data.mechanics) return data.mechanics
  })
  .catch(err => {
    console.error(err);
  });
};

export default getMechanics;