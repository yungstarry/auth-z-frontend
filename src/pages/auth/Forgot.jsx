import React, { useState } from "react";
import styles from "../../styles/auth.module.scss";
import Card from "../../components/card/Card";
import { Link } from "react-router-dom";
import { AiOutlineMail } from "react-icons/ai";
import { toast } from "react-toastify";
import { validateEmail } from "../../redux/features/auth/authService";
import { useDispatch, useSelector } from "react-redux";
import { RESET, forgotPassword } from "../../redux/features/auth/authSlice";
import Loader from "../../components/loader/Loader";

const Forgot = () => {
  const dispatch = useDispatch()
  const [email, setEmail] = useState("");
    const { isLoading } = useSelector((state) => state.auth);
  
  const forgot = async (e) => {
    e.preventDefault();
    if (!email) {
      return toast.error("Enter your email");
    }
    if (!validateEmail(email)) {
      return toast.error("Enter a valid email");
    }

    const userData = {
      email
    }
    await dispatch(forgotPassword(userData))
    await dispatch(RESET(userData))
  };

  return (
    <div className={`container ${styles.auth}`}>
      {isLoading && <Loader />}
      <Card>
        <div className={styles.form}>
          <div className="--flex-center">
            <AiOutlineMail size={35} color="#999" />
          </div>
          <h2>Forgot Password</h2>

          <br />
          <form onSubmit={forgot}>
            <input
              type={"email"}
              placeholder={"Email"}
              required
              name={"email"}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <button type="submit" className="--btn --btn-primary --btn-block">
              Get Reset Email
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

export default Forgot;
