import React, { useEffect, useState } from "react";
import styles from "../../styles/auth.module.scss";
import Card from "../../components/card/Card";
import { Link, useNavigate, useParams } from "react-router-dom";
import { MdPassword } from "react-icons/md";
import InputPassword from "../../components/passwordInput/InputPassword";
import Loader from "../../components/loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { RESET, resetPassword } from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";

const initialState = {
  password: "",
  password2: "",
};

const Reset = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, isSuccess, message } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState(initialState);
  const { password, password2 } = formData;

  const { resetToken } = useParams();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const reset = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      return toast.error("Passwords do not match");
    }
    if (password.length < 6) {
      return toast.error("Password must be up to 6 characters");
    }

    const userData = {
      password,
    };
    await dispatch(resetPassword({ userData, resetToken }));
  
 };
  useEffect(() => {
    if (isSuccess && message.includes("Reset Succeessful")) {
      navigate("/login");
    }
    dispatch(RESET());
  }, [dispatch, navigate, message, isSuccess]);
  return (
    <div className={`container ${styles.auth}`}>
      {isLoading && <Loader />}

      <Card>
        <div className={styles.form}>
          <div className="--flex-center">
            <MdPassword size={35} color="#999" />
          </div>
          <h2>Reset Password</h2>

          <br />
          <form onSubmit={reset}>
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
            />

            <button type="submit" className="--btn --btn-primary --btn-block">
              Reset Email
            </button>
          </form>
          <span className="--flex-between --m">
            <Link to={"/"}>-Home</Link>
            <Link to={"/login"}> -Login </Link>
          </span>
        </div>
      </Card>
    </div>
  );
};

export default Reset;
