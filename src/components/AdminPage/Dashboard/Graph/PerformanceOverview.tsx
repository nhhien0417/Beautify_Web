import React from "react";
import Chart from "react-apexcharts";
import { Card, CardContent, Typography } from "@mui/material";
import { ApexOptions } from "apexcharts";

interface Props {
  profitData: number[];
  revenueData: number[];
  months: string[];
}

const PerformanceOverview: React.FC<Props> = ({
  profitData: transactionsData,
  revenueData,
  months,
}) => {
  const options: ApexOptions = {
    chart: {
      type: "bar",
      animations: {
        enabled: true,
        easing: "easeinout",
        speed: 3000,
        animateGradually: {
          enabled: true,
          delay: 150,
        },
        dynamicAnimation: {
          enabled: true,
          speed: 3500,
        },
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "85%",
      },
    },
    xaxis: {
      categories: months,
    },
    yaxis: {
      title: {
        text: "USD",
      },
    },
    dataLabels: {
      enabled: false,
    },
  };

  const series = [
    { name: "Total Profit", data: transactionsData },
    { name: "Total Revenue", data: revenueData },
  ];

  return (
    <Card sx={{ borderRadius: 4, borderWidth: 2, height: "360px" }}>
      <CardContent>
        <Typography textAlign="center" variant="h6" fontWeight={600}>
          Revenue & Transaction
        </Typography>
        <Chart
          options={options}
          series={series}
          type="bar"
          height={300}
          width={300}
        />
      </CardContent>
    </Card>
  );
};

export default PerformanceOverview;
