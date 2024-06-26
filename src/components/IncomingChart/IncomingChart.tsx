import { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { LoadingView } from "../LoadingView";

type ItemProps = {
  name: string;
  data: number[];
  type: string;
  color: string;
  pointStart: number;
  pointInterval: number;
  yAxis?: number;
  negativeColor?: string;
};

export function IncomingChart() {
  const [data, setData] = useState<ItemProps[]>([]);

  const chartOptions = {
    title: {
      text: null,
      align: "left",
    },
    chart: {
      type: "column",
      backgroundColor: "#00000000",
      width: 780,
      height: 1000,
    },
    xAxis: {
      type: "datetime",
      title: {
        text: null,
        style: {
          color: "#fff",
        },
      },
      labels: {
        style: {
          color: "#fff",
        },
      },
      tickInterval: 7 * 24 * 3600 * 1000, // one week
      tickWidth: 0,
    },

    yAxis: [
      {
        title: {
          text: "InComing",
          style: {
            color: "#fff",
          },
        },
        labels: {
          style: {
            color: "#fff",
          },
        },
      },
      {
        title: {
          text: "Balance",
          style: {
            color: "#fff",
          },
        },
        labels: {
          style: {
            color: "#fff",
          },
        },
        opposite: true,
      },
    ],
    plotOptions: {
      column: {
        grouping: false,
        shadow: false,
        borderWidth: 0,
        dataLabels: {
          enabled: false,
        },
      },
    },
    tooltip: {
      shared: true,
    },
    legend: {
      align: "left",
      verticalAlign: "bottom",
      borderWidth: 0,
      itemStyle: {
        color: "#aaa",
      },
      itemHoverStyle: {
        color: "#fff",
      },
    },
    series: data,
  };

  useEffect(() => {
    setTimeout(() => {
      setData([
        {
          name: "Incoming",
          data: [6.4, 5.2, 3.0, 0.2, 2.3, 5.5, 8.4, 8.3, 5.1, 0.9, 1.1, 4.0],
          type: "column",
          pointStart: Date.UTC(2023, 2, 1),
          pointInterval: 1000 * 60 * 60 * 24,
          color: "#685BAD",
        },
        {
          name: "Outgoing",
          data: [
            -6.4, -5.2, -3.0, -0.2, -2.3, -5.5, -8.4, -8.3, -5.1, -0.9, -1.1,
            -4.0,
          ],
          type: "column",
          pointStart: Date.UTC(2023, 2, 1),
          pointInterval: 1000 * 60 * 60 * 24,
          color: "#49CFAB",
          negativeColor: "#49CFAB",
        },
        {
          name: "Balance",
          data: [
            203.6, 198.8, 208.5, 213.6, 212.1, 221.1, 208.5, 213.6, 216.5,
            210.4, 218.8, 220.6,
          ],
          type: "spline",
          color: "#dca613",
          pointStart: Date.UTC(2023, 2, 1),
          pointInterval: 1000 * 60 * 60 * 24,
          yAxis: 1,
        },
      ]);
    }, 2800);
  }, []);

  if (data.length === 0) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <LoadingView />
      </div>
    );
  }

  return (
    <main className="h-full w-full flex items-center">
      <HighchartsReact highcharts={Highcharts} options={chartOptions} />
    </main>
  );
}
