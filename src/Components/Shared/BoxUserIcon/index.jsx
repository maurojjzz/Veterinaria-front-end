import React, { useEffect, useState } from "react";
import styles from './user-box.module.css'

const BoxUser = ({ ownerId, owners }) => {
  const [vocals, setVocals] = useState("");

  useEffect(() => {
    const due = owners.find((owner) => owner.id === ownerId);
    setVocals(`${due.nombre[0]} ${due.apellido[0]}`);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={`p-2 rounded-5 ${styles.container}`}>
      <div className={`fs-1 fw-medium text-light`}>{vocals}</div>
    </div>
  );
};

export default BoxUser;
