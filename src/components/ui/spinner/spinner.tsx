import React from "react";
import styles from "./spinner.module.scss";

//<Spinner style={{ width: '120px', height: '14px', marginBottom: '4px' }} />
//<Spinner width="150px" height="24px" />
//<Spinner className="small" />
//<Spinner/>
interface SpinnerProps {
  inline?: boolean;
  width?: string;
  height?: string;
  style?: React.CSSProperties;
  className?: string;
}
const Spinner: React.FC<SpinnerProps> = ({
  inline = false,
  width = "56px",
  height = "56px",
  style = {},
  className = "",
}) => {
  return (
    <div className={`${styles.overlay} ${inline ? styles.inline : ""}`}>
      <div
        className={`${styles.spinner} ${styles[className]}`}
        style={{ width, height, ...style }}
      ></div>
    </div>
  );
};

export default Spinner;
