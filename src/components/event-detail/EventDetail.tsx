"use client";
import React from "react";
import SinglePageBanner from "../single-page-banner/SinglePageBanner";
import AlsoLikeEvent from "../also-like-event/AlsoLikeEvent";
import styles from "./EventDetail.module.scss";
import EventSchedule from "./event-schedule/EventSchedule";
import Comment from "./comment/Comment";
import VideoSection from "./video/Video";
import ImageSection from "./image-gallery/ImageGallery";
import { IEventDetail } from "@/app/event-detail/[eventName]/[id]/eventDetail.types";
const EventDetail = ({
  eventDetailData,
}: {
  eventDetailData: IEventDetail;
}) => {
  return (
    <div style={{ background: "var(--light-6)" }}>
      <SinglePageBanner
        key={eventDetailData._id}
        _id={eventDetailData._id}
        eventName={eventDetailData.eventName}
        eventFlow={eventDetailData.eventFlow}
        eventPrice={eventDetailData.eventPrice}
        eventImage={eventDetailData.eventImage}
        eventAddress={eventDetailData.eventAddress}
        eventDate={eventDetailData.eventDate}
        eventBannerImage={eventDetailData.eventBannerImage}
        // eventDuration={eventDetailData.eventDuration}
        eventDes={eventDetailData.eventDes}
      ></SinglePageBanner>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className={styles.decriptionBox}>
              <h3 className="headingTwo">{eventDetailData.eventName}</h3>
              <p className="mt-0">{eventDetailData.eventDes}</p>
            </div>
          </div>
        </div>
        <div className={`row ${styles.infoSectionWrap}`}>
          <div className="col-lg-8 col-sm-12">
            <EventSchedule tags={eventDetailData.tags}></EventSchedule>
            <VideoSection
              key={eventDetailData._id}
              eventName={eventDetailData.eventName}
              videoUrl={eventDetailData.videoUrl}
            ></VideoSection>
            <div className={`${styles.decriptionBox} ${styles.roundCornor} `}>
              <h3 className="headingTwo">About Event</h3>
              <div
                dangerouslySetInnerHTML={{
                  __html: eventDetailData.eventMoreDes,
                }}
              />
            </div>
            <ImageSection
              key={eventDetailData._id}
              eventName={eventDetailData.eventName}
              images={eventDetailData.images}
            ></ImageSection>
          </div>
          <div className="col-lg-4 col-sm-12">
            <Comment
              eventId={eventDetailData._id}
              allRatings={eventDetailData.rating}
              totalComments={eventDetailData.totalComment}
            ></Comment>
          </div>
        </div>
        {eventDetailData?.location?.coordinates?.[0] &&
          eventDetailData?.location?.coordinates?.[1] && (
            <div className="row">
              <div className="col-md-12">
                <div
                  className={`${styles.decriptionBox} ${styles.roundCornor} ${styles.mapBox}`}
                >
                  <h3 className="headingTwo">{eventDetailData.eventAddress}</h3>
                  <iframe
                    src={`https://www.google.com/maps?q=${eventDetailData.location.coordinates[0]},${eventDetailData.location.coordinates[1]}&hl=es;z=14&output=embed`}
                    loading="lazy"
                  ></iframe>
                </div>
              </div>
            </div>
          )}
      </div>
      <AlsoLikeEvent></AlsoLikeEvent>
    </div>
  );
};

export default EventDetail;
