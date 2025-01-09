import { Box, Container } from "@mui/material";
import Grid from "@mui/material/Grid";
import PerformanceOverview from "../Dashboard/Graph/PerformanceOverview";
import TopProductSales from "../Dashboard/TopSale";
import SummaryCard from "../Dashboard/SummaryCard";
import { RiOrderPlayFill, RiServiceFill } from "react-icons/ri";
import { Inventory, Store } from "@mui/icons-material";
import { IoMdCash } from "react-icons/io";
import Donut from "../Dashboard/Graph/Donut";
import { useEffect, useState } from "react";
import {
  getAllImportTickets,
  getAllProductsAdmin,
  getAllSaleTickets,
  getAllServicesAdmin,
  getInventoryDetail,
} from "../../../config/api";

const Dashboard = () => {
  const [totalProducts, setTotalProducts] = useState("0");
  const [soldOutProducts, setSoldOutProducts] = useState("0");

  const [totalServices, setTotalServices] = useState("0");
  const [activeServices, setActiveServices] = useState("0");

  const [processingImportTickets, setProcessingImportTickets] = useState("0");
  const [completedImportTickets, setCompletedImportTickets] = useState("0");

  const [processingOrderTickets, setProcessingOrderTickets] = useState("0");
  const [processedOrderTickets, setProcessedOrderTickets] = useState("0");
  const [completedOrderTickets, setCompletedOrderTickets] = useState("0");

  const [inventoryDetails, setInventoryDetails] = useState([]);

  const [lastSixMonthsRevenue, setLastSixMonthsRevenue] = useState<number[]>(
    []
  );
  const [lastSixMonthsProfit, setLastSixMonthsProfit] = useState<number[]>([]);
  const [sixRecentMonths, setSixRecentMonths] = useState<string[]>([]);

  const FetchInventoryDetails = async () => {
    try {
      const currentMonth = new Date().getMonth() + 1;
      const currentYear = new Date().getFullYear();
      const response = await getInventoryDetail(currentMonth, currentYear);

      const sortedData = response.data
        .filter((item: { product: any }) => item.product !== null)
        .sort(
          (a: { totalSold: number }, b: { totalSold: number }) =>
            b.totalSold - a.totalSold
        );

      setInventoryDetails(sortedData);
    } catch (error) {
      console.log(error);
    }
  };

  const calculateRevenueByCategory = (inventoryDetail: any[]) => {
    const revenueByCategory: { [key: string]: number } = {};

    // Tính doanh thu và nhóm theo danh mục
    inventoryDetail.forEach((item) => {
      const revenue = item.totalSold * item.product.unitPrice;
      if (revenueByCategory[item.product.category.name]) {
        revenueByCategory[item.product.category.name] += revenue;
      } else {
        revenueByCategory[item.product.category.name] = revenue;
      }
    });

    return Object.entries(revenueByCategory).map(([category, revenue]) => ({
      category,
      revenue,
    }));
  };

  const revenueData = calculateRevenueByCategory(inventoryDetails);

  const donutlabels = revenueData.map((item) => item.category);
  const donutseries = revenueData.map((item) => item.revenue);

  const FetchPerformanceData = async () => {
    try {
      const monthNames = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      const currentDate = new Date();
      const currentMonth = currentDate.getMonth(); // 0-based index
      const currentYear = currentDate.getFullYear();

      const sixRecentMonths = [];
      const revenueData = [];
      const profitData = [];

      for (let i = 0; i < 6; i++) {
        const monthIndex = (currentMonth - i + 12) % 12;
        const year = currentMonth - i < 0 ? currentYear - 1 : currentYear;

        const month = monthIndex + 1;
        const response = await getInventoryDetail(month, year);

        const monthlyRevenue = response.data.reduce(
          (
            total: number,
            item: { totalSold: number; product: { unitPrice: number } }
          ) => {
            return total + item.totalSold * item.product.unitPrice;
          },
          0
        );

        revenueData.unshift(monthlyRevenue);
        profitData.unshift(monthlyRevenue * 0.1);
        sixRecentMonths.unshift(monthNames[monthIndex]);
      }

      setLastSixMonthsRevenue(revenueData);
      setLastSixMonthsProfit(profitData);
      setSixRecentMonths(sixRecentMonths);
    } catch (error) {
      console.error("Error fetching performance data:", error);
    }
  };

  const FetchAllProducts = async () => {
    try {
      const response = await getAllProductsAdmin(1, 100);
      const allProducts = response.data.result;
      setTotalProducts(allProducts.length.toString());
      setSoldOutProducts(
        allProducts
          .filter((product: any) => product.quantity < 1)
          .length.toString()
      );
    } catch {
      console.log("Error");
    }
  };

  const FetchAllServices = async () => {
    try {
      const response = await getAllServicesAdmin(1, 100);
      const allServices = response.data.result;
      setTotalServices(allServices.length.toString());
      setActiveServices(
        allServices.filter((service: any) => !service.deleted).length.toString()
      );
    } catch {
      console.log("Error");
    }
  };

  const FetchAllImportTickets = async () => {
    try {
      const response = await getAllImportTickets(1, 100);
      const allImportTickets = response.data.result;
      setProcessingImportTickets(
        allImportTickets
          .filter((ticket: any) => !ticket.status)
          .length.toString()
      );
      setCompletedImportTickets(
        allImportTickets
          .filter((ticket: any) => ticket.status)
          .length.toString()
      );
    } catch {
      console.log("Error");
    }
  };

  const FetchAllOrderTickets = async () => {
    try {
      const response = await getAllSaleTickets(1, 100);
      const allOrderTickets = response.data.result;
      setProcessingOrderTickets(
        allOrderTickets
          .filter((ticket: any) => ticket.status === "PREPARING")
          .length.toString()
      );
      setProcessedOrderTickets(
        allOrderTickets
          .filter((ticket: any) => ticket.status === "DELIVERING")
          .length.toString()
      );
      setCompletedOrderTickets(
        allOrderTickets
          .filter((ticket: any) => ticket.status === "COMPLETED")
          .length.toString()
      );
    } catch {
      console.log("Error");
    }
  };

  const totalTickets =
    (Number(processedOrderTickets) || 0) +
    (Number(processingOrderTickets) || 0);

  useEffect(() => {
    FetchAllProducts();
    FetchAllServices();
    FetchAllImportTickets();
    FetchAllOrderTickets();
    FetchInventoryDetails();
    FetchPerformanceData();
  }, []);

  return (
    <Container maxWidth="lg">
      {/* Summary Cards */}
      <Grid container display={"flex"} justifyContent={"space-between"} mt={5}>
        <Grid xs={12} sm={4} md={3} lg={2.4}>
          <SummaryCard
            icon={<Store />}
            title="Products Status "
            primaryValue={totalProducts}
            primaryLabel="Total"
            secondaryValue={soldOutProducts}
            secondaryLabel="Sold out"
          />
        </Grid>
        <Grid xs={12} sm={4} md={3} lg={2.4}>
          <SummaryCard
            icon={<RiServiceFill />}
            title="Services Status"
            primaryValue={totalServices}
            primaryLabel="Total"
            secondaryValue={activeServices}
            secondaryLabel="Active"
          />
        </Grid>
        <Grid xs={12} sm={4} md={3} lg={2.4}>
          <SummaryCard
            icon={<Inventory />}
            title="Imports Status"
            primaryValue={processingImportTickets}
            primaryLabel="Processing"
            secondaryValue={completedImportTickets}
            secondaryLabel="Checked"
          />
        </Grid>
        <Grid xs={12} sm={4} md={3} lg={2.4}>
          <SummaryCard
            icon={<RiOrderPlayFill />}
            title="Orders Status"
            primaryValue={processingOrderTickets}
            primaryLabel="Processing"
            secondaryValue={processedOrderTickets}
            secondaryLabel="Delivering"
          />
        </Grid>
        <Grid xs={12} sm={4} md={3} lg={2.4}>
          <SummaryCard
            icon={<IoMdCash />}
            title="Orders Payment"
            primaryValue={completedOrderTickets}
            primaryLabel="Paid"
            secondaryValue={totalTickets.toString()}
            secondaryLabel="Pending"
          />
        </Grid>
      </Grid>
      {/* Graphs and Additional Content */}
      <Box mt={5} display={"flex"} gap={2} justifyContent={"space-between"}>
        <Box flex={0.9}>
          <PerformanceOverview
            revenueData={lastSixMonthsRevenue}
            months={sixRecentMonths}
            profitData={lastSixMonthsProfit}
          />
        </Box>
        <Box flex={0.9}>
          <Donut series={donutseries} labels={donutlabels} />
        </Box>
        <Box flex={1}>
          <TopProductSales topSale={inventoryDetails.slice(0, 3)} />
        </Box>
      </Box>
    </Container>
  );
};

export default Dashboard;
