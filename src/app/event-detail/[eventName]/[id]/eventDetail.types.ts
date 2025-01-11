import { EventFlow } from "@/utils/enums";

export interface IEventDetail {
  _id: string;
  categoryId: string;
  cityId: string;
  eventName: string;
  eventDes: string;
  eventImage: string;
  videoUrl: string;
  eventMoreDes: string;
  images: string[];
  isPremium: boolean;
  isTrending: boolean;
  isPopular: boolean;
  tags: string[];
  eventDate: Date;
  totalSeat: number;
  eventPrice: number;
  viewCount: number;
  bookedSeat: number;
  rating: number;
  totalComment: number;
  stages: Stage[];
  sitting: seatType[];
  location: Location;
  status: string;
  isBanner: boolean;
  favUserIds: any[];
  eventBannerImage: string;
  eventAddress: string;
  isFav: boolean;
  userIds: string[];
  eventFlow: EventFlow;
  stageImage: string;
}

export interface Location {
  type: string;
  coordinates: number[];
}

// export interface Sitting {
//   VIP: Vip;
// }

export interface seatType {
  typeFees: string;
  arrangements: SeatDetail[];
}

// export interface Arrangement {
//   front: Back[];
//   back: Back[];
// }
//  seatNo: "1",
//           type: "vip",
//           isBooked: false,
//           fees: 100,
//           label: "A",
//           _id: "674f28627eebcebb9c5dbd6b",

export interface SeatDetail {
  _id: number;
  seatNo: number;
  type: string;
  fees: number;
  isBooked: boolean;
  label: string;
  qrcode: string;
}

export interface Stage {
  id: number;
  name: string;
  des: string;
  fees: number;
}
