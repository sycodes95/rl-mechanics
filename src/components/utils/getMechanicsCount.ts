
const getMechanicsCount = () => {
  return fetch(`${import.meta.env.VITE_API_HOST_URL}/mechanics-count-get`)
  .then(res => res.json())
  .then(data => {
    console.log(data);
    if(data && data.count) return data.count
  })
  .catch(err => {
    console.error(err);
  });
};

export default getMechanicsCount;
