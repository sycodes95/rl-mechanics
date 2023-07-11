import withAuth from "../../hocs/withAuth";

import { useEffect, useState } from "react";
import { ReactSVG } from "react-svg";
import { Oval } from "react-loader-spinner";
import twodown from "../../assets/svgs/twodown.svg"
import googlesvg from "../../assets/svgs/googlelogo.svg"

type DecodedJwt = {
  email: string;
  family_name: string;
  given_name: string;
  picture: string;
}

type GoogleUserData = {
  user_email : string;
  user_first_name : string;
  user_last_name : string;
  user_picture: string
}

function Login (){

  const [isFetching, setIsFetching] = useState(false);

  const [errorMsgs, setErrorMsgs] = useState<string[]>([]);

  const [loginSuccess, setLoginSuccess] = useState(false);
  
  const [loginData, setLoginData] = useState({
    user_email: "",
    user_password: ""
  })

  const handleInputChange = (e: any) => {
    //reset error msgs to empty array on any input change
    setErrorMsgs([])

    const { name, value } = e.target

    setLoginData({...loginData, [name]: value})
  };

  const handleLoginSubmit = (e:any) => {
    e.preventDefault()
    
    setIsFetching(true)

    fetch(`${import.meta.env.VITE_API_HOST_URL}/users/log-in-post`, {
      method: 'POST',
      body: JSON.stringify(loginData),
      headers: { 'Content-Type': 'application/json'},
      credentials: 'include',
    })
    .then(response => response.json())
    .then(data => {
      setIsFetching(false)
      if(data.status === 'Logged in'){
        setLoginSuccess(true)
        setTimeout(()=>{
          window.location.href = '/'
        },1000)
      } else if (!errorMsgs.includes('Invalid email or password')){
        setErrorMsgs([...errorMsgs, 'Invalid email or password'])
      }
      
    })
  }

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_HOST_URL}/users/verify-token-get`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })
    .then(response => response.json())
    .then(data => {
      if (data.message === 'User authorized') {
        // The user is already authenticated, so redirect them to the home page
        window.location.href = '/';
      }
    })
    .catch(error => {
      // Handle error
      console.error('Error:', error);
    });
  }, []);
  
  return (
    <div className="absolute top-0 left-0 flex items-center justify-center flex-grow w-full h-full p-4 ">
      <div className="flex items-center justify-center h-full max-w-5xl">
      
    
        <form className="flex flex-col gap-4 p-6 bg-black rounded-md bg-opacity-40 sm:w-96 w-95pct">
          <div className="flex justify-center w-full">   
            <ReactSVG className="text-white fill-current "  src={twodown}/>
            
          </div>
          <div className="p-2 text-xl font-bold text-center text-white rounded-md font-tracks">LOG IN</div>
          
          <input className="p-2 text-xs text-white transition-all duration-200 bg-black bg-opacity-25 rounded-md caret-white outline-1 outline outline-gray-800 focus:outline-white" 
          name="user_email" type="text" value={loginData.user_email} placeholder="EMAIL"
          required 
          onChange={handleInputChange}/>

          <input className="p-2 text-xs text-white transition-all duration-200 bg-black bg-opacity-25 rounded-md caret-white outline-1 outline outline-gray-800 focus:outline-white" 
          name="user_password" type="password" value={loginData.user_password} 
          placeholder="PASSWORD" required
          
          onChange={handleInputChange}/>

          

          <button className="flex items-center justify-center h-8 p-1 text-sm text-white transition-all bg-gray-700 rounded-md hover:bg-gray-400 hover:text-gray-600" onClick={handleLoginSubmit}>
            {
            isFetching &&
            <Oval
            height={20}
            width={20}
            color="#000000"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            ariaLabel='oval-loading'
            secondaryColor="#111111"
            strokeWidth={6}
            strokeWidthSecondary={6}
            />
            }
            {
            loginSuccess && 
            <p className="font-bold text-green-400">SUCCESS!</p>
            }

            {
            !isFetching && !loginSuccess &&
            <p className="font-bold">SUBMIT</p>
            }
          </button>

          
          
          {
          errorMsgs.length !== 0 &&
          <div>
          {
          errorMsgs.map((msg:string, index:number)=>(
            <p className="text-xs text-red-500" key={index}>{msg}</p>
          ))
          }
          </div>
          }

          <p className="flex justify-center text-xs text-white">OR</p>

          <button className="flex items-center h-10 gap-4 p-4 text-sm text-gray-800 bg-white rounded-lg" onClick={(e)=> { 
            e.preventDefault()
            window.location.href = (`${import.meta.env.VITE_API_HOST_URL}/auth/google`)
            }}>
            <ReactSVG className="" src={googlesvg} />
            <p className="text-gray-600 text-md">Continue with Google</p>
          </button>
          
          {/* <GoogleOAuthProvider clientId="295251041006-7lh05dk3lu2q3dpqog9tcqo7b6g13h10.apps.googleusercontent.com">
            <GoogleLogin
            onSuccess={credentialResponse => {
              const userDetails = jwt_decode(credentialResponse.credential ?? '') as DecodedJwt;
              if(userDetails) {
                const userData = {
                  user_email: userDetails.email,
                  user_first_name : userDetails.given_name,
                  user_last_name : userDetails.family_name,
                  user_picture : userDetails.picture
                }
                signInWithGoogle(userData)
              }
            }}
            
            
            onError={()=> { console.log('Login Faild ')}}/>
          </GoogleOAuthProvider>
           */}
          
        </form>
        
      </div>
    </div>
  )
}
export default withAuth(Login);