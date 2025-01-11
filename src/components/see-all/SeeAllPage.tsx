"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import AlsoLikeEvent from "../also-like-event/AlsoLikeEvent";
import styles from "./SeeAllPage.module.scss";
import Card from "../shared/home/card/Card";
import TopBanner from "../home/top-banner/top-banner";
import { isObjectEmpty } from "@/utils/utils";
import { Event } from "@/interfaces/home";
import { useIntersectionObserver } from "@/customHooks/useIntersectionObserver";
import { useSearchParams } from "next/navigation";
import { getAllEvents } from "./seeAllPage.http";
import { EventType } from "@/utils/enums";

const SeeAllPage = ({
  eventsData,
  eventType,
  bannerData,
}: {
  eventsData: { events: Event[]; isNextPage: boolean };
  eventType: EventType;
  bannerData: Event;
}) => {
  const searchParams = useSearchParams();
  const [eventsDetail, setEventsDetail] = useState<{
    events: Event[];
    isNextPage: boolean;
  }>();
  const pageTraceRef = useRef({ page: 1, limit: 20 });
  const { isIntersecting, ref } = useIntersectionObserver({
    threshold: 0.5,
  });
  const [loadingMore, setLoadingMore] = useState(false);

  const updateEvents = useCallback(async () => {
    setLoadingMore(true);
    const eventsResponse = await getAllEvents<{
      events: Event[];
      isNextPage: boolean;
      categoryId?: string;
    }>({
      eventType: eventType,
      categoryId: searchParams?.get("categoty_id") || undefined,
      page: pageTraceRef.current.page + 1,
      limit: 20,
    });

    if (eventsResponse && eventsResponse.statusCode === 200) {
      pageTraceRef.current.page += 1;
      let updatedEvents = eventsData;
      updatedEvents = {
        events: [...updatedEvents.events, ...eventsResponse.data.events],
        isNextPage: eventsResponse.data.isNextPage,
      };
      setEventsDetail(updatedEvents);
    } else {
    }
    setLoadingMore(false);
  }, [searchParams, eventType]);

  useEffect(() => {
    if (isIntersecting && eventsDetail?.isNextPage) {
      updateEvents();
    }
    return () => {
      // setEventsDetail({ events: [], isNextPage: false });
    };
  }, [isIntersecting, updateEvents, eventsDetail?.isNextPage]);

  useEffect(() => {
    setEventsDetail(eventsData);
    return () => {
      setEventsDetail(undefined);
    };
  }, [eventsData.events.length]);

  return (
    <div style={{ background: "var(--light-6)" }}>
      {bannerData && !isObjectEmpty(bannerData) && (
        <TopBanner event={bannerData} />
      )}
      <section className="paddingTop60">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className={styles.headingInfo}>
                <div>
                  <h2>All {eventType} events</h2>
                  <p>
                    Discover Your Next Favorite Experience: {eventType} Events
                    Await
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.cardList}>
            {eventsDetail?.events?.map((recommendedEvent) => (
              <div className={styles.cardListItem} key={recommendedEvent._id}>
                <Card
                  _id={recommendedEvent._id}
                  isFav={recommendedEvent.isFav}
                  eventName={recommendedEvent.eventName}
                  eventImage={recommendedEvent.eventImage}
                  eventAddress={recommendedEvent.eventAddress}
                  eventDate={recommendedEvent.eventDate}
                  eventFlow={recommendedEvent.eventFlow}
                />
              </div>
            ))}
            {!eventsDetail?.events.length && (
              <div className={styles.noEvents}>No events found</div>
            )}
          </div>
          <div ref={ref}>{loadingMore && "Loading more events ..."}</div>
        </div>
      </section>
      {eventType !== "recommended" && <AlsoLikeEvent></AlsoLikeEvent>}
    </div>
  );
};

export default SeeAllPage;
