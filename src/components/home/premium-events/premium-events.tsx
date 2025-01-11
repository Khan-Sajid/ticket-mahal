import React from "react";
import styles from "./premium-events.module.scss";
import Card from "@/components/shared/home/card/Card";
import SliderUI from "@/components/ui/slider/slider";
import Image from "next/image";
import { PremiumEventsProps } from "@/types/events";
import { PremiumEvent } from "@/interfaces/home";

const PremiumEvents: React.FC<PremiumEventsProps> = ({
  events: premiumEvents,
}: {
  events: PremiumEvent[];
}) => {
  return (
    <section className={`paddingBoth ${styles.premiumMainWrap}`}>
      <div className="container">
        <div className="col-md-12">
          <div className={styles.headingInfo}>
            <Image
              src="/images/premium-play-icon.svg"
              alt="Example image"
              className="img-fluid"
              width={64}
              height={64}
            />
            <div>
              <h2>Premium Events</h2>
              <p>
                Discover Your Next Favorite Experience: Recommended Events Await
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-12">
          <div className={styles.cardList}>
            <SliderUI>
              {premiumEvents.map((premiumEvent) => (
                <Card
                  _id={premiumEvent._id}
                  isFav={premiumEvent.isFav}
                  key={premiumEvent._id}
                  eventName={premiumEvent.eventName}
                  eventImage={premiumEvent.eventImage}
                  eventAddress={premiumEvent.eventAddress}
                  eventDate={premiumEvent.eventDate}
                  eventFlow={premiumEvent.eventFlow}
                />
              ))}
            </SliderUI>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PremiumEvents;
