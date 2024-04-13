import { add } from "date-fns";

export async function fetchTransactionHistory(
  days: number,
): Promise<number[][]> {
  return new Promise((resolve) => {
    const mockData: number[][] = [];

    for (let i = 0; i < days; i++) {
      mockData.push([
        Date.UTC(2023, 3, i + 1),
        Math.round(Math.random() * 10000) + 400,
      ]);
    }

    setTimeout(() => {
      resolve(mockData);
    }, 3000);
  });
}
