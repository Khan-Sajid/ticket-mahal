export const BookingStageType = [
  {
    id: 1,
    name: "Wing A",
    des: "Standard Admission",
    fees: "499.00",
  },
  {
    id: 2,
    name: "Wing B",
    des: "Standard Admission",
    fees: "499.00",
  },
  {
    id: 3,
    name: "Wing C",
    des: "Standard Admission",
    fees: "499.00",
  },
  {
    id: 4,
    name: "Wing D",
    des: "Standard Admission",
    fees: "499.00",
  },
];

interface Seat {
  id: number;
  seatNo: number;
  type: string;
  fees: number;
}

interface Arrangement {
  [key: string]: Seat[];
}

interface TypeData {
  typeFees: string;
  settingArragement: Arrangement[];
}

interface Data {
  [key: string]: TypeData;
}

export const data: Data = {
  typeA: {
    typeFees: "299 AED Onwards",
    settingArragement: [
      {
        A: [
          { id: 1, seatNo: 1, type: "normal", fees: 499 },
          { id: 2, seatNo: 2, type: "premium", fees: 499 },
          { id: 3, seatNo: 3, type: "booked", fees: 499 },
          { id: 4, seatNo: 4, type: "normal", fees: 499 },
          { id: 4, seatNo: 5, type: "normal", fees: 499 },
          { id: 6, seatNo: 6, type: "normal", fees: 499 },
          { id: 7, seatNo: 7, type: "normal", fees: 499 },
          { id: 8, seatNo: 8, type: "normal", fees: 499 },
          { id: 9, seatNo: 9, type: "normal", fees: 499 },
          { id: 10, seatNo: 10, type: "normal", fees: 499 },
        ],
        B: [
          { id: 1, seatNo: 1, type: "normal", fees: 499 },
          { id: 2, seatNo: 2, type: "normal", fees: 499 },
          { id: 3, seatNo: 3, type: "premium", fees: 499 },
          { id: 4, seatNo: 4, type: "normal", fees: 499 },
          { id: 4, seatNo: 5, type: "premium", fees: 499 },
          { id: 6, seatNo: 6, type: "normal", fees: 499 },
          { id: 7, seatNo: 7, type: "normal", fees: 499 },
          { id: 8, seatNo: 8, type: "normal", fees: 499 },
          { id: 9, seatNo: 9, type: "normal", fees: 499 },
          { id: 10, seatNo: 10, type: "premium", fees: 499 },
        ],
      },
    ],
  },
  typeB: {
    typeFees: "499 AED Onwards",
    settingArragement: [
      {
        C: [
          { id: 1, seatNo: 1, type: "normal", fees: 499 },
          { id: 2, seatNo: 2, type: "normal", fees: 499 },
          { id: 3, seatNo: 3, type: "normal", fees: 499 },
          { id: 4, seatNo: 4, type: "normal", fees: 499 },
          { id: 4, seatNo: 5, type: "normal", fees: 499 },
          { id: 6, seatNo: 6, type: "normal", fees: 499 },
          { id: 7, seatNo: 7, type: "normal", fees: 499 },
          { id: 8, seatNo: 8, type: "normal", fees: 499 },
          { id: 9, seatNo: 9, type: "normal", fees: 499 },
          { id: 10, seatNo: 10, type: "normal", fees: 499 },
          { id: 11, seatNo: 11, type: "normal", fees: 499 },
          { id: 12, seatNo: 12, type: "normal", fees: 499 },
        ],
        D: [
          { id: 1, seatNo: 1, type: "normal", fees: 499 },
          { id: 2, seatNo: 2, type: "normal", fees: 499 },
          { id: 3, seatNo: 3, type: "normal", fees: 499 },
          { id: 4, seatNo: 4, type: "normal", fees: 499 },
          { id: 4, seatNo: 5, type: "booked", fees: 499 },
          { id: 6, seatNo: 6, type: "normal", fees: 499 },
          { id: 7, seatNo: 7, type: "normal", fees: 499 },
          { id: 8, seatNo: 8, type: "normal", fees: 499 },
          { id: 9, seatNo: 9, type: "normal", fees: 499 },
          { id: 10, seatNo: 10, type: "booked", fees: 499 },
          { id: 11, seatNo: 11, type: "normal", fees: 499 },
          { id: 12, seatNo: 12, type: "premium", fees: 499 },
        ],
        E: [
          { id: 1, seatNo: 1, type: "premium", fees: 499 },
          { id: 2, seatNo: 2, type: "normal", fees: 499 },
          { id: 3, seatNo: 3, type: "normal", fees: 499 },
          { id: 4, seatNo: 4, type: "normal", fees: 499 },
          { id: 4, seatNo: 5, type: "normal", fees: 499 },
          { id: 6, seatNo: 6, type: "normal", fees: 499 },
          { id: 7, seatNo: 7, type: "premium", fees: 499 },
          { id: 8, seatNo: 8, type: "normal", fees: 499 },
          { id: 9, seatNo: 9, type: "normal", fees: 499 },
          { id: 10, seatNo: 10, type: "normal", fees: 499 },
          { id: 11, seatNo: 11, type: "normal", fees: 499 },
          { id: 12, seatNo: 12, type: "booked", fees: 499 },
        ],
        F: [
          { id: 1, seatNo: 1, type: "normal", fees: 499 },
          { id: 2, seatNo: 2, type: "normal", fees: 499 },
          { id: 3, seatNo: 3, type: "normal", fees: 499 },
          { id: 4, seatNo: 4, type: "normal", fees: 499 },
          { id: 4, seatNo: 5, type: "normal", fees: 499 },
          { id: 6, seatNo: 6, type: "normal", fees: 499 },
          { id: 7, seatNo: 7, type: "normal", fees: 499 },
          { id: 8, seatNo: 8, type: "normal", fees: 499 },
          { id: 9, seatNo: 9, type: "normal", fees: 499 },
          { id: 10, seatNo: 10, type: "normal", fees: 499 },
          { id: 11, seatNo: 11, type: "normal", fees: 499 },
          { id: 12, seatNo: 12, type: "normal", fees: 499 },
        ],
        G: [
          { id: 1, seatNo: 1, type: "normal", fees: 499 },
          { id: 2, seatNo: 2, type: "normal", fees: 499 },
          { id: 3, seatNo: 3, type: "normal", fees: 499 },
          { id: 4, seatNo: 4, type: "normal", fees: 499 },
          { id: 4, seatNo: 5, type: "normal", fees: 499 },
          { id: 6, seatNo: 6, type: "normal", fees: 499 },
          { id: 7, seatNo: 7, type: "normal", fees: 499 },
          { id: 8, seatNo: 8, type: "normal", fees: 499 },
          { id: 9, seatNo: 9, type: "normal", fees: 499 },
          { id: 10, seatNo: 10, type: "normal", fees: 499 },
          { id: 11, seatNo: 11, type: "normal", fees: 499 },
          { id: 12, seatNo: 12, type: "normal", fees: 499 },
        ],
        H: [
          { id: 1, seatNo: 1, type: "premium", fees: 499 },
          { id: 2, seatNo: 2, type: "premium", fees: 499 },
          { id: 3, seatNo: 3, type: "premium", fees: 499 },
          { id: 4, seatNo: 4, type: "premium", fees: 499 },
          { id: 4, seatNo: 5, type: "booked", fees: 499 },
          { id: 6, seatNo: 6, type: "booked", fees: 499 },
          { id: 7, seatNo: 7, type: "booked", fees: 499 },
          { id: 8, seatNo: 8, type: "booked", fees: 499 },
          { id: 9, seatNo: 9, type: "premium", fees: 499 },
          { id: 10, seatNo: 10, type: "premium", fees: 499 },
          { id: 11, seatNo: 11, type: "premium", fees: 499 },
          { id: 12, seatNo: 12, type: "premium", fees: 499 },
        ],
      },
    ],
  },
};
