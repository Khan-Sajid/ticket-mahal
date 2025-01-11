import React from "react";
import styles from "./SearchEventBanner.module.scss";
interface iCard {
  eventName: string;
  eventDes: string;
}
const SearchEventBanner = (props: iCard) => {
  const { eventName, eventDes } = props;

  return (
    <section className={styles.bannerWrapper}>
      <div className={`container`}>
        <div className={`row ${styles.bannerWrap}`}>
          <div className={`col-md-12 ${styles.infoEvent}`}>
            <div>
              {eventDes && <p>{eventDes}</p>}
              <h3>{eventName}</h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SearchEventBanner;
