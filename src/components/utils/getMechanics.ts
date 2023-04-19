const getMechanics = (searchValue: string, filterValues: object[]) => {
  return fetch(`${import.meta.env.VITE_API_HOST_URL}/mechanics-get?searchValue=${searchValue}&filterValues=${JSON.stringify(filterValues)}`)
  .then(res => res.json())
  .then(data => {
    return data
  })
  .catch(err => {
    console.error(err);
  });
};

export default getMechanics;