import React, { useEffect, useState } from "react";
import styles from "./AlsoSearch.module.scss";
import Link from "next/link";
import Card from "@/components/shared/home/card/Card";
import SliderUI from "../ui/slider/slider";
import { RecommendedEvent } from "@/interfaces/home";
import { getAllRecommendedEvents } from "../also-like-event/alsoLikeEvents.http";

const AlsoSearchEvent = () => {
  const [events, setEvents] = useState<RecommendedEvent[]>();

  async function getAllEvents() {
    const recommendedEventsRes = await getAllRecommendedEvents();
    if (recommendedEventsRes.statusCode === 200 && recommendedEventsRes.data) {
      setEvents(recommendedEventsRes.data.data);
    }
  }

  useEffect(() => {
    getAllEvents();
  }, []);

  if (!events || !events.length) return null;
  return (
    <section className="paddingBoth">
      <div className="container">
        <div className="col-md-12">
          <div className={styles.headingInfo}>
            <div>
              <h2>People Also Search</h2>
              <p>
                Discover Your Next Favorite Experience: Recommended Events Await
              </p>
            </div>
            <Link href={"/view-all-events/recommended"}>View All</Link>
          </div>
        </div>
        <div className="col-md-12">
          <div className={styles.cardList}>
            <SliderUI>
              {events.map((item) => (
                <Card
                  key={item._id}
                  eventName={item.eventName}
                  eventImage={item.eventImage}
                  eventAddress={item.eventAddress}
                  eventDate={item.eventDate}
                  _id={item._id}
                  isFav={item.isFav}
                  eventFlow={item.eventFlow}
                />
              ))}
            </SliderUI>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AlsoSearchEvent;
