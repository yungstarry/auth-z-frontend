import React, { useEffect } from "react";
import "./userstat.scss";
import InfoBox from "../infoBox/InfoBox";
import { FaUser } from "react-icons/fa";
import { BiUserCheck, BiUserMinus, BiUserX } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import useRedirectLoggedOutUser from "../../customHook/useRedirectLoggedOutUser";
import { CALC_SUSPENDED_USER, CALC_VERIFIED_USER, getUsers } from "../../redux/features/auth/authSlice";


//icons
const icon1 = <FaUser size={40}  color="#fff"/>
const icon2 = <BiUserCheck size={40}  color="#fff"/>
const icon3 = <BiUserMinus size={40}  color="#fff"/>
const icon4 = <BiUserX size={40}  color="#fff"/>


const UserStat = () => {
 useRedirectLoggedOutUser("/login");
 const dispatch = useDispatch();
 const { verifiedUsers, suspendedUsers, user, users } = useSelector(
   (state) => state.auth
 );

const unverifiedUsers = users?.length -  verifiedUsers

 useEffect(() => {
  dispatch(CALC_VERIFIED_USER())
  dispatch(CALC_SUSPENDED_USER())
   dispatch(getUsers());
 }, [dispatch, users]);

  return (
    <div className="user-summary ">
      <h3 className="--mt">User Stats</h3>
      <div className="info-summary">
        <InfoBox
          icon={icon1}
          title={"Total Users"}
          count={users?.length}
          bgColor={"card1"}
        />
        <InfoBox
          icon={icon2}
          title={"Verified Users"}
          count={verifiedUsers}
          bgColor={"card2"}
        />
        <InfoBox
          icon={icon3}
          title={"Unverified Users"}
          count={unverifiedUsers}
          bgColor={"card3"}
        />
        <InfoBox
          icon={icon4}
          title={"Suspended Users"}
          count={suspendedUsers}
          bgColor={"card4"}
        />
      </div>
    </div>
  );
};

export default UserStat;
