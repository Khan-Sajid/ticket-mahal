import React, { useEffect, useState } from "react";
import styles from "./ViewTicket.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CustomModal from "@/components/ui/custom-modal/customModal";
import Image from "next/image";
import { faTicket, faXmark } from "@fortawesome/free-solid-svg-icons";
import { BookingTicketList } from "@/app/data/profile";
import { faCircleUser } from "@fortawesome/free-regular-svg-icons";
import { cancelBooking, getBookingDetails } from "../profile.http";
import classNames from "classnames";
import { formatDate } from "@/utils/date.utils";
import { EventFlow } from "@/utils/enums";
import { SeatDetail } from "@/app/event-detail/[eventName]/[id]/eventDetail.types";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import SupportModal from "../supportModal/supportModal";

const ViewTicket = ({ closePopup, detailBookingId }: any) => {
  const [ticketDetails, setTicketDetails] = useState<any>({});
  const [openSupport, setOpenSupport] = useState(false);
  const router = useRouter();
  const s3Url = process.env.NEXT_PUBLIC_S3_URL;

  async function fetchBookingDetails() {
    const res = await getBookingDetails(detailBookingId);
    if (res && res.statusCode === 200) {
      setTicketDetails(res.data);
    }
  }

  async function cancelThisBooking() {
    if (detailBookingId) {
      const res = await cancelBooking(detailBookingId);
      if (res && (res.statusCode === 200 || res.statusCode === 201)) {
        toast.success("Booking cancelled successfully!");
        closePopup();
        router.refresh();
      } else {
        toast.error(
          res.message || "Something went wrong! Please try again later."
        );
      }
    }
  }

  useEffect(() => {
    if (detailBookingId.length) fetchBookingDetails();
  }, [detailBookingId]);
  const data = BookingTicketList[0];

  if (openSupport)
    return (
      <SupportModal
        closeSupport={() => setOpenSupport(false)}
        bookingId={detailBookingId}
      />
    );

  return (
    <CustomModal>
      <div className={styles.mainWrapper}>
        <span className={styles.crossIcon} onClick={closePopup}>
          <FontAwesomeIcon icon={faXmark}></FontAwesomeIcon>
        </span>
        <div
          className={classNames(styles.item, {
            [styles.pastShadow]: data.eventStatus == "past",
          })}
          key={ticketDetails?._id}
        >
          <div className={`${styles.bookingWrap}`}>
            <div className={styles.bookingInfo}>
              {ticketDetails?.eventId?.eventBannerImage && (
                <Image
                  src={s3Url + ticketDetails.eventId.eventBannerImage}
                  alt={ticketDetails.eventName}
                  className={`img-fluid`}
                  width={244}
                  height={145}
                />
              )}
              <div className={styles.infoWrap}>
                <span className={styles.singer}>{ticketDetails?.name}</span>
                <span className={styles.type}>
                  {data.event_type === EventFlow.SITTING
                    ? "Auditorium Event"
                    : "On Ground Event"}
                </span>
                <span className={styles.date}>
                  {formatDate(ticketDetails?.eventDate)}
                </span>
                <span className={styles.location}>
                  {ticketDetails.eventId?.eventAddress}
                </span>
              </div>
            </div>
            <div className={styles.ticketInfoWrap}>
              <div className={styles.BookingTicket}>
                {ticketDetails.seats?.map((seat: SeatDetail) => (
                  <div className={styles.items} key={seat._id}>
                    <Image
                      src={s3Url + seat.qrcode}
                      alt="qrcode"
                      width={100}
                      height={100}
                      className={`img-fluid ${styles.imgBar}`}
                    ></Image>
                    <div className={styles.info}>
                      <span className={styles.wing}>{seat.type}</span>
                      <span className={styles.wingInfo}>
                        {seat.label}-{seat.seatNo}
                      </span>
                      <span className={styles.bookingId}>
                        Booking ID : {seat._id}
                      </span>
                    </div>
                  </div>
                ))}
                {ticketDetails.eventFlow === EventFlow.STANDING && (
                  <div className={styles.items}>
                    <Image
                      src={s3Url + ticketDetails.qrcode}
                      alt="qrcode"
                      width={100}
                      height={100}
                      className={`img-fluid ${styles.imgBar}`}
                    ></Image>
                    <div className={styles.info}>
                      <span className={styles.wing}>{"On ground Event"}</span>
                      <span className={styles.wingInfo}></span>
                      <span className={styles.bookingId}>
                        Booking ID : {ticketDetails._id}
                      </span>
                    </div>
                  </div>
                )}
              </div>
              <div className={styles.fees}>
                <ul>
                  <li>
                    <span>
                      {ticketDetails.name} x{" "}
                      <b>
                        {ticketDetails.eventFlow === EventFlow.STANDING
                          ? ticketDetails.totalSeat
                          : ticketDetails.seats?.length}
                      </b>{" "}
                      Ticket
                    </span>
                    <span>
                      <b> {ticketDetails.totalAmount} AED</b>
                    </span>
                  </li>
                  <li>
                    <span>Vat</span>
                    <span> {ticketDetails.vatAmount} AED</span>
                  </li>
                  <li>
                    <span>Discount </span>
                    <span> {ticketDetails.discount} AED</span>
                  </li>
                  <li>
                    <span>
                      <b>Total</b>
                    </span>
                    <span> {ticketDetails.amountAfterDiscount} AED</span>
                  </li>
                </ul>
              </div>
              <div className={styles.buttonGroupWrapper}>
                <div className={styles.butttonGroup}>
                  <button type="button" className={styles.btnDownload}>
                    Download
                  </button>
                  <button
                    type="button"
                    className={styles.btnDownload}
                    onClick={cancelThisBooking}
                  >
                    <FontAwesomeIcon icon={faTicket}></FontAwesomeIcon>
                    Cancel Booking
                  </button>
                  <button
                    type="button"
                    className={styles.btnDownload}
                    onClick={() => setOpenSupport(true)}
                  >
                    <FontAwesomeIcon icon={faCircleUser}></FontAwesomeIcon>
                    Support
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CustomModal>
  );
};

export default ViewTicket;
