
export const getMechUrls = () => {
  return fetch(`${import.meta.env.VITE_API_HOST_URL}/mechanics-urls-get`)
    .then(res => res.json())
    .then(data => {
      return data.urls
    })
    .catch((err) => {
      console.error(err)
    })
}