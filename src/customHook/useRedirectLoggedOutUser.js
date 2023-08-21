import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../redux/features/auth/authService";
import { toast } from "react-toastify";

const useRedirectLoggedOutUser = (path) => {
  const navigate = useNavigate();

  useEffect(() => {
    let isLoggedIn;
    const RedirectLoggedOutUser = async () => {
      try {
        isLoggedIn = await authService.getLoginStatus();
      } catch (error) {
        console.log(error.message);
      }

      if (!isLoggedIn) {
        toast.info("Session expired, Please login to continue");
        navigate(path);
        return;
      }
    };
    RedirectLoggedOutUser();
  }, [path, navigate]);
};

export default useRedirectLoggedOutUser;
