import React from "react";
import styles from "./upcoming-events.module.scss";
import Link from "next/link";
import Card from "@/components/shared/home/card/Card";
import SliderUI from "@/components/ui/slider/slider";
import LoginStripe from "./login-stripe/login-stripe";
import { UpcomingEventsProps } from "@/types/events";
import { UpcomingEvent } from "@/interfaces/home";
import { EventType } from "@/utils/enums";

const UpcomingEvents: React.FC<
  UpcomingEventsProps & { isRecommended: boolean }
> = ({
  events: upcomingEvents,
  isRecommended,
}: {
  events: UpcomingEvent[];
  isRecommended: boolean;
}) => {
  return (
    <section className={`paddingBoth ${styles.upcommingMainWrap}`}>
      <div className="container">
        {isRecommended ? <LoginStripe></LoginStripe> : null}
        <div className="col-md-12">
          <div className={styles.headingInfo}>
            <div>
              <h2>Upcoming Events</h2>
              <p>
                Discover Your Next Favorite Experience: Recommended Events Await
              </p>
            </div>
            <Link href={`/view-all-events/${EventType.UPCOMMING}`}>
              View All
            </Link>
          </div>
        </div>
        <div className="col-md-12">
          <div className={styles.cardList}>
            <SliderUI>
              {upcomingEvents.map((upcomingEvent) => (
                <Card
                  key={upcomingEvent._id}
                  _id={upcomingEvent._id}
                  isFav={upcomingEvent.isFav}
                  eventName={upcomingEvent.eventName}
                  eventImage={upcomingEvent.eventImage}
                  eventAddress={upcomingEvent.eventAddress}
                  eventDate={upcomingEvent.eventDate}
                  eventFlow={upcomingEvent.eventFlow}
                />
              ))}
            </SliderUI>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UpcomingEvents;
