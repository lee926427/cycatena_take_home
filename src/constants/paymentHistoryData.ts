import { clamp, format, add } from "date-fns";

export type PaymentHistoryProps = {
  dateCreated: string;
  description: string;
  amount: number;
  status: boolean;
};

const descriptions = [
  "Buy a car",
  "Buy a cow",
  "Buy drinks",
  "Buy a bicycle",
  "Buy a dinner",
  "Buy a table",
];
export const makePaymentHistoryData = (startTime: Date, endTime: Date) => {
  const mockData: PaymentHistoryProps[] = [];

  const randomTime = () =>
    add(startTime, {
      months: Math.ceil(Math.random() * 3),
      days: Math.ceil(Math.random() * 30),
      hours: Math.ceil(Math.random() * 24),
      minutes: Math.ceil(Math.random() * 60),
    });

  return (count = 30) => {
    for (let i = 0; i < count; i++) {
      const dateCreated = clamp(randomTime(), {
        start: startTime,
        end: endTime,
      });

      mockData.push({
        dateCreated: format(new Date(dateCreated), "MM/dd/yy hh:mm aa"),
        description:
          descriptions[Math.floor(Math.random() * descriptions.length)],
        amount: Math.floor(Math.random() * 6000),
        status: Math.ceil(Math.random() * 2) === 1,
      });
    }

    return mockData;
  };
};
