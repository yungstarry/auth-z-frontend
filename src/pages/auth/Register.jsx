import React, { useEffect, useState } from "react";
import styles from "../../styles/auth.module.scss";
import Card from "../../components/card/Card";
import { TiUserAddOutline } from "react-icons/ti";
import { Link, useNavigate } from "react-router-dom";
import InputPassword from "../../components/passwordInput/InputPassword";

import PasswordIndicator from "../../components/passwordIndicator/passwordIndicator";
import { toast } from "react-toastify";
import { validateEmail } from "../../redux/features/auth/authService";
import { useDispatch, useSelector } from "react-redux";
import { RESET, register, sendVerificationEmail } from "../../redux/features/auth/authSlice";
import Loader from "../../components/loader/Loader";

const initialState = {
  name: "",
  email: "",
  password: "",
  password2: "",
};
const Register = () => {
  const [formData, setFormData] = useState(initialState);
  const { name, email, password, password2 } = formData;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoggedIn, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.auth
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const registerUser = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      return toast.error("All fields are requires");
    }
    if (password.length < 6) {
      return toast.error("Password must be up to 6 characters");
    }
    if (!validateEmail(email)) {
      return toast.error("Please enter a valid email");
    }
    if (password !== password2) {
      return toast.error("Passwords do not match");
    }
    const userData = {
      name,
      email,
      password,
    };
    await dispatch(register(userData));
        // await dispatch(sendVerificationEmail());

  };
  useEffect(() => {
    if (isSuccess && isLoggedIn) {
      navigate("/profile");
    }
    dispatch(RESET());
  }, [isLoggedIn, isSuccess, dispatch, navigate]);
  return (
    <div className={`container ${styles.auth}`}>
      {isLoading && <Loader />}
      <Card>
        <div className={styles.form}>
          <div className="--flex-center">
            <TiUserAddOutline size={35} />
          </div>
          <h2>Register</h2>
          <div className="--flex-center">
            <button className="--btn --btn-google">Login with google</button>
          </div>
          <br />
          <p className="--text-center --fw-bold">or</p>
          <form onSubmit={registerUser}>
            <input
              type="text"
              placeholder="Name"
              name="name"
              value={name}
              onChange={handleInputChange}
            />
            <input
              type="text"
              placeholder={"Email"}
              name={"email"}
              value={email}
              onChange={handleInputChange}
            />
            <InputPassword
              placeholder={"Password"}
              name={"password"}
              value={password}
              onChange={handleInputChange}
            />
            <InputPassword
              password={"password"}
              placeholder={"Confirm Password"}
              name={"password2"}
              value={password2}
              onChange={handleInputChange}
              onPaste={(e) => {
                e.preventDefault();
                toast.error("Cannot Paste into input field");
                return false;
              }}
            />

            {/* Password Strength */}
            <PasswordIndicator password={password} />

            <button type="submit" className="--btn --btn-primary --btn-block">
              Register
            </button>
          </form>
          <span className={styles.register}>
            <Link to={"/"}>Home</Link>
            <p> &nbsp; Already have an acoount? &nbsp;</p>
            <Link to={"/login"}> Login </Link>
          </span>
        </div>
      </Card>
    </div>
  );
};

export default Register;
