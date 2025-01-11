"use client";
import React from "react";
import styles from "./SinglePageBanner.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarDay,
  // faClock,
  faLocationDot,
  faShareNodes,
  faWallet,
} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import { formatDate } from "@/utils/date.utils";
import { toKebabCase } from "@/utils/utils";
import { BannerEvent } from "@/interfaces/home";
import Link from "next/link";
import { EventFlow } from "@/utils/enums";
const SinglePageBanner = (props: BannerEvent & { noBookingBtn?: boolean }) => {
  const {
    _id,
    eventImage,
    eventName,
    // eventDuration,
    eventBannerImage,
    eventAddress,
    eventDate,
    eventPrice,
    eventFlow,
    noBookingBtn = false,
  } = props;
  const s3Url = process.env.NEXT_PUBLIC_S3_URL;

  function shareLinkviaWhatsapp() {
    const a = document.createElement("a");
    a.href = `https://wa.me?text=${window.location.href}`;
    a.target = "_blank";
    a.click();
    return;
  }

  return (
    <section
      className={styles.bannerWrapper}
      style={{ backgroundImage: `url('${s3Url}${eventBannerImage}')` }}
    >
      <div className={`container`}>
        <div className={`row ${styles.bannerWrap}`}>
          <div className={`col-md-12 ${styles.infoEvent}`}>
            <div className={styles.box}>
              <Image
                src={s3Url + eventImage}
                alt="Example image"
                className="img-fluid"
                width={260}
                height={100}
              />
              <div className={styles.boxInfo}>
                <h3>{eventName}</h3>
                <ul>
                  <li>
                    <FontAwesomeIcon icon={faLocationDot}></FontAwesomeIcon>
                    <span>{eventAddress}</span>
                  </li>
                  <li>
                    <FontAwesomeIcon icon={faCalendarDay}></FontAwesomeIcon>
                    <span>{formatDate(eventDate)}</span>
                  </li>
                  {/* <li>
                    <FontAwesomeIcon icon={faClock}></FontAwesomeIcon>
                    <span>{eventDuration}</span>
                  </li> */}
                  <li>
                    <FontAwesomeIcon icon={faWallet}></FontAwesomeIcon>
                    <span>
                      {eventPrice}
                      {" AED "}
                      {eventFlow === EventFlow.SITTING && "Onwards"}
                    </span>
                  </li>
                </ul>
                {!noBookingBtn &&
                  new Date(eventDate).getTime() > new Date().getTime() && (
                    <Link
                      href={`/book/${toKebabCase(eventName)}/${_id}`}
                      className="btnTheme"
                    >
                      Book Now
                    </Link>
                  )}
              </div>
            </div>
            <button className={styles.btnBook} onClick={shareLinkviaWhatsapp}>
              <FontAwesomeIcon
                icon={faShareNodes}
                className="me-2"
              ></FontAwesomeIcon>
              Share
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SinglePageBanner;
