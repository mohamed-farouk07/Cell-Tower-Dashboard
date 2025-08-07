import React from "react";
import Chart from "react-apexcharts";

interface EvaluationChartProps {
  scores: number[];
}

const EvaluationChart: React.FC<EvaluationChartProps> = ({ scores }) => {
  const options: ApexCharts.ApexOptions = {
    chart: {
      type: "bar",
      toolbar: { show: true },
    },
    plotOptions: {
      bar: {
        horizontal: true,
        barHeight: "50%",
      },
    },
    xaxis: {
      categories: scores.map((_, i) => `Question ${i + 1}`),
    },
    colors: ["#3E337C"],
  };

  const series = [
    {
      name: "Score",
      data: scores,
    },
  ];

  return (
    <Chart
      options={options}
      series={series}
      type="bar"
      height={scores.length * 100}
    />
  );
};

export default EvaluationChart;
