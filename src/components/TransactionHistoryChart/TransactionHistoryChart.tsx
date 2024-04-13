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
  const [data, setData] = useState<[Date, number][]>([]);

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
      height: 180,
    },
    xAxis: {
      type: "datetime",
      tickWidth: 0,
      dateTimeLabelFormats: {
        month: "%b. %e",
        year: "%b",
      },
    },
    yAxis: {
      endOnTick: false,
      startOnTick: false,
      gridLineWidth: 0,
      title: {
        text: null,
      },
    },
    series: [
      {
        name: "Transactions",
        type: "spline",
        data: data,
      },
    ],
    plotOptions: {
      spline: {
        color: "#000000",
        lineWidth: 1,
        marker: {
          enabled: false,
        },
      },
    },
    tooltip: {
      pointFormat: "Transactions: {point.y} <br>",
    },
    legend: { enabled: false },
  };

  if (data.length === 0) {
    return <div className="w-full h-40">loading</div>;
  }

  return <HighchartsReact highcharts={Highcharts} options={chartOptions} />;
}
