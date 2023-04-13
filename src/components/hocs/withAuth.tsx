import React from "react";
import { useNavigate } from "react-router-dom";

const withAuth = (Component: any) => {
  const AuthComponent = (props: any) => {
    const navigate = useNavigate();
    const token = localStorage.getItem("rlmechanics_token") as string;
    
    if (token) {
      console.log('token');
      navigate("/");
      return null;
      
    } else {
      console.log('com'); 
      return <Component {...props} />;
    }
    
  };

  return AuthComponent;
};

export default withAuth;