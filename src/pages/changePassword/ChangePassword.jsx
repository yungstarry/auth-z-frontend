import React, { useState } from "react";
import Card from "../../components/card/Card";
import PageMenu from "../../components/pageMenu/PageMenu";
import InputPassword from "../../components/passwordInput/InputPassword";
import "./changepassword.scss";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useRedirectLoggedOutUser from "../../customHook/useRedirectLoggedOutUser";
import {
  RESET,
  changePassword,
  logout,
  selectUser,
} from "../../redux/features/auth/authSlice";
import { Spinner } from "../../components/loader/Loader";
import { sendAutomatedEmail } from "../../redux/email/emailSlice";

const initialState = {
  oldPassword: "",
  password: "",
  password2: "",
};

const ChangePassword = () => {
  useRedirectLoggedOutUser("/login");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setformData] = useState(initialState);
  const { oldPassword, password, password2 } = formData;
  const { isLoading } = useSelector((state) => state.auth);

  const user = useSelector(selectUser);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setformData({ ...formData, [name]: value });
  };

  const updatePassword = async (e) => {
    e.preventDefault();
    if (!oldPassword || !password || !password2) {
      return toast.error("All fields are requires");
    }
    if (password !== password2) {
      return toast.error("Passwords do not match");
    }

    const userData = {
      oldPassword,
      password,
    };

    const emailData = {
      subject: "Password Changed - Adordev",
      sent_to: user.email,
      reply_to: "noreply@adordev.com",
      template: "changePassword",
      url: "/forgot",
    };

    await dispatch(changePassword(userData));
    // await dispatch(sendAutomatedEmail(emailData));
    await dispatch(logout());
    await dispatch(RESET(userData));
    navigate("/login");
  };

  return (
    <div>
      <section>
        <div className="container">
          <PageMenu />
          <h2>Change Password</h2>
          <div className="--flex-start change-password">
            <Card cardClass={"card"}>
              <form onSubmit={updatePassword}>
                <p>
                  <label>Current Password:</label>
                  <InputPassword
                    placeholder="Current Password"
                    name="oldPassword"
                    value={oldPassword}
                    onChange={handleInputChange}
                  />
                </p>
                <p>
                  <label>New Password:</label>
                  <InputPassword
                    placeholder="New Password"
                    name="password"
                    value={password}
                    onChange={handleInputChange}
                  />
                </p>
                <p>
                  <label>New Password:</label>
                  <InputPassword
                    placeholder="Confirm New Password"
                    name="password2"
                    value={password2}
                    onChange={handleInputChange}
                    onPaste={""}
                  />
                </p>
                {isLoading ? (
                  <Spinner />
                ) : (
                  <button
                    type="submit"
                    className="--btn --btn-block --btn-danger"
                  >
                    Change Password
                  </button>
                )}
              </form>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ChangePassword;
