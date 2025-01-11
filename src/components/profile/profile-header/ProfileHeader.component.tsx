import React from "react";
import styles from "./ProfileHeader.module.scss";

const ProfileHeader = ({ heading }: { heading: string }) => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <h2 className={styles.mainHeading}>{heading}</h2>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
