import SeeAllPage from "@/components/see-all/SeeAllPage";
import {
  getAllEvents,
  getBannerData,
} from "@/components/see-all/seeAllPage.http";
import { Event } from "@/interfaces/home";
import { EventType } from "@/utils/enums";
import { notFound } from "next/navigation";
import React from "react";

const SeeAll = async ({
  params,
  searchParams,
}: {
  params: Promise<{ eventType: EventType }>;
  searchParams: Promise<Record<string, string>>;
}) => {
  const eventType = (await params)?.eventType;
  const categoryId = (await searchParams)?.categoty_id;
  if (!eventType) return notFound();

  const eventsResponse = await getAllEvents<{
    events: Event[];
    isNextPage: boolean;
    categoryId?: string;
  }>({
    eventType: eventType,
    categoryId,
    page: 1,
    limit: 20,
  });

  if (eventsResponse.statusCode !== 200 || !eventsResponse.data)
    return notFound();

  const bannerDataRes = await getBannerData();

  return (
    <SeeAllPage
      eventsData={eventsResponse?.data}
      eventType={eventType}
      bannerData={bannerDataRes?.data}
    ></SeeAllPage>
  );
};

export default SeeAll;
