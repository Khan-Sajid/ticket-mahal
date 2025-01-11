import { EventFlow } from "@/utils/enums";

export interface Event {
  _id: string;
  eventName: string;
  eventImage: string;
  eventAddress: string;
  eventDate: Date;
  isFav?: boolean;
  eventFlow: EventFlow;
}
export interface BannerEvent extends Event {
  eventDes: string;
  eventDuration?: string;
  eventBannerImage: string;
  eventPrice: number;
}
export interface RecommendedEvent extends Event {}
export interface UpcomingEvent extends Event {}
export interface PremiumEvent extends Event {}
export interface PastEvent extends Event {
  eventDes: string;
  viewCount: string;
  totalSeat: string;
  bookedSeat: string;
  rating: string;
  totalComment: string;
}

export interface HomeEvents {
  banner: BannerEvent;
  recommendedEvents: Event[];
  upcomingEvents: Event[];
  premiumEvents: Event[];
  pastEvents: PastEvent[];
}

export interface HomePageData {
  banner: BannerEvent;
  recommended: Event[];
  upcomming: Event[];
  premium: Event[];
  past: PastEvent[];
}
