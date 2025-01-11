import SearchEventPage from "@/components/search-event/SearchEvent";
import { getSearchEvents } from "@/components/search-event/searchEvent.http";
import { EventType } from "@/utils/enums";
import { notFound } from "next/navigation";
import React from "react";

const SearchEvent = async ({
  params,
}: {
  params: Promise<{ searchText: EventType }>;
}) => {
  const searchText = (await params)?.searchText;
  if (!searchText) return notFound();

  const eventsResponse = await getSearchEvents({
    search: searchText,
    limit: 20,
  });

  if (eventsResponse.statusCode !== 200 || !eventsResponse.data) {
    return notFound();
  }
  return <SearchEventPage events={eventsResponse.data}></SearchEventPage>;
};

export default SearchEvent;
