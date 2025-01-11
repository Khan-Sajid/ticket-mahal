import { SeatDetail } from "@/app/event-detail/[eventName]/[id]/eventDetail.types";

export interface ICheckoutPayload {
  code?: string;
  eventId: string;
  totalSeat?: number;
  seats: SeatDetail[];
  paymentInfo?: PaymentInfo;
  eventFlow: string;
}

export interface PaymentInfo {
  cardNumber: string;
  cardHolderName: string;
  expiryDate: string;
  cvv: string;
}
