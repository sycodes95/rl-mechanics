
const getUserFromToken = () => {

  const token = localStorage.getItem('rlmechanics_token')

  if(!token) return null

  if(token){

    fetch(`${import.meta.env.VITE_API_HOST_URL}/users/verify-token-get`, {
      method: 'GET',
      headers: { 'authorization': `Bearer ${token}` }
    })
    .then(response => response.json())
    .then(data =>{
      console.log(data);
      const userDetails =  data.user.user.rows[0]
      return userDetails;
    })
    

    
  }

  
}

export default getUserFromToken;