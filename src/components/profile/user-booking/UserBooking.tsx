"use client";
import React, { useEffect, useRef, useState } from "react";
import BookingCard from "../booking-card/BookingCard";
import { BookingStatus, TABS } from "../profile.enum";
import { getBookings } from "../profile.http";
import classNames from "classnames";

const UserBooking = () => {
  const pageStatus = useRef({ page: 1, limit: 10, isNextPage: false });
  const [bookings, setBookings] = useState<any>([]);
  const [activeTab, setActiveTab] = useState(BookingStatus.ALL);

  async function fetchBookings(status: BookingStatus) {
    const res = await getBookings({ ...pageStatus.current, status: status });
    if (res && res.statusCode === 200) {
      pageStatus.current = {
        ...pageStatus.current,
        isNextPage: res.data.isNextPage,
      };
      setBookings([...bookings, ...res.data.bookings]);
    }
  }

  function fetchMoreData() {
    pageStatus.current = {
      page: pageStatus.current.page + 1,
      limit: 10,
      isNextPage: false,
    };
    fetchBookings(activeTab);
  }

  function changeTab(tab: BookingStatus) {
    resetPageTostart();
    setBookings([]);
    setActiveTab(tab);
  }

  function resetPageTostart() {
    pageStatus.current = { page: 1, limit: 10, isNextPage: false };
  }

  useEffect(() => {
    resetPageTostart();
    fetchBookings(activeTab);
  }, [activeTab]);

  return (
    <>
      <h3 className="headingTwo">My Bookings</h3>
      <ul className="tabList">
        {TABS.map((tab) => (
          <li
            className={classNames("item", { active: tab.key == activeTab })}
            key={tab.key}
            onClick={() => changeTab(tab.key)}
          >
            {tab.text}
          </li>
        ))}
      </ul>
      <BookingCard
        bookings={bookings}
        fetchMoreData={fetchMoreData}
        isNextPage={pageStatus.current.isNextPage}
      ></BookingCard>
    </>
  );
};

export default UserBooking;
