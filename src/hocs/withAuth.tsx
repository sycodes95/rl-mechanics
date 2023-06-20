import React from "react";
import { useNavigate } from "react-router-dom";

const withAuth = (Component: any) => {
  const AuthComponent = (props: any) => {
    const token = localStorage.getItem("rlmechanics_token") as string;
    
    if (token) {
      window.location.href = '/'
      return null;
      
    } else {
      return <Component {...props} />;
    }
    
  };

  return AuthComponent;
};

export default withAuth;