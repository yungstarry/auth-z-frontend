import React, { useEffect, useState } from "react";
import { FaTimes,  } from "react-icons/fa";
import {BsCheck2All } from "react-icons/bs";
import styles from "../../styles/auth.module.scss";
import Card from "../card/Card";


const PasswordIndicator = ({password}) => {
    const [uCase, setUCase] = useState(false);
    const [num, setNum] = useState(false);
    const [sChar, setSChar] = useState(false);
    const [passLength, setPassLength] = useState(false);

    const timesIcon = <FaTimes color="red" size={15} />;
    const checkIcon = <BsCheck2All color="green" size={15} />;

    const switchIcon = (condition) => {
      return condition ? checkIcon : timesIcon;
    };

    useEffect(() => {
      // Check lower and uppercase
      setUCase(password.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/) ? true : false);

      // Check for numbers
      setNum(password.match(/([0-9])/) ? true : false);

      // Check for special character
      setSChar(password.match(/([!,%,&,@,#,$,^,*,?,_,~])/) ? true : false);

      // Check for password length
      setPassLength(password.length > 6 ? true : false);
    }, [password]);

  return (
    <Card cardClass={styles.group}>
      <ul className="form-list">
        <li>
          <span className={styles.indicator}>
            {switchIcon(uCase)} &nbsp; Lowercase & Uppercase
          </span>
        </li>
        <li>
          <span className={styles.indicator}>
            {switchIcon(num)} &nbsp; Number (0-9)
          </span>
        </li>
        <li>
          <span className={styles.indicator}>
            {switchIcon(sChar)} &nbsp; Special Character (!@#$%^&*)
          </span>
        </li>
        <li>
          <span className={styles.indicator}>
            {switchIcon(passLength)} &nbsp; At least 6 Characters
          </span>
        </li>
      </ul>
    </Card>
  );
};

export default PasswordIndicator;
