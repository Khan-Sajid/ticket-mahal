import React from "react";
import styles from "./NotificationMweb.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import CustomModal from "@/components/ui/custom-modal/customModal";
import { NotificationList } from "@/app/data/home";
import Image from "next/image";

const NotificationMweb = ({ closePopup }: any) => {
  return (
    <CustomModal>
      <div className={styles.modalWrapper}>
        <div className={styles.modalHeading}>
          <h4>Notification</h4>
          <span className={styles.crossIcon} onClick={closePopup}>
            <FontAwesomeIcon icon={faXmark}></FontAwesomeIcon>
          </span>
        </div>
        {NotificationList.map((item) => (
          <div key={item.id} className={styles.notificationItem}>
            <Image
              src={item.eventImage}
              alt="Example image"
              className="img-fluid"
              width={52}
              height={52}
            ></Image>
            <div className={styles.info}>
              <span
                className={
                  item.name.toLowerCase().includes("failed")
                    ? `${styles.failed}`
                    : ""
                }
              >
                {item.name}
              </span>
              <p>{item.status}</p>
            </div>
            <div className={styles.times}>{item.Time}</div>
          </div>
        ))}
      </div>
    </CustomModal>
  );
};

export default NotificationMweb;
