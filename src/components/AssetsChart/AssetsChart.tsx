import { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

type AssetProps = {
  name: string;
  y: number;
  z: number;
};

export function AssetsChart() {
  const [data, setData] = useState<AssetProps[]>([]);

 

  const chartOptions = {
    title: {
      text: "Assets",
      align: "left",
      style: {
        color: "#aaa",
        fontWeight: "normal",
        fontSize: 14,
      },
    },
    chart: {
      type: "pie",
      height: 160,
    },
    series: [
      {
        minPointSize: 20,
        innerSize: "80%",
        zMin: 0,
        name: "assets",
        enableMouseTracking: false,
        data: data,
      },
    ],
    plotOptions: {
      series: {
        borderWidth: 0,
        colorByPoint: true,
        type: "pie",
        size: "400%",
        center: ["75%", "50%"],
        innerSize: "80%",
        dataLabels: {
          enabled: false,
          crop: false,
          distance: "-10%",
          connectorWidth: 0,
        },
      },
      pie: {
        showInLegend: true,
      },
    },
    legend: {
      align: "left",
      verticalAlign: "bottom",
      x: -0,
      y: 0,
    },
  };

  useEffect(() => {
    setTimeout(() => {
      setData([
        {
          name: "USDC",
          y: 505992,
          z: 20,
        },
        {
          name: "BTC",
          y: 551695,
          z: 20,
        },
        {
          name: "ETC",
          y: 312679,
          z: 20,
        },
        {
          name: "other",
          y: 78865,
          z: 20,
        },
      ]);
    }, 2300);
  }, []);

  if (data.length === 0) {
    return <div className="w-full h-40">loading</div>;
  }

  return (
    <div className="relative">
      <i className="not-italic absolute top-16 left-4 z-20 text-2xl">
        $ {(52658).toLocaleString()}
      </i>
      <HighchartsReact highcharts={Highcharts} options={chartOptions} />
    </div>
  );
}
