import React, { useEffect, useRef, useState } from "react";
import styles from "./LanguageDropdown.module.scss";
import { LanguageList, NotificationList } from "@/app/data/home";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import Link from "next/link";

const LanguageDropDown = () => {
  const [isOpenLanguage, setIsOpenLanguage] = useState(false);
  const languageRef = useRef<HTMLDivElement | null>(null);

  const toggleLanguage = () => {
    setIsOpenLanguage(!isOpenLanguage);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      languageRef.current &&
      !languageRef.current.contains(event.target as Node)
    ) {
      setIsOpenLanguage(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <section className={styles.NotificationBtnWraper} ref={languageRef}>
      <button className={styles.LanguageBtn} onClick={toggleLanguage}>
        <Image
          src="/images/language-icon.svg"
          alt="logo"
          className="img-fluid"
          width={24}
          height={20}
        />
      </button>
      <div
        className={`${styles.NotificationWrapper} ${
          isOpenLanguage ? styles.open : ""
        }`}
      >
        {LanguageList.map((item) => (
          <Link key={item.id} className={styles.languageItem} href="">
            {item.language}
          </Link>
        ))}
      </div>
    </section>
  );
};

export default LanguageDropDown;
