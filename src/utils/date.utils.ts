export function formatDate(utcDate: Date | string): string {
  const date = new Date(utcDate);
  if (isNaN(date.getTime())) return "";
  const options: any = {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };
  return new Intl.DateTimeFormat("en-US", options).format(date);
}

export function formatTime(isoString: string | Date): string {
  const date = new Date(isoString);
  if (isNaN(date.getTime())) return "";

  let hours = date.getHours();
  const minutes = date.getMinutes();
  const amPm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12; // `|| 12` ensures 0 becomes 12 for midnight

  // Format minutes to always have two digits
  const formattedMinutes = minutes.toString().padStart(2, "0");
  return `${hours}:${formattedMinutes} ${amPm}`;
}
