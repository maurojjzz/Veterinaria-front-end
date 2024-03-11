import React from "react";
import styles from "./logOut.module.css";
import { useHistory } from 'react-router-dom';

const LogOut = ({ isHovered, setClickHamb}) => {
    const history = useHistory();

    const logOut = () => {
        localStorage.clear();
        history.push('/auth/login');
        setClickHamb(false);
    }
  return (
    <div onClick={logOut} className={`d-flex flex-row align-items-center ${styles.logOut}`}>
      <img
        className={`d-none d-md-block ${styles.logIcon}`}
        src={`${process.env.PUBLIC_URL}/assets/icons/turn-off.png`}
        alt={"log out icon"}
      />
      {isHovered ? <div className={` ${styles.logText}`}>Salir</div> : <div className={` d-md-none ${styles.logText}`}>Salir</div>}
    </div>
  );
};

export default LogOut;
