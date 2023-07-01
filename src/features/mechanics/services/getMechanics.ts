import { user_details } from "../../../types/user_details";

export const getMechanics = (
  debouncedSearch: string, 
  filterValues: { [key: string] : string | number }, 
  sortColumn: { column: null | string,  value: boolean }, 
  paginationData: any,
  user_details: user_details | null
  ) => {
  return fetch(
  `${import.meta.env.VITE_API_HOST_URL}/mechanics-get?searchValue=${debouncedSearch}&filterValues=${JSON.stringify(filterValues)}&sortColumn=${JSON.stringify(sortColumn)}&paginationData=${JSON.stringify(paginationData)}&user_id=${user_details ? user_details.user_id : null}`)
  .then((res) => res.json())
  .then((data) => {
    if (data && data.mechanics && data.count) {
      return data;
    } else {
      return [];
    }
  });
  
    
};