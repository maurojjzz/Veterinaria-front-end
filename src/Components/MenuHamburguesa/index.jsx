import React from 'react'
import styles from './menuHamburguesa.module.css';
import LogOut from '../Auth/LogOut';

const MenuHamburguesa = ({routes, setClickHamb}) => {

  const token = localStorage.getItem('token');

  return (
    <div className={`d-flex justify-content-center ${styles.containerMenu}`}>
        <nav className={`d-flex flex-column align-items-center gap-4 pt-4 ${styles.navContainer}`}> 
            {routes.map((route, index) => 
                <li key={index}><a href={route.path}>{route.name}</a></li>
            )}
            {!!token && <LogOut setClickHamb={setClickHamb} />}
            
        </nav>
    </div>
  )
}

export default MenuHamburguesa
