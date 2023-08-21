import React, { useEffect, useState } from "react";
import styles from "../../styles/auth.module.scss";
import Card from "../../components/card/Card";
import { BiLogIn } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import InputPassword from "../../components/passwordInput/InputPassword";
import { useDispatch, useSelector } from "react-redux";
import { validateEmail } from "../../redux/features/auth/authService";
import { RESET, login, loginWithGoogle, sendLoginCode } from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";
import Loader from "../../components/loader/Loader";
import { GoogleLogin } from "@react-oauth/google";



const initialState = {
  email: "",
  password: "",
};

const Login = () => {
  const [formData, setFormData] = useState(initialState);
  const { email, password } = formData;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoggedIn, isError, isSuccess, isLoading, message, twoFactor } =
    useSelector((state) => state.auth);

  const loginUser = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      return toast.error("All fields are requires");
    }
    if (!validateEmail(email)) {
      return toast.error("Please enter a valid email");
    }

    const userData = {
      email,
      password,
    };
    dispatch(login(userData));

  };
  useEffect(() => {
    if (isSuccess && isLoggedIn) {
      navigate("/profile");
    }
    if(isError && twoFactor){
      dispatch(sendLoginCode(email))
      navigate(`/loginwithcode/${email}`);
    }
    dispatch(RESET());
  }, [isLoggedIn, isSuccess, dispatch, navigate, isError, twoFactor, email]);

  const googleLogin = async (credentialResponse) => {
    console.log(credentialResponse);
    await dispatch(loginWithGoogle({userToken: credentialResponse.credential}))
  };

  return (
    <div className={`container ${styles.auth}`}>
      {isLoading && <Loader />}

      <Card>
        <div className={styles.form}>
          <div className="--flex-center">
            <BiLogIn size={35} color="#999" />
          </div>
          <h2>Login</h2>
          <div className="--flex-center">
            {/* <button className="--btn --btn-google">Login with google</button> */}
            <GoogleLogin
              onSuccess={googleLogin}
              onError={() => {
                console.log("Login Failed");
                toast.error("login failed")
              }}
            />
            
          </div>
          <br />
          <p className="--text-center --fw-bold">or</p>
          <form onSubmit={loginUser}>
            <input
              type={"email"}
              placeholder={"Email"}
              required
              name={"email"}
              value={email}
              onChange={handleInputChange}
            />
            <InputPassword
              type={"password"}
              placeholder={"Password"}
              required
              name={"password"}
              value={password}
              onChange={handleInputChange}
            />

            <button type="submit" className="--btn --btn-primary --btn-block">
              Login
            </button>
          </form>
          <Link to={"/forgot"}> Forgot Password</Link>
          <span className={styles.register}>
            <Link to={"/"}>Home</Link>
            <p> &nbsp; Don't have an acoount? &nbsp;</p>
            <Link to={"/register"}> Register </Link>
          </span>
        </div>
      </Card>
    </div>
  );
};

export default Login;
