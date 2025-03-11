import { useHistory } from "react-router-dom";
import styles from "./dashboard-option.module.css"; 

const DashboardOption = ({ icon, text, path }) => {
  const history = useHistory();

  return (
    <div className={styles.optionCard} onClick={() => history.push(path)}>
      <div className={styles.icon}>{icon}</div>
      <p>{text}</p>
    </div>
  );
};

export default DashboardOption;
