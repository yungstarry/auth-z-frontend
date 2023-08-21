import React from "react";
import "../../styles/home.scss";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import loginImg from '../../assets/login.svg'
import { Link } from "react-router-dom";
Link

const Home = () => {
  return (
    <div>
      <section className="container hero">
        <div className="hero-text">
          <h2>Ultimate MERN Stack Authentication System</h2>
          <p>
            Learn and Master Authentication and Authoriszation using MERN Stack
          </p>
          <p>
            Implement User Registration, Login Password Reset, Social Login,
            User Permissions, Email Notifications etc.
          </p>
          <div className="hero-buttons --flex-start">
            <Link to={"/register"} className="--btn --btn-danger">Register</Link>
            <Link to='/login' className="--btn --btn-primary">Login</Link>
          </div>
        </div>
        <div className="hero-image">
            <img src={loginImg} alt="AuthImg" />
        </div>
      </section>
    </div>
  );
};

export default Home;
