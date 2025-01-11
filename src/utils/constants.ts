import { EventFlow } from "./enums";

export const PREFERRED_LOCATION = "pref_loc";

export const BOOKING_FLOW_PATH = {
  [EventFlow.DEFAULT]: "/standing-booking",
  [EventFlow.SITTING]: "/sitting-booking",
  [EventFlow.STANDING]: "/standing-booking",
};

export const DAYS_OF_WEEK = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
export const MONTHS_OF_YEAR = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
