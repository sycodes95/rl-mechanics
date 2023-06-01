

const handleLogOut = () => {
  const token = localStorage.getItem('rlmechanics_token');
  fetch(`${import.meta.env.VITE_API_HOST_URL}/users/log-out-get`,{
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
  .then(response => response.json())
  .then(() => {
    localStorage.removeItem('rlmechanics_token');
    window.location.href = '/';
  })
  .catch(error => {
    console.error(error);
  });
  
}

export default handleLogOut;