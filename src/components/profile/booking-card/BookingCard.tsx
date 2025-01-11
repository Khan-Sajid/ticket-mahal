"use client";
import React, { useState } from "react";
import styles from "./BookingCard.module.scss";
import Image from "next/image";
import ViewTicket from "../view-ticket/ViewTicket";
import { EventFlow } from "@/utils/enums";
import { formatDate } from "@/utils/date.utils";
import classNames from "classnames";

const BookingCard = (props: any) => {
  const { bookings, isNextPage, fetchMoreData } = props;
  const [detailBookingId, setDetailBookingId] = useState("");
  const s3Url = process.env.NEXT_PUBLIC_S3_URL;
  const TYPE: any = {
    vip: "VIP",
    premium: "Premium",
    normal: "Normal",
  };
  const toggleViewTicket = (id: string = "") => {
    setDetailBookingId(id);
  };

  return (
    <>
      <div className={styles.bookingList}>
        {bookings.map((data: any) => {
          const ticketTypeGroup: any = {};
          data.seats.forEach((seat: any) => {
            if (Object.keys(ticketTypeGroup).includes(seat.type)) {
              ticketTypeGroup[`${seat.type}`].push(
                `${seat.label}-${seat.seatNo}`
              );
            } else {
              ticketTypeGroup[`${seat.type}`] = [
                `${seat.label}-${seat.seatNo}`,
              ];
            }
          });
          console.log("ticketTypeGroup", ticketTypeGroup);
          return (
            <div
              className={classNames(styles.item, {
                [styles.pastShadow]: new Date(data.eventDate) <= new Date(),
              })}
              key={data._id}
            >
              <div className={`${styles.bookingWrap}`}>
                <div className={styles.bookingInfo}>
                  {data.eventId?.eventBannerImage && (
                    <Image
                      src={s3Url + data.eventId.eventBannerImage}
                      alt={data.eventName}
                      className="img-fluid"
                      width={244}
                      height={145}
                    />
                  )}
                  <div className={styles.infoWrap}>
                    <span className={styles.singer}>{data.name}</span>
                    <span className={styles.type}>
                      {data.eventFlow === EventFlow.SITTING
                        ? "Auditorium Event"
                        : "On Ground Event"}
                    </span>
                    <span className={styles.date}>
                      {formatDate(data.eventDate)}
                    </span>
                    <span className={styles.location}>
                      {data.eventId?.eventAddress}
                    </span>
                  </div>
                </div>
                <div className={styles.BookingTicket}>
                  <div className={styles.date}>
                    {data.eventFlow === EventFlow.SITTING ? (
                      <span>{data.seats.length.toString().padStart(2, 0)}</span>
                    ) : (
                      <span>{data.totalSeat.toString().padStart(2, 0)}</span>
                    )}
                    Tickets
                  </div>
                  <div className={styles.ticketDetails}>
                    {Object.entries(ticketTypeGroup).map((ticketType: any) => (
                      <div className={styles.whereSeat} key={ticketType[0]}>
                        <span className={styles.wing}>{ticketType[0]}</span>
                        <span className={styles.wingTwo}>
                          {ticketType[1].join(", ")}
                        </span>
                      </div>
                    ))}
                  </div>
                  <button
                    className={styles.btnTicket}
                    onClick={() => toggleViewTicket(data._id)}
                  >
                    View Ticket
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {Boolean(isNextPage) && (
        <div className="row">
          <div className="col-md-12">
            <button
              type="button"
              className={styles.btnMore}
              onClick={fetchMoreData}
            >
              Load More
            </button>
          </div>
        </div>
      )}
      {!bookings.length && (
        <div className={styles.noBookings}>No Booking Found!</div>
      )}
      {Boolean(detailBookingId.length) && (
        <ViewTicket
          closePopup={toggleViewTicket}
          detailBookingId={detailBookingId}
        ></ViewTicket>
      )}
    </>
  );
};

export default BookingCard;
