import React from "react";
import styles from "./recommended-events.module.scss";
import Link from "next/link";
import Card from "@/components/shared/home/card/Card";
import SliderUI from "@/components/ui/slider/slider";
import { RecommendedEventsProps } from "@/types/events";
import { RecommendedEvent } from "@/interfaces/home";
import { EventType } from "@/utils/enums";

const RecommendedEvents: React.FC<RecommendedEventsProps> = ({
  events: recommendedEvents,
}: {
  events: RecommendedEvent[];
}) => {
  return (
    <section className="paddingBoth">
      <div className="container">
        <div className="col-md-12">
          <div className={styles.headingInfo}>
            <div>
              <h2>Recommended Events</h2>
              <p>
                Discover Your Next Favorite Experience: Recommended Events Await
              </p>
            </div>
            <Link href={`/view-all-events/${EventType.RECOMMENDED}`}>
              View All
            </Link>
          </div>
        </div>
        <div className="col-md-12">
          <div className={styles.cardList}>
            <SliderUI>
              {recommendedEvents.map((recommendedEvent: RecommendedEvent) => (
                <Card
                  key={recommendedEvent._id}
                  isFav={recommendedEvent.isFav}
                  _id={recommendedEvent._id}
                  eventName={recommendedEvent.eventName}
                  eventImage={recommendedEvent.eventImage}
                  eventAddress={recommendedEvent.eventAddress}
                  eventDate={recommendedEvent.eventDate}
                  eventFlow={recommendedEvent.eventFlow}
                />
              ))}
            </SliderUI>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RecommendedEvents;
