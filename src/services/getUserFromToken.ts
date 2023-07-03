

// const getUserFromToken = () => {
//   const token = localStorage.getItem('rlmechanics_token');

//   if(!token) return null;

//   return fetch(`${import.meta.env.VITE_API_HOST_URL}/users/verify-token-get`, {
//     method: 'GET',
//     headers: { 'authorization': `Bearer ${token}` }
//   })
//   .then(response => response.json())
//   .then(data => {
//     const userDetails =  data.user.user.rows[0]
//     delete userDetails.user_password
//     return userDetails;
//   })
//   .catch(error => {
//     console.error('Error:', error);
//   });
// };

const getUserFromToken = () => {

  return fetch(`${import.meta.env.VITE_API_HOST_URL}/users/verify-token-get`, {
    credentials: 'include'
  }) 
  .then(response => response.json())
  .then(data => {
    console.log(data);
    if(data && data.user){
      return data.user
    }
  })
  .catch(error => {
    console.error('Error:', error);
  });
};

export default getUserFromToken;