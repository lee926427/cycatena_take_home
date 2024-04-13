export async function fetchTransactionHistory(
  days: number,
): Promise<number[][]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        [1712471088417, 1],
        [1712671088417, 2],
        [1712971088417, 3],
      ]);
    }, 3000);
  });
}
