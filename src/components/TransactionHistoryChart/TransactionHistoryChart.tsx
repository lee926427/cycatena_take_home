import { useCallback, useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { fetchTransactionHistory } from "../../api/fetchTransactionHistory";
import { LoadingView } from "../LoadingView";

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
      text: `Transaction history in ${days} days`,
      align: "left",
      style: {
        color: "#aaa",
        fontWeight: "normal",
        fontSize: 14,
      },
    },
    chart: {
      height: 160,
    },
    xAxis: {
      type: "datetime",
      lineWidth: 0,
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
    return (
      <div className="w-full h-full flex items-center justify-center">
        <LoadingView />
      </div>
    );
  }

  return <HighchartsReact highcharts={Highcharts} options={chartOptions} />;
}
