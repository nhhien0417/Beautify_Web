import { Component } from "react";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { Box, Card, CardContent, Typography } from "@mui/material";

interface DonutProps {
  series: number[];
  labels: string[];
}

type DonutState = {
  options: ApexOptions;
};

class Donut extends Component<DonutProps, DonutState> {
  constructor(props: DonutProps) {
    super(props);

    this.state = {
      options: {
        chart: {
          type: "donut",
        },
        labels: props.labels,
      },
    };
  }

  componentDidUpdate(prevProps: DonutProps) {
    if (prevProps.labels !== this.props.labels) {
      this.setState((prevState) => ({
        options: {
          ...prevState.options,
          labels: this.props.labels,
        },
      }));
    }
  }

  render() {
    const { series } = this.props;

    if (!series || series.length === 0 || !this.state.options.labels?.length) {
      return <div>No data provided for the chart</div>;
    }

    return (
      <Card
        sx={{
          borderRadius: 4,
          borderWidth: 2,
          height: "360px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-between",
            height: "100%",
          }}
        >
          <Typography textAlign="center" variant="h6" fontWeight={600}>
            Revenue by category (USD)
          </Typography>
          <Box
            sx={{
              flexGrow: 1, // Để phần biểu đồ chiếm khoảng trống còn lại
              display: "flex",
              alignItems: "center", // Căn giữa theo chiều ngang
              justifyContent: "center", // Căn giữa theo chiều dọc
            }}
          >
            <Chart
              options={this.state.options}
              series={series}
              type="donut"
              height={340}
              width={340}
            />
          </Box>
        </CardContent>
      </Card>
    );
  }
}

export default Donut;
