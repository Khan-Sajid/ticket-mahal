import React from "react";
import styles from "./top-banner.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarDay,
  faClock,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import ReadMore from "@/components/ui/read-more/readMore";
import { BannerEvent } from "@/interfaces/home";
import { formatDate } from "@/utils/date.utils";
import { toKebabCase } from "@/utils/utils";
import Link from "next/link";

const TopBanner: React.FC<any> = ({ event }: { event: BannerEvent }) => {
  const {
    _id,
    eventName,
    eventDes,
    eventFlow,
    eventAddress,
    eventDate,
    eventBannerImage,
  } = event;
  const S3_URL = process.env.NEXT_PUBLIC_S3_URL;
  return (
    <section
      className={styles.bannerWrapper}
      style={{ backgroundImage: `url('${S3_URL + eventBannerImage}')` }}
    >
      <div className={`container`}>
        <div className={`row ${styles.bannerWrap}`}>
          <div className={`col-md-12 ${styles.infoEvent}`}>
            <div>
              <h3>{eventName}</h3>
              <ReadMore text={eventDes} wordLimit={10} />
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
              </ul>
            </div>
            {new Date(eventDate).getTime() > new Date().getTime() && (
              <Link
                href={`/book/${toKebabCase(eventName)}/${_id}`}
                className={styles.btnBook}
                prefetch
              >
                Book Now
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopBanner;
