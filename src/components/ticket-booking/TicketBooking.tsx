"use client";
import React, { useEffect, useState } from "react";
import styles from "./TicketBooking.module.scss";
import Image from "next/image";
import {
  IEventDetail,
  SeatDetail,
} from "@/app/event-detail/[eventName]/[id]/eventDetail.types";
import { EventFlow } from "@/utils/enums";
import { checkoutBooking } from "./ticketBooking.http";
import { ICheckoutPayload } from "@/interfaces";

const TiketBooking = (
  props: IEventDetail & {
    seatsSelected?: Record<string, SeatDetail>;
    onConflictingSeats: (seats: Record<string, SeatDetail>) => void;
    setSeatsSelected: (seats: Record<string, SeatDetail>) => void;
  }
) => {
  console.log("props", props);

  const { seatsSelected, setSeatsSelected, onConflictingSeats } = props;
  const [count, setCount] = useState<string>("0");
  const [couponCode, setCouponCode] = useState("");
  const [isLoadingTicketAmount, setIsLoadingTicketAmount] = useState(false);
  const [ticketsDetails, setTicketsDetails] = useState<any>({
    amountAfterVat: 0,
    totalAmount: 0,
    inValidCouponCode: false,
  });

  function handleInput(e: any) {
    const name = e.target.name;
    if (name === "ticketCount") {
      const maxSeatToBeBooked = props.totalSeat - props.bookedSeat;
      if (
        props?.eventFlow === EventFlow.STANDING &&
        maxSeatToBeBooked >= e.target.value
      )
        setCount(e.target.value);
    } else if (name === "couponCode") {
      setCouponCode(e.target.value);
    }
  }

  async function checkSelectedTicketsAvailability() {
    setIsLoadingTicketAmount(true);
    if ((!seatsSelected || !Object.keys(seatsSelected).length) && !+count)
      return;
    const body = preparePayload();
    const res = await checkoutBooking(body);
    if ([200, 201].includes(res.statusCode)) {
      const { data } = res;
      if (
        props.eventFlow === EventFlow.SITTING &&
        JSON.stringify(data.seats) !== JSON.stringify(seatsSelected) &&
        !couponCode
      ) {
        onConflictingSeats(data.bookedSeats);
        setSeatsSelected(data.seats);
      }
      setTicketsDetails({
        amountAfterVat: data.amountAfterVat,
        totalAmount: data.totalAmount,
        inValidCouponCode: data.inValidCouponCode ?? false,
      });
    }
    setIsLoadingTicketAmount(false);
  }

  function preparePayload(): ICheckoutPayload {
    const body = {} as any;
    body["eventId"] = props._id;
    body["eventFlow"] = props.eventFlow;
    body["totalSeat"] = seatsSelected
      ? Object.keys(seatsSelected).length
      : +count;
    if (seatsSelected) body["seats"] = Object.values(seatsSelected);
    if (couponCode) body["code"] = couponCode;
    return body;
  }

  function preventInvalidInput(e: any) {
    // Block 'e', '.', and '-' (for negatives) keys
    if (["e", "E", ".", "-"].includes(e.key)) {
      e.preventDefault();
    }
    // Remove decimals or invalid characters if pasted
    const input = e.target;
    const validValue = input.value
      .replace(/[eE.\-]/g, "")
      .replace(/^0+(?!$)/, "");
    input.value = validValue;
  }

  useEffect(() => {
    checkSelectedTicketsAvailability();
  }, [seatsSelected, count]);

  if (!props || !Object.keys(props).length) return null;

  let sittingTicketPrice = 0;
  if (seatsSelected) {
    sittingTicketPrice = Object.values(seatsSelected).reduce(
      (acc, val) => acc + val.fees,
      0
    );
  }

  return (
    <div className={styles.ticketWrap}>
      <h3>Ticket Description</h3>
      {props.eventFlow === EventFlow.STANDING && (
        <div className={styles.counterWrap}>
          <span className={styles.title}>Ticket Count</span>
          <span>
            <div className={styles.formGroup}>
              <input
                type="number"
                value={count}
                name="ticketCount"
                onChange={handleInput}
                required
                onKeyDown={preventInvalidInput}
                onInput={preventInvalidInput}
                className={styles.formControl}
                min="1"
                max="10"
              />
            </div>
          </span>
        </div>
      )}
      <ul className={styles.ticketType}>
        {((props?.eventFlow === EventFlow.STANDING && +count <= 0) ||
          (props?.eventFlow === EventFlow.SITTING &&
            seatsSelected &&
            Object.keys(seatsSelected).length <= 0)) && (
          <li className={styles.noTicketSelect}>
            <Image
              src="/images/card.svg"
              width={100}
              height={100}
              alt="cart"
            ></Image>
            <h5>No Ticket Selected</h5>
            <p>Select ticket as per seat avaiblity</p>
          </li>
        )}
        {props?.eventFlow === EventFlow.SITTING &&
          seatsSelected &&
          Object.keys(seatsSelected).length > 0 && (
            <div className={styles.tickets}>
              {Object.values(seatsSelected).map((ticket) => {
                return (
                  <li key={ticket._id}>
                    <span className={styles.info}>
                      {ticket.label}-{ticket.seatNo}
                    </span>
                    <span className={styles.fees}>
                      {ticket.fees?.toFixed(2)}
                      {" AED "}
                    </span>
                  </li>
                );
              })}
            </div>
          )}
        <li className={styles.coupon}>
          <div>
            <input
              className={styles.couponInput}
              type="text"
              name="couponCode"
              placeholder="Coupon Code"
              onChange={handleInput}
            />
            <button
              className="btnTheme"
              disabled={
                isLoadingTicketAmount ||
                !couponCode.length ||
                (!+count && seatsSelected && !Object.keys(seatsSelected).length)
              }
              onClick={checkSelectedTicketsAvailability}
            >
              Apply
            </button>
          </div>
          {ticketsDetails.inValidCouponCode && (
            <p>This Coupon code is invalid.</p>
          )}
        </li>
        <li className={styles.bold}>
          <span className={styles.info}>
            <h2>Subtotal</h2>
            {count && !isNaN(+count) && Boolean(+count) && (
              <span>{count} Ticket</span>
            )}
            {seatsSelected && Object.keys(seatsSelected).length > 0 && (
              <span>{Object.keys(seatsSelected).length} Ticket</span>
            )}
          </span>
          <span className={styles.fees}>
            {seatsSelected && Object.keys(seatsSelected).length > 0 ? (
              <>{ticketsDetails?.totalAmount?.toFixed(2)} </>
            ) : (
              <>{ticketsDetails?.totalAmount?.toFixed(2)}</>
            )}
            {" AED"}
          </span>
        </li>
        <li className={styles.bold}>
          <span className={styles.info}>
            <h2>Vat</h2>
          </span>
          {!isLoadingTicketAmount && (
            <span className={styles.fees}>
              {seatsSelected && Object.keys(seatsSelected).length > 0 ? (
                <>
                  {(
                    ticketsDetails.amountAfterVat - ticketsDetails.totalAmount
                  ).toFixed(2)}
                  {" AED"}
                </>
              ) : (
                <>
                  {(
                    ticketsDetails.amountAfterVat - ticketsDetails.totalAmount
                  ).toFixed(2)}
                  {" AED"}
                </>
              )}
            </span>
          )}
        </li>
      </ul>
      {props?.eventFlow === EventFlow.STANDING && +count > 0 && (
        <button
          type="button"
          className="btnTheme d-block w-100"
          disabled={isLoadingTicketAmount}
        >
          {!isLoadingTicketAmount ? (
            <>
              Make Payment {ticketsDetails.amountAfterVat.toFixed(2)} {" AED"}
            </>
          ) : (
            <>Calculating...</>
          )}
        </button>
      )}
      {props?.eventFlow === EventFlow.SITTING &&
        seatsSelected &&
        Object.keys(seatsSelected).length > 0 && (
          <button
            type="button"
            className="btnTheme d-block w-100"
            disabled={isLoadingTicketAmount}
          >
            {!isLoadingTicketAmount ? (
              <>
                Make Payment {ticketsDetails.amountAfterVat.toFixed(2)}
                {" AED"}
              </>
            ) : (
              <>Calculating...</>
            )}
          </button>
        )}
    </div>
  );
};

export default TiketBooking;
