import React from "react";
import "./header.scss";
import { BiLogIn } from "react-icons/bi";
import { FaUserCircle } from "react-icons/fa";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  RESET,
  logout,
  selectIsLoggedIn,
  selectUser,
} from "../../redux/features/auth/authSlice";
import { ShowOnLogin, ShowOnLogout } from "../protect/hiddenLink.jsx";
import { UserName } from "../../pages/profile/Profile";

const activeLink = ({ isActive }) => (isActive ? "active" : "");

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userRole = useSelector(selectUser);

  const { isLoggedIn, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.auth
  );

  const goHome = () => {
    navigate("/");
  };

  const logoutUser = async () => {
    dispatch(RESET());
    await dispatch(logout());
    navigate("/login");
  };
  return (
    <header className="header">
      <nav>
        <div className="logo" onClick={goHome}>
          <BiLogIn size={35} />
          <span>AUTH:Z</span>
        </div>
        <ul className="home-links">
          <ShowOnLogin>
            <li className="--flex-center">
              <FaUserCircle size={20}  />
              <UserName />
            </li>
          </ShowOnLogin>

          <ShowOnLogout>
            <li>
              <button className="--btn --btn-primary">
                <Link to={"/login"}>Login</Link>
              </button>
            </li>
          </ShowOnLogout>
          <ShowOnLogin>
            <li>
              <NavLink to={"/profile"} className={activeLink}>
                Profile
              </NavLink>
            </li>
          </ShowOnLogin>
          <ShowOnLogin>
            <li>
              <button onClick={logoutUser} className="--btn --btn-secondary">
                <Link to="/login">Logout</Link>
              </button>
            </li>
          </ShowOnLogin>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
