export enum BookingStatus {
  ALL = "all",
  UPCOMING = "upcoming",
  PAST = "past",
}

export const TABS = [
  { key: BookingStatus.ALL, text: "All Bookings" },
  { key: BookingStatus.PAST, text: "Past" },
  { key: BookingStatus.UPCOMING, text: "Upcoming" },
];
