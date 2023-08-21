import React, { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getUser, getUsers, upgradeUser } from "../../redux/features/auth/authSlice";
import { EMAIL_RESET } from "../../redux/email/emailSlice";

const ChangeRole = ({_id, email}) => {
  const dispatch = useDispatch()
  const [userRole, setUserRole] = useState("");

   const { user,users} = useSelector((state) => state.auth);

    useEffect(() => {
      dispatch(getUsers());
    }, [dispatch]);

  //upgrade user
  const changeRole = async (e) => {
    e.preventDefault();

    if (!userRole) {
      toast.error("Please select a role");
    }

    const userData = {
      role: userRole,
      id: _id,
    };

    const emailData = {
      subject: "Acount Role Changed - Adordev",
      sent_to: email,
      reply_to: "noreply@adordev.com",
      template: "changePassword",
      url: "/login",
    };

    await dispatch(upgradeUser(userData));
    // await dispatch(sendAutomatedEmail(emailData));
    await dispatch(getUsers());
      // dispatch(EMAIL_RESET());


  }
  return (
    <div className="sort">
      <form className="--flex-start" onSubmit={(e) => changeRole(e, _id, userRole)}>
        <select
          value={userRole}
          onChange={(e) => {
            setUserRole(e.target.value);
          }}
        >
          <option value="">--select--</option>
          <option value="subscriber"> Subscriber</option>
          <option value="author"> Author</option>
          <option value="admin"> Admin</option>
          <option value="suspended">Suspended </option>
        </select>
        <button type="submit" className="--btn --btn-primary"><FaCheck size={15} /></button>
      </form>
    </div>
  );
};

export default ChangeRole;
