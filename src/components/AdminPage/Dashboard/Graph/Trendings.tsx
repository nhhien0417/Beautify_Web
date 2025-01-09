import React from "react";
import Chart from "react-apexcharts";
import { Card, CardContent, Typography } from "@mui/material";
import { ApexOptions } from "apexcharts";

interface RadarChartProps {
  series: { name: string; data: number[] }[];
  categories: string[];
}

const RadarChart: React.FC<RadarChartProps> = ({ series, categories }) => {
  const options: ApexOptions = {
    chart: {
      type: "radar",
    },
    xaxis: {
      categories: categories,
    },
    stroke: {
      width: 2,
    },
    fill: {
      opacity: 0.3,
    },
    markers: {
      size: 4,
    },
    tooltip: {
      enabled: true,
    },
  };

  return (
    <Card sx={{ borderRadius: 8, borderWidth: 2 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Trending Categories
        </Typography>
        <Chart options={options} series={series} type="radar" height={300} />
      </CardContent>
    </Card>
  );
};

export default RadarChart;
