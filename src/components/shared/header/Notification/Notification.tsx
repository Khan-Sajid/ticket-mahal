import React, { useEffect, useRef, useState } from "react";
import styles from "./Notification.module.scss";
import { NotificationList } from "@/app/data/home";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import NotificationMweb from "./NotificationMweb/NotificationMweb";

const Notification = () => {
  const [isOpenNotification, setIsOpenNotification] = useState(false);
  const notificationRef = useRef<HTMLDivElement | null>(null);

  const toggleNotificationList = () => {
    setIsOpenNotification(!isOpenNotification);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      notificationRef.current &&
      !notificationRef.current.contains(event.target as Node)
    ) {
      setIsOpenNotification(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const [openNotificationPopup, setopenNotificationPopup] = useState(false);
  const togglesetopenNotificationPopup = () => {
    setopenNotificationPopup(!openNotificationPopup);
  };

  return (
    <>
      <section className={styles.NotificationBtnWraper} ref={notificationRef}>
        {/* for desktop */}
        <button
          className={`d-none d-md-block ${styles.Notification}`}
          onClick={toggleNotificationList}
        >
          <FontAwesomeIcon icon={faBell}></FontAwesomeIcon>
        </button>
        <div
          className={`${styles.NotificationWrapper} ${
            isOpenNotification ? styles.open : ""
          }`}
        >
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
        <button
          className={`d-block d-md-none ${styles.Notification}`}
          onClick={togglesetopenNotificationPopup}
        >
          <FontAwesomeIcon icon={faBell}></FontAwesomeIcon>
        </button>
      </section>

      {/* forMobile  */}
      {openNotificationPopup && (
        <NotificationMweb
          closePopup={togglesetopenNotificationPopup}
        ></NotificationMweb>
      )}
    </>
  );
};

export default Notification;
