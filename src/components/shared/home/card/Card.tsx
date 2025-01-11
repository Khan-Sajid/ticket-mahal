import React, { useState } from "react";
import styles from "./Card.module.scss";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faSolideHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faRegularHeart } from "@fortawesome/free-regular-svg-icons";
import { formatDate } from "@/utils/date.utils";
import { RecommendedEvent } from "@/interfaces/home";
import { favorite } from "@/utils/common.http";
import { toKebabCase } from "@/utils/utils";
import { useAtom } from "jotai";
import { loginNeeded, userDetails } from "@/jotai/atoms";

const Card = (props: RecommendedEvent) => {
  const { _id, isFav, eventName, eventImage, eventAddress, eventDate } = props;
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
    <Link href={`/event-detail/${toKebabCase(eventName)}/${_id}`}>
      <div className={styles.cardItem}>
        <Image
          src={S3_URL + eventImage}
          alt="Example image"
          className="img-fluid"
          width={100}
          height={100}
        />
        <div className={styles.cardItemInfo}>
          <div className={styles.iconClass} onClick={toggleSubscription}>
            {isSubscribe ? (
              <FontAwesomeIcon icon={faSolideHeart}></FontAwesomeIcon>
            ) : (
              <FontAwesomeIcon icon={faRegularHeart}></FontAwesomeIcon>
            )}
          </div>
          <h3>{eventName}</h3>
          <h2>Location</h2>
          <p>{eventAddress}</p>
          <h2>Date of Event</h2>
          <p>{formatDate(eventDate)}</p>
        </div>
      </div>
    </Link>
  );
};

export default Card;
