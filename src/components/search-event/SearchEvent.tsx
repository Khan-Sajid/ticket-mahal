"use client";
import React from "react";
import SearchEventBanner from "../search-event-banner/SearchEventBanner";
import { TopBannerEvent } from "@/app/data/home";
import AlsoSearchEvent from "../also-search/AlsoSearch";
import Card from "./card/Card";
import styles from "./SearchEvent.module.scss";
import { BannerEvent } from "@/interfaces/home";

const SearchEventPage = ({ events }: any) => {
  return (
    <div>
      <SearchEventBanner
        eventName={"Signature Moments: A Celebration of Signings"}
        eventDes={"Search Result : Latest Events"}
      ></SearchEventBanner>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h3 className={styles.heading}>Your Search Events</h3>
            {events?.length ? (
              <>
                {events?.map((item: BannerEvent) => (
                  <Card key={item._id} {...item}></Card>
                ))}
              </>
            ) : (
              <div className={styles.notFound}>
                <p>No Events Found</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <AlsoSearchEvent></AlsoSearchEvent>
    </div>
  );
};

export default SearchEventPage;
