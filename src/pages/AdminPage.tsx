import { useEffect, useState } from "react";
import { Box, createTheme, ThemeProvider, Typography } from "@mui/material";
import Sidebar from "../components/AdminPage/Admin/Sidebar";
import Dashboard from "../components/AdminPage/Admin/Dashboard";
import ProductTable from "../components/AdminPage/Product/ProductsTable";
import UserTable from "../components/AdminPage/User/UserTable";
import ServiceTable from "../components/AdminPage/Service/ServiceTable";
import ServiceTicketTable from "../components/AdminPage/Service/ServiceTicketTable";
import ImportTicketTable from "../components/AdminPage/Import/ImportTicketTable";
import OrderTicketTable from "../components/AdminPage/Order/OrderTicketTable";
import InventoryTable from "../components/AdminPage/Inventory/InventoryTable";
import CategoryTable from "../components/AdminPage/Product/CategoryTable";
import SupplierTable from "../components/AdminPage/Import/SupplierTable";
import PermissionTable from "../components/AdminPage/Permission/PermissionTable";
import RoleTable from "../components/AdminPage/Role/RoleTable";
import VoucherPage from "./VoucherPage";
import { useUserStore } from "../zustand/useUserStore";
import useVoucherStore from "../zustand/useVoucherStore";

const adminTheme = createTheme({
  typography: {
    fontFamily: "Montserrat",
    fontWeightRegular: 550,
  },
});

const MainLayout = () => {
  const [selectedItem, setSelectedItem] = useState("Dashboard");
  const { account, fetchRoles } = useUserStore();
  const { fetchVouchers } = useVoucherStore();

  useEffect(() => {
    fetchRoles(Number(account.role.id));
    fetchVouchers();
  }, []);

  const renderContent = () => {
    switch (selectedItem) {
      case "Dashboard":
        return <Dashboard />;
      case "Product":
        return <ProductTable />;
      case "Category":
        return <CategoryTable />;
      case "Service":
        return <ServiceTable />;
      case "Service Ticket":
        return <ServiceTicketTable />;
      case "Supplier":
        return <SupplierTable />;
      case "Import Ticket":
        return <ImportTicketTable />;
      case "Order Ticket":
        return <OrderTicketTable />;
      case "Inventory":
        return <InventoryTable />;
      case "User":
        return <UserTable />;
      case "Permission":
        return <PermissionTable />;
      case "Role":
        return <RoleTable />;
      case "Voucher":
        return <VoucherPage />;
      default:
        return <ProductTable />;
    }
  };

  return (
    <ThemeProvider theme={adminTheme}>
      <Box
        display="flex"
        height={"100vh"}
        sx={{ background: "linear-gradient(135deg, #f0f4f8, #d9e4ea)" }}
      >
        <Sidebar setSelectedPage={setSelectedItem} />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            padding: 2,
            overflowX: "hidden", // Hide horizontal overflow
            maxWidth: "100vw", // Limit width to the viewport
          }}
        >
          <Typography variant="h4" fontWeight="bold" mt={2} mb={3}>
            {selectedItem} Page
          </Typography>
          {renderContent()}
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default MainLayout;
