import SinglePageBanner from "@/components/single-page-banner/SinglePageBanner";
import React from "react";
import { notFound } from "next/navigation";
import { getEventDetail } from "@/app/event-detail/[eventName]/[id]/eventDetail.http";
import { IEventDetail } from "@/app/event-detail/[eventName]/[id]/eventDetail.types";
import SittingArrangement from "@/components/bookings/sittingArrangement/sittingArrangement";
import { EventFlow } from "@/utils/enums";
import StandingArrangement from "@/components/bookings/standingArrangement/standingArrangement";

const page = async ({
  params,
}: {
  params: { eventName: string; id: string };
}) => {
  const { eventName, id } = params;
  if (!id) return notFound();

  const eventDetalRes = await getEventDetail(id);
  console.log("🚀 ~ eventDetalRes:", id, eventDetalRes);
  if (eventDetalRes.statusCode !== 200 || !eventDetalRes.data) {
    return notFound();
  }
  const eventDetail: IEventDetail = eventDetalRes.data;

  return (
    <div style={{ background: "var(--light-6)" }}>
      {eventDetail && (
        <SinglePageBanner
          key={eventDetail._id}
          {...eventDetail}
          noBookingBtn={true}
        ></SinglePageBanner>
      )}
      {eventDetail.eventFlow === EventFlow.SITTING && (
        <SittingArrangement eventDetail={eventDetail} />
      )}
      {eventDetail.eventFlow === EventFlow.STANDING && (
        <StandingArrangement eventDetail={eventDetail} />
      )}
    </div>
  );
};

export default page;
