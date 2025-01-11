import React, { useEffect, useState } from "react";
import styles from "./EventSchedule.module.scss";
import { getAllEvents } from "@/components/see-all/seeAllPage.http";
import { EventFlow, EventType } from "@/utils/enums";
import { Event } from "@/interfaces/home";
import { DAYS_OF_WEEK, MONTHS_OF_YEAR } from "@/utils/constants";
import { formatTime } from "@/utils/date.utils";
import { toKebabCase } from "@/utils/utils";
import Link from "next/link";
const EventSchedule = ({ tags }: { tags: string[] }) => {
  const [eventSchedule, setEventSchedule] = useState<Event[]>();

  async function fetchAllEventsBasedOnTags() {
    const eventsRes = await getAllEvents<Event[]>({
      tags: tags,
      eventType: EventType.UPCOMMING,
    });
    if (eventsRes.statusCode === 200 && eventsRes.data) {
      setEventSchedule(eventsRes.data);
    }
  }

  useEffect(() => {
    fetchAllEventsBasedOnTags();
    return () => {
      setEventSchedule(undefined);
    };
  }, []);

  if (!eventSchedule) return <></>;
  return (
    <>
      <h3 className="headingOne">Events Schedule</h3>
      <div className={styles.scheduleList}>
        {eventSchedule?.map?.((event) => {
          const date = new Date(event.eventDate);
          return (
            <div className={styles.item} key={event._id}>
              <span className={styles.times}>
                {DAYS_OF_WEEK[date.getDay()]}
                <span className={styles.date}>
                  {MONTHS_OF_YEAR[date.getDate()]}
                </span>
                {date.getMonth()}
              </span>
              <span className={styles.textDta}>
                <p>{event.eventAddress}</p>
                <p className={styles.singer}>{event.eventName}</p>
                <p className={styles.times2}>
                  {formatTime(event.eventDate)} Onwards
                  <span
                    className={`highlightText fw-semibold ${styles.blockElement}`}
                  >
                    {" "}
                    {event.eventFlow === EventFlow.SITTING
                      ? "Auditorium Event"
                      : event.eventFlow === EventFlow.STANDING
                      ? "On Ground Event"
                      : ""}
                  </span>
                </p>
              </span>
              {new Date(event.eventDate).getTime() > new Date().getTime() && (
                <span className={`ms-auto ${styles.actionBtn}`}>
                  <Link
                    href={`/book/${toKebabCase(event.eventName)}/${event._id}`}
                    className="btnTheme"
                  >
                    Book Ticket
                  </Link>
                </span>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default EventSchedule;
