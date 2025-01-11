"use client";
import React, { useState } from "react";
import styles from "./sittingArrangemnet.module.scss";
import Image from "next/image";
import {
  IEventDetail,
  SeatDetail,
} from "@/app/event-detail/[eventName]/[id]/eventDetail.types";
import TiketBooking from "@/components/ticket-booking/TicketBooking";
import classNames from "classnames";

const SittingArrangement = ({ eventDetail }: { eventDetail: IEventDetail }) => {
  const [conflictingSeats, setConflictingSeats] = useState<
    Record<string, SeatDetail>
  >({});
  const [seatsSelected, setSeatsSelected] = useState<
    Record<string, SeatDetail>
  >({});

  function addSeat(seatDetail: SeatDetail) {
    const key = `${seatDetail.label}${seatDetail.seatNo}`;
    if (seatsSelected[key]) {
      const updatedSelectedSeats: Record<string, SeatDetail> = JSON.parse(
        JSON.stringify(seatsSelected)
      );
      delete updatedSelectedSeats[key];
      setSeatsSelected(updatedSelectedSeats);
    } else {
      setSeatsSelected({
        ...seatsSelected,
        [key]: {
          ...seatDetail,
        },
      });
    }
  }

  function onConflictingSeats(seats: Record<string, SeatDetail>) {
    setConflictingSeats({ ...seats });
  }

  return (
    <section className={`${styles.bookingWrapper}`}>
      <div className={`container`}>
        <div className="row">
          <div className="col-lg-8 text-center">
            <div className="row">
              <div className="col-1"></div>
              <div className="col-11 col-md-10">
                <Image
                  src="/images/stripe-booking-two.svg"
                  alt="Booking stage"
                  width={517}
                  height={81}
                  className={`img-fluid ${styles.imageStage}`}
                ></Image>
              </div>
            </div>
            <div>
              {eventDetail.sitting.map((sittingArr) => {
                const groupByRow: Record<string, SeatDetail[]> = {};
                sittingArr.arrangements.map((arrangement) => {
                  groupByRow[arrangement.label]
                    ? (groupByRow[arrangement.label] = [
                        ...groupByRow[arrangement.label],
                        arrangement,
                      ])
                    : (groupByRow[arrangement.label] = [arrangement]);
                });
                return (
                  <div key={sittingArr.typeFees} className={"typeKey"}>
                    {Object.keys(groupByRow).map((key, index) => {
                      return (
                        <div key={key}>
                          <div className={`row ${styles.rowSeat}`}>
                            <div className="col-1 d-flex justify-content-md-center justify-content-start pe-0">
                              <h3>{key}</h3>
                            </div>
                            <div
                              className={`${
                                styles.btnWrapper
                              } col-11 col-md-10 ${
                                false ? styles.typeA : styles.typeB
                              }`}
                            >
                              {groupByRow[key].map((seat) => (
                                <button
                                  type="button"
                                  onClick={() => addSeat(seat)}
                                  className={classNames(styles.btnSeat, {
                                    [styles.premium]: seat.type === "premium",
                                    [styles.selected]: Boolean(
                                      seatsSelected[
                                        `${seat.label}${seat.seatNo}`
                                      ]
                                    ),
                                  })}
                                  key={seat._id}
                                  disabled={
                                    seat.isBooked ||
                                    Boolean(
                                      conflictingSeats[
                                        `${seat.label}${seat.seatNo}`
                                      ]
                                    )
                                  }
                                >
                                  {seat.seatNo}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                    <div className="row">
                      <div className="col-md-12">
                        <p className={styles.infoBox}>{sittingArr.typeFees}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="col-lg-4">
            <TiketBooking
              {...eventDetail}
              seatsSelected={seatsSelected}
              setSeatsSelected={setSeatsSelected}
              onConflictingSeats={onConflictingSeats}
            ></TiketBooking>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SittingArrangement;
