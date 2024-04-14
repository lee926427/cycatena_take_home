import { useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

export function LatestWeekChart() {
  const [data] = useState([
    {
      name: "Point 1",
      color: "#00FF00",
      y: 0,
    },
    {
      name: "Point 2",
      color: "#FF00FF",
      y: 5,
    },
  ]);
  const chartOptions = {
    title: {
      text: ``,
      align: "left",
    },
    chart: {
      type: "column",
      height: 140,
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
        name: "left",
        data: [500, 500, 500, 500, 500, 500, 500],
        color: "#f1f1f1",
        enableMouseTracking: false,
        pointPadding: 0.3,
      },
      {
        name: "Road",
        data: [434, 290, 307, 260, 344, 187, 264],
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

  if (data.length === 0) {
    return <div className="w-full h-40">loading</div>;
  }

  return (
    <div className="bg-white grid grid-cols-6 px-4 h-full ">
      <header className="col-span-2 flex flex-col justify-center">
        <h1 className="font-bold text-lg">Last 7 days</h1>
        <i className="not-italic">$ {(45688).toLocaleString()}</i>
      </header>
      <main className="col-span-4 flex justify-center items-center">
        <HighchartsReact highcharts={Highcharts} options={chartOptions} />
      </main>
    </div>
  );
}
