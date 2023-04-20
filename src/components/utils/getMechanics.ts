import { FilterData } from "../pages/mechanicsAdmin/admin";

const getMechanics = (searchValue: string, filterValues: FilterData | null) => {
  return fetch(`${import.meta.env.VITE_API_HOST_URL}/mechanics-get?searchValue=${searchValue}&filterValues=${JSON.stringify(filterValues)}`)
  .then(res => res.json())
  .then(data => {
    if(data && data.mechanics) return data.mechanics
  })
  .catch(err => {
    console.error(err);
  });
};

export default getMechanics;