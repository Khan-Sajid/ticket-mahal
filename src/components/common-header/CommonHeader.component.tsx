import React from "react";
import styles from "./CommonHeader.module.scss";

const CommonHeader = ({ children }: any) => {
  return (
    <section className={styles.bannerWrapper}>
      <div className={`container ${styles.bannerWrap}`}>{children}</div>
    </section>
  );
};

export default CommonHeader;
