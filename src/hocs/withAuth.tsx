import React from "react";
import { useNavigate } from "react-router-dom";
import getUserFromToken from "../services/getUserFromToken";
import { useSelector } from "react-redux";
import { RootState } from "../store";

// const withAuth = (Component: any) => {
//   const AuthComponent = (props: any) => {
//     const token = localStorage.getItem("rlmechanics_token") as string;
    
//     if (token) {
//       window.location.href = '/'
//       return null;
      
//     } else {
//       return <Component {...props} />;
//     }
    
//   };

//   return AuthComponent;
// };

const withAuth = (Component: any) => {
  const AuthComponent = (props: any) => {
    const { user_details } = useSelector((state : RootState) => state.userSlice) 
    if (user_details?.user_id) {
      window.location.href = '/'
      return null;
      
    } else {
      return <Component {...props} />;
    }
    
  };
  return AuthComponent;
};

export default withAuth;