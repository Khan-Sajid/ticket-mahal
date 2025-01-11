"use client";
import React, { useEffect, useState } from "react";
import { isArrayEmpty, isObjectEmpty } from "@/utils/utils";
import Spinner from "../ui/spinner/spinner";
import TopBanner from "./top-banner/top-banner";
import RecommendedEvents from "./recommended-events/recommended-events";
import UpcomingEvents from "./upcoming-events/upcoming-events";
import PremiumEvents from "./premium-events/premium-events";
import PastEvents from "./past-events/past-events";
import { getAllHomepageEvents } from "./home.http";
import { useAtom } from "jotai";
import { homePageEvents, userPrefferedLocation } from "@/jotai/atoms";

const HomePage = () => {
  const [homePageEventsData, setHomePageEventsData] = useAtom(homePageEvents);
  const [prefferedLocation, _] = useAtom(userPrefferedLocation);
  const [isLoading, setIsLoading] = useState(true);

  async function fetchAllHomePageEvents(abortControl: AbortController) {
    setIsLoading(true);
    try {
      const res = await getAllHomepageEvents(
        {
          cityId: prefferedLocation?.city?._id,
        },
        abortControl
      );
      if (res.statusCode === 200 && res.data) {
        setHomePageEventsData(res.data);
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
    //  finally {
    //   setIsLoading(false);
    // }
  }

  useEffect(() => {
    const abortControl = new AbortController();
    fetchAllHomePageEvents(abortControl);
    return () => {
      abortControl.abort();
      setHomePageEventsData(undefined);
    };
  }, [JSON.stringify(prefferedLocation)]);

  if (isLoading)
    return (
      <div style={{ height: "100vh", width: "100vw" }}>
        <Spinner inline={true} />
      </div>
    );

  return (
    <>
      {homePageEventsData?.banner &&
        !isObjectEmpty(homePageEventsData.banner) && (
          <TopBanner event={homePageEventsData.banner} />
        )}
      {!isLoading && (
        <>
          {homePageEventsData?.recommended &&
            !isArrayEmpty(homePageEventsData.recommended) && (
              <RecommendedEvents events={homePageEventsData.recommended} />
            )}
          {homePageEventsData?.upcomming &&
            !isArrayEmpty(homePageEventsData.upcomming) && (
              <UpcomingEvents
                events={homePageEventsData.upcomming}
                isRecommended={!isArrayEmpty(homePageEventsData.recommended)}
              />
            )}
          {homePageEventsData?.premium &&
            !isArrayEmpty(homePageEventsData.premium) && (
              <PremiumEvents events={homePageEventsData.premium} />
            )}
          {homePageEventsData?.past &&
            !isArrayEmpty(homePageEventsData.past) && (
              <PastEvents events={homePageEventsData.past} />
            )}
        </>
      )}
    </>
  );
};

export default HomePage;
