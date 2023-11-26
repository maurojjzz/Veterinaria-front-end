import React from "react";
import styles from "./pet-box.module.css";

const BoxPetIcon = ({ especie }) => {
  const getPic = () => {
    switch (especie) {
      case "Canino":
        return "canino.png";
      case "Reptil":
        return "reptil.png";
      case "Ave":
        return "ave.png";
      case "Felino":
        return "felino.png";
      default:
        return "defaulEspecie.png";
    }
  };

  return (
    <div className={`p-2 rounded-5 ${styles.container}`}>
      <img
        src={`${process.env.PUBLIC_URL}/assets/icons/${getPic()}`}
        alt={`specie icon`}
        className={`${styles.logo}`}
      />
    </div>
  );
};

export default BoxPetIcon;
