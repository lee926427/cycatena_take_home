import { useCallback, useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { fetchTransactionHistory } from "../../api/fetchTransactionHistory";

type TransactionHistoryChartProps = {
  days: number;
};

export function TransactionHistoryChart({
  days = 14,
}: TransactionHistoryChartProps) {
  const [data, setData] = useState<number[][]>([]);

  const getTransactionHistory = useCallback(async () => {
    const transactionHistory = await fetchTransactionHistory(days);

    setData(transactionHistory);
  }, [days]);

  useEffect(() => {
    getTransactionHistory();
  }, [getTransactionHistory]);

  const chartOptions = {
    title: {
      text: `TRANSACTION HISTORY IN ${days} DAYS`,
      align: "left",
    },
    chart: {
      height: 160,
    },
    series: [
      {
        type: "spline",
        data: data,
      },
    ],
    legend: { enabled: false },
  };

  if (data.length === 0) {
    return <div className="w-full h-40">loading</div>;
  }

  return <HighchartsReact highcharts={Highcharts} options={chartOptions} />;
}
