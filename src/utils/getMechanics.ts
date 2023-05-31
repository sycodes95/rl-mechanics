import { ColumnSortOrder, FilterData, SelectedSortColumn, PaginationData } from "../types/mechanicsAdmin/types";

const getMechanics = (searchValue: string, filterValues: FilterData | null, selectedSortColumn: SelectedSortColumn, paginationData: PaginationData) => {
  return fetch(`${import.meta.env.VITE_API_HOST_URL}/mechanics-get?searchValue=${searchValue}&filterValues=${JSON.stringify(filterValues)}&selectedSortColumn=${JSON.stringify(selectedSortColumn)}&paginationData=${JSON.stringify(paginationData)}`)
  .then(res => res.json())
  .then(data => {
    console.log(data);
    if(data && data.mechanics && data.count) return data
  })
  .catch(err => {
    console.error(err);
  });
};

export default getMechanics;