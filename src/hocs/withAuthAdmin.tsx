import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import getUserFromToken from "../utils/getUserFromToken";

interface UserDetails {
  user_id: number;
  user_email: string;
  user_first_name: string;
  user_last_name: string;
  user_is_admin: boolean;
  user_if_verified: boolean;
  user_created_at: string;
}

const withAuthAdmin = (Component: any) => {
  const AuthComponent = (props: any) => {
    const navigate = useNavigate();

    const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
    
    useEffect(() => {
      const fetchUserDetails = async () => {
        try {
          const data = await getUserFromToken();
          setUserDetails(data);
        } catch (error) {
          console.error(error);
        }
      };
      fetchUserDetails();
    }, []);

    if (userDetails && userDetails.user_is_admin) {
      return <Component {...props} />;
    } else {
      navigate("/");
      return null;
    }
  };

  return AuthComponent;
};

export default withAuthAdmin;