import React, { useState } from "react";
import styles from "./sidebar.module.css";
import LogOut from "../Auth/LogOut";

function SideBar({ routes, setClickHamb }) {
  const [isHovered, setIsHovered] = useState(false);

  const token = localStorage.getItem("token");

  return (
    <div
      data-testid="sidebar"
      className={` d-flex flex-column ${styles.sidebar} ${isHovered ? styles.expanded : ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <nav className={`d-flex flex-column mt-5 align-items-center gap-4 pt-4 ${styles.navContainer}`}>
        {routes.map((route, index) => (
          <li className={`d-flex gap-1`} key={index}>
            <img
              className={`${styles.sidebarIcon}`}
              src={`${process.env.PUBLIC_URL}/assets/icons/${route.image}`}
              alt={route.alt}
            />
            {isHovered ? <a href={route.path}>{route.name}</a> : <></>}
          </li>
        ))}
        {!!token && <LogOut isHovered={isHovered} setClickHamb={setClickHamb} />}
      </nav>
    </div>
  );
}

export default SideBar;
