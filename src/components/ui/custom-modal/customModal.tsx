import React, { useEffect } from "react";
import styles from "./customModal.module.scss";

const CustomModal = ({ width, children }: any) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <section className={styles.popupWrapper}>
      <div className={styles.body}>{children}</div>
    </section>
  );
};

export default CustomModal;
