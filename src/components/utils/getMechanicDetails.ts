

const getMechanicDetails = (mech_url: string) => {
  return fetch(`${import.meta.env.VITE_API_HOST_URL}/mechanic-details-get?mech_url=${mech_url}`)
  .then(res => res.json())
  .then(data => {
    if(data && data.details) return data.details
  })
}

export default getMechanicDetails;