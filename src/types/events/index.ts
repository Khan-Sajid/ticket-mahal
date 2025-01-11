import {
  BannerEvent,
  PastEvent,
  PremiumEvent,
  RecommendedEvent,
  UpcomingEvent,
} from "@/interfaces/home";

export type RecommendedEventsProps = {
  events: RecommendedEvent[];
};
export type UpcomingEventsProps = {
  events: UpcomingEvent[];
};
export type PremiumEventsProps = {
  events: PremiumEvent[];
};
export type PastEventsProps = {
  events: PastEvent[];
};
export type BannerEventProps={
  event:BannerEvent
}
