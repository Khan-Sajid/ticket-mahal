import React from "react";
import EventDetail from "@/components/event-detail/EventDetail";
import { notFound } from "next/navigation";
import { getEventDetail } from "./eventDetail.http";

const Detail = async ({ params }: { params: Promise<{ id: string }> }) => {
  const eventId = (await params)?.id;
  if (!eventId) notFound();
  const eventDetailRes = await getEventDetail(eventId);
  if (eventDetailRes.statusCode !== 200 || !eventDetailRes.data) {
    console.log("🚀 ~ Detail ~ eventDetailRes:", eventDetailRes);
    notFound();
  }
  return <EventDetail eventDetailData={eventDetailRes.data}></EventDetail>;
};

export default Detail;
