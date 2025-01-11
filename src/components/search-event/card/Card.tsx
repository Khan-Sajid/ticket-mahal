import React, { useState } from "react";
import styles from "./Card.module.scss";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReadMore from "@/components/ui/read-more/readMore";
import { faHeart as faSolideHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faRegularHeart } from "@fortawesome/free-regular-svg-icons";
import { favorite } from "@/utils/common.http";
import { BannerEvent } from "@/interfaces/home";
import { formatDate } from "@/utils/date.utils";
import Link from "next/link";
import { toKebabCase } from "@/utils/utils";
import { useAtom } from "jotai";
import { loginNeeded, userDetails } from "@/jotai/atoms";

const Card = (props: BannerEvent) => {
  const {
    _id,
    isFav,
    eventName,
    eventImage,
    eventBannerImage,
    eventAddress,
    eventDate,
    eventFlow,
    eventDes,
  } = props;
  const [isSubscribe, setSubscribe] = useState(isFav);
  const [openLogin, setOpenLogin] = useAtom(loginNeeded);
  const [userDetail, setUserDetail] = useAtom(userDetails);

  const S3_URL = process.env.NEXT_PUBLIC_S3_URL;

  const toggleSubscription = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    if (!userDetail?._id) {
      setOpenLogin(true);
      return;
    }
    setSubscribe(!isSubscribe);
    favorite(_id, !isSubscribe);
  };
  return (
    <div className={styles.cardWrap}>
      <div className={styles.imgBox}>
        <Image
          src={S3_URL + eventBannerImage}
          alt="logo"
          className="img-fluid"
          width={219}
          height={100}
        />
      </div>
      <div className={styles.cardInfo}>
        <div className={styles.leftAlign}>
          <h4>{eventName}</h4>
          <ReadMore text={eventDes} wordLimit={20} />
          <ul className={styles.eventAddress}>
            <li>
              <span className={styles.heading}>Location</span>
              <span className={styles.info}>{eventAddress}</span>
            </li>
            <li>
              <span className={styles.heading}>Date of Event</span>
              <span className={styles.info}>{formatDate(eventDate)}</span>
            </li>
          </ul>
        </div>
        <div className={styles.actionButton}>
          <div className={styles.iconClass} onClick={toggleSubscription}>
            {isSubscribe ? (
              <FontAwesomeIcon icon={faSolideHeart}></FontAwesomeIcon>
            ) : (
              <FontAwesomeIcon icon={faRegularHeart}></FontAwesomeIcon>
            )}
          </div>
          {new Date(eventDate).getTime() > new Date().getTime() && (
            <Link
              href={`/book/${toKebabCase(eventName)}/${_id}`}
              className="btnTheme"
            >
              Book Ticket
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
