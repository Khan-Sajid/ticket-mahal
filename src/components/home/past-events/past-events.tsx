import React from "react";
import styles from "./past-events.module.scss";
import PastCard from "@/components/shared/home/pastCard/PastCard";
import Link from "next/link";
import { PastEventsProps } from "@/types/events";
import { PastEvent } from "@/interfaces/home";
import { EventType } from "@/utils/enums";

const PastEvents: React.FC<PastEventsProps> = ({
  events: pastEvents,
}: {
  events: PastEvent[];
}) => {
  return (
    <section className={`paddingBoth ${styles.pastMainWrap}`}>
      <div className="container">
        <div className="col-md-12">
          <div className={styles.headingInfo}>
            <div>
              <h2>Past Events</h2>
              <p>
                Discover Your Next Favorite Experience: Recommended Events Await
              </p>
            </div>
            <Link href={`/view-all-events/${EventType.PAST}`}>View All</Link>
          </div>
        </div>
        <div className="col-md-12">
          <div className={styles.pastCardList}>
            {pastEvents.map((pastEvent) => (
              <PastCard
                key={pastEvent._id}
                _id={pastEvent._id}
                isFav={pastEvent.isFav}
                eventName={pastEvent.eventName}
                eventImage={pastEvent.eventImage}
                eventDes={pastEvent.eventDes}
                eventAddress={pastEvent.eventAddress}
                eventDate={pastEvent.eventDate}
                viewCount={pastEvent.viewCount}
                totalSeat={pastEvent.totalSeat}
                bookedSeat={pastEvent.bookedSeat}
                rating={pastEvent.rating}
                comment={pastEvent.totalComment}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PastEvents;
