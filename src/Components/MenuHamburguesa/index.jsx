import React from 'react'
import styles from './menuHamburguesa.module.css';

const MenuHamburguesa = ({routes}) => {
  return (
    <div className={`d-flex justify-content-center ${styles.containerMenu}`}>
        <nav className={`d-flex flex-column align-items-center gap-4 pt-4 ${styles.navContainer}`}> 
            {routes.map((route, index) => 
                <li key={index}><a href={route.path}>{route.name}</a></li>
            )}
        </nav>
    </div>
  )
}

export default MenuHamburguesa
