import React, { useState } from "react";
import styles from "./PastCard.module.scss";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import ReadMore from "@/components/ui/read-more/readMore";
import { faHeart as faSolideHeart } from "@fortawesome/free-solid-svg-icons";
// import { faHeart as faRegularHeart } from "@fortawesome/free-regular-svg-icons";
import { formatDate } from "@/utils/date.utils";
import { useRouter } from "next/navigation";
import { toKebabCase } from "@/utils/utils";
interface iCard {
  _id: string;
  isFav?: boolean;
  eventName: string;
  eventImage: string;
  eventAddress: string;
  eventDate?: Date;
  viewCount: string;
  totalSeat: string;
  bookedSeat: string;
  rating: string;
  comment: string;
  eventDes: string;
}

const PastCard = (props: iCard) => {
  const {
    _id,
    isFav,
    eventName,
    eventImage,
    eventAddress,
    eventDate,
    viewCount,
    totalSeat,
    bookedSeat,
    rating,
    comment,
    eventDes,
  } = props;
  const [isSubscribe] = useState(isFav);
  const router = useRouter();
  const S3_URL = process.env.NEXT_PUBLIC_S3_URL;

  // const toggleSubscription = () => {
  //   setSubscribe(!isSubscribe);
  // };

  function handleCardClick() {
    router.push(`/event-detail/${toKebabCase(eventName)}/${_id}`);
  }

  return (
    <div className={styles.cardItem} onClick={handleCardClick}>
      <div className={styles.imageBox}>
        {isSubscribe ? (
          <div className={styles.iconClass}>
            <FontAwesomeIcon icon={faSolideHeart}></FontAwesomeIcon>
          </div>
        ) : (
          <></>
          // <FontAwesomeIcon icon={faRegularHeart}></FontAwesomeIcon>
        )}
        <Image
          src={S3_URL + eventImage}
          alt="Example image"
          className="img-fluid"
          width={100}
          height={100}
        />
        <div className={styles.rating}>
          <span>
            <FontAwesomeIcon icon={faStar} /> {rating}
          </span>
          <span>{comment} Comments</span>
        </div>
      </div>

      <div className={styles.cardItemInfo}>
        <h3>{eventName}</h3>
        <span className={styles.des}>
          <ReadMore text={eventDes} wordLimit={4} />
        </span>
        <h2>Location</h2>
        <p>{eventAddress}</p>
        <h2>Date of Event</h2>
        {eventDate && <p>{formatDate(eventDate)}</p>}
        <h2>View Count</h2>
        <p>{viewCount}</p>
        <h2>Total Seats Available</h2>
        <p>{totalSeat} Seats</p>
        <h2>Booked Seats</h2>
        <p className={styles.seat}>{bookedSeat} Seats</p>
      </div>
    </div>
  );
};

export default PastCard;
