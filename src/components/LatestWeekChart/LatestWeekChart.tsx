import { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

export function LatestWeekChart() {
  const [data, setData] = useState<number[]>([]);

  const chartOptions = {
    title: {
      text: "Last 7 days",
      align: "left",
      style: {
        color: "#aaa",
        fontWeight: "normal",
        fontSize: 14,
      },
      x: -290,
    },
    chart: {
      type: "column",
      height: 160,
      spacingLeft: 300,
    },
    xAxis: {
      lineWidth: 0,
      categories: ["T", "F", "S", "S", "M", "T", "W"],
    },
    yAxis: {
      labels: {
        enabled: false,
      },
      max: 500,
      endOnTick: false,
      startOnTick: false,
      gridLineWidth: 0,
      title: {
        text: null,
      },
    },
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
    series: [
      {
        name: null,
        data: [500, 500, 500, 500, 500, 500, 500],
        color: "#f1f1f1",
        enableMouseTracking: false,
        pointPadding: 0.3,
      },
      {
        name: null,
        data: data,
        color: "#3F8FD5",
        enableMouseTracking: false,
        pointPadding: 0.3,
      },
    ],
    tooltip: {
      pointFormat: "Transactions: {point.y} <br>",
    },
    legend: { enabled: false },
  };

  useEffect(() => {
    setTimeout(() => {
      setData([434, 290, 307, 260, 344, 187, 264]);
    }, 3600);
  }, []);

  if (data.length === 0) {
    return <div className="w-full h-40">loading</div>;
  }

  return (
    <div className="bg-white relative">
      {/* <header className="col-span-2 flex flex-col justify-center"> */}
      <i className="not-italic absolute top-16 left-4 z-10 text-2xl">
        $ {(45688).toLocaleString()}
      </i>
      {/* </header> */}
      {/* <main className="col-span-4 flex justify-center items-center"> */}
      <HighchartsReact highcharts={Highcharts} options={chartOptions} />
      {/* </main> */}
    </div>
  );
}
