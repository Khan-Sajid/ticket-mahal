import React from "react";
import styles from "./standingArrangement.module.scss";
import Image from "next/image";
import { IEventDetail } from "@/app/event-detail/[eventName]/[id]/eventDetail.types";
import TiketBooking from "@/components/ticket-booking/TicketBooking";

const StandingArrangement = ({
  eventDetail,
}: {
  eventDetail: IEventDetail;
}) => {
  const s3Url = process.env.NEXT_PUBLIC_S3_URL;

  return (
    <section className={`${styles.bookingWrapper}`}>
      <div className={`container`}>
        <div className="row">
          <div className="col-lg-8">
            <Image
              src={s3Url + eventDetail.stageImage}
              alt="Booking stage"
              width={775}
              height={776}
              className={`img-fluid ${styles.imageStage}`}
            ></Image>
          </div>
          <div className="col-lg-4">
            <TiketBooking {...(eventDetail as any)}></TiketBooking>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StandingArrangement;
