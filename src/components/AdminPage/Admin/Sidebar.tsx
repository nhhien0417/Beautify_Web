import { useState } from "react";
import {
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
  Avatar,
  Typography,
  Divider,
  Box,
  ListItemButton,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import {
  Dashboard,
  Inventory,
  ShoppingCart,
  People,
  KeyboardArrowLeft,
  KeyboardArrowRight,
  ExpandLess,
  ExpandMore,
  Category,
  Sanitizer,
  Warehouse,
} from "@mui/icons-material";
import logo from "../../../assets/AppIcon.jpg";
import { Link } from "react-router-dom";
import { ALL_PERMISSION } from "../../../config/permission";
import { useUserStore } from "../../../zustand/useUserStore";
export const defaultTheme = createTheme({
  typography: {
    fontFamily: "",
    fontWeightRegular: 550,
  },
});

// Custom theme for the Sidebar
const sidebarTheme = createTheme({
  typography: {
    fontFamily: "Montserrat",
    fontWeightRegular: 550,
  },
});

interface Props {
  setSelectedPage: (page: string) => void;
}

const baseURl = "http://localhost:8080";

const Sidebar = ({ setSelectedPage }: Props) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [currentTitle, setCurrentTitle] = useState("Admin");
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [openServicesSubmenu, setOpenServicesSubmenu] = useState(false);
  const [openProductsSubmenu, setOpenProductsSubmenu] = useState(false);
  const [openImportsSubmenu, setOpenImportsSubmenu] = useState(false);
  const [openOrdersSubmenu, setOpenOrdersSubmenu] = useState(false);
  const [openUsersSubmenu, setOpenUsersSubmenu] = useState(false);
  const { account } = useUserStore();
  const permissions = account.role.permissions;

  const handleToggleCollapse = () => {
    if (!isCollapsed) {
      setOpenServicesSubmenu(false);
      setOpenProductsSubmenu(false);
      setOpenImportsSubmenu(false);
      setOpenOrdersSubmenu(false);
      setOpenUsersSubmenu(false);
    }
    setIsCollapsed(!isCollapsed);
  };

  const handleItemClick = (itemText: string) => {
    setIsCollapsed(false);

    if (itemText === "Services") {
      setOpenServicesSubmenu(!openServicesSubmenu); // Toggle Services submenu
    } else if (itemText === "Products") {
      setOpenProductsSubmenu(!openProductsSubmenu); // Toggle Products submenu
    } else if (itemText === "Imports") {
      setOpenImportsSubmenu(!openImportsSubmenu); // Toggle Imports submenu
    } else if (itemText === "Orders") {
      setOpenOrdersSubmenu(!openOrdersSubmenu); // Toggle Orders submenu
    } else if (itemText === "Users") {
      setOpenUsersSubmenu(!openUsersSubmenu); // Toggle Users submenu
    } else {
      setSelectedItem(itemText);
      setCurrentTitle(itemText);
      setSelectedPage(itemText);
      setOpenServicesSubmenu(false);
      setOpenProductsSubmenu(false);
      setOpenImportsSubmenu(false);
      setOpenOrdersSubmenu(false);
      setOpenUsersSubmenu(false);
    }
  };
  const viewProduct = permissions?.find(
    (item) =>
      typeof item !== "string" &&
      item.apiPath === ALL_PERMISSION.PRODUCT.GET_PAGINATE.apiPath &&
      item.method === ALL_PERMISSION.PRODUCT.GET_PAGINATE.method
  );

  const viewCategory = permissions?.find(
    (item) =>
      typeof item !== "string" &&
      item.apiPath === ALL_PERMISSION.CATEGORY.GET_PAGINATE.apiPath &&
      item.method === ALL_PERMISSION.CATEGORY.GET_PAGINATE.method
  );

  const viewService = permissions?.find(
    (item) =>
      typeof item !== "string" &&
      item.apiPath === ALL_PERMISSION.SERVICE.GET_PAGINATE.apiPath &&
      item.method === ALL_PERMISSION.SERVICE.GET_PAGINATE.method
  );

  const viewServiceTicket = permissions?.find(
    (item) =>
      typeof item !== "string" &&
      item.apiPath === ALL_PERMISSION.SERVICE_TICKET.GET_PAGINATE.apiPath &&
      item.method === ALL_PERMISSION.SERVICE_TICKET.GET_PAGINATE.method
  );

  const viewSupplier = permissions?.find(
    (item) =>
      typeof item !== "string" &&
      item.apiPath === ALL_PERMISSION.SUPPLIER.GET_PAGINATE.apiPath &&
      item.method === ALL_PERMISSION.SUPPLIER.GET_PAGINATE.method
  );

  const viewImportTicket = permissions?.find(
    (item) =>
      typeof item !== "string" &&
      item.apiPath === ALL_PERMISSION.IMPORT_TICKET.GET_PAGINATE.apiPath &&
      item.method === ALL_PERMISSION.IMPORT_TICKET.GET_PAGINATE.method
  );

  const viewRole = permissions?.find(
    (item) =>
      typeof item !== "string" &&
      item.apiPath === ALL_PERMISSION.ROLE.GET_PAGINATE.apiPath &&
      item.method === ALL_PERMISSION.ROLE.GET_PAGINATE.method
  );

  const viewPermission = permissions?.find(
    (item) =>
      typeof item !== "string" &&
      item.apiPath === ALL_PERMISSION.PERMISSION.GET_PAGINATE.apiPath &&
      item.method === ALL_PERMISSION.PERMISSION.GET_PAGINATE.method
  );

  const viewVoucher = permissions?.find(
    (item) =>
      typeof item !== "string" &&
      item.apiPath === ALL_PERMISSION.VOUCHER.GET_PAGINATE.apiPath &&
      item.method === ALL_PERMISSION.VOUCHER.GET_PAGINATE.method
  );

  const viewOrderTicket = permissions?.find(
    (item) =>
      typeof item !== "string" &&
      item.apiPath === ALL_PERMISSION.ORDER_TICKET.GET_PAGINATE.apiPath &&
      item.method === ALL_PERMISSION.ORDER_TICKET.GET_PAGINATE.method
  );

  const viewInventory = permissions?.find(
    (item) =>
      typeof item !== "string" &&
      item.apiPath === ALL_PERMISSION.INVENTORY.GET_PAGINATE.apiPath &&
      item.method === ALL_PERMISSION.INVENTORY.GET_PAGINATE.method
  );

  const viewDashboard = permissions?.find(
    (item) =>
      typeof item !== "string" &&
      item.apiPath === ALL_PERMISSION.INVENTORY.GET_DETAIL.apiPath &&
      item.method === ALL_PERMISSION.INVENTORY.GET_DETAIL.method
  );

  const viewUser = permissions?.find(
    (item) =>
      typeof item !== "string" &&
      item.apiPath === ALL_PERMISSION.USER.GET_PAGINATE.apiPath &&
      item.method === ALL_PERMISSION.USER.GET_PAGINATE.method
  );

  const menuItems = [
    ...(viewDashboard
      ? [{ text: "Dashboard", icon: <Dashboard color="primary" /> }]
      : []),
    ...(viewInventory
      ? [{ text: "Inventory", icon: <Inventory color="primary" /> }]
      : []),
    ...(viewProduct || viewCategory
      ? [
          {
            text: "Products",
            icon: <Category color="primary" />,
            submenu: [
              ...(viewProduct ? [{ text: "Product" }] : []), // Chỉ thêm "Product" nếu có quyền
              ...(viewCategory ? [{ text: "Category" }] : []), // Chỉ thêm "Category" nếu có quyền
            ],
          },
        ]
      : []),
    ...(viewService || viewServiceTicket
      ? [
          {
            text: "Services",
            icon: <Sanitizer color="primary" />,
            submenu: [
              ...(viewService ? [{ text: "Service" }] : []),
              ...(viewServiceTicket ? [{ text: "Service Ticket" }] : []),
            ],
          },
        ]
      : []),
    ...(viewSupplier || viewImportTicket
      ? [
          {
            text: "Imports",
            icon: <Warehouse color="primary" />,
            submenu: [
              ...(viewSupplier ? [{ text: "Supplier" }] : []),
              ...(viewImportTicket ? [{ text: "Import Ticket" }] : []),
            ],
          },
        ]
      : []),
    ...(viewOrderTicket || viewVoucher
      ? [
          {
            text: "Orders",
            icon: <ShoppingCart color="primary" />,
            submenu: [
              ...(viewVoucher ? [{ text: "Voucher" }] : []),
              ...(viewOrderTicket ? [{ text: "Order Ticket" }] : []),
            ],
          },
        ]
      : []),
    ...(viewRole || viewPermission || viewUser
      ? [
          {
            text: "Users",
            icon: <People color="primary" />,
            submenu: [
              ...(viewRole ? [{ text: "Role" }] : []),
              ...(viewPermission ? [{ text: "Permission" }] : []),
              ...(viewUser ? [{ text: "User" }] : []),
            ],
          },
        ]
      : []),
  ];

  return (
    <ThemeProvider theme={sidebarTheme}>
      <Drawer
        variant="permanent"
        sx={{
          width: isCollapsed ? 80 : 240,
          "& .MuiDrawer-paper": {
            width: isCollapsed ? 80 : 240,
            transition: "width 0.3s",
            overflow: "hidden",
            backgroundColor: "#001f3f", // Màu xanh navy
            color: "#fff", // Chữ màu trắng
          },
        }}
      >
        {/* Header */}
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          height={100}
          p={2}
        >
          {!isCollapsed && (
            <IconButton>
              <Link to={"/"}>
                <Avatar src={logo} sx={{ width: 40, height: 40 }} />
              </Link>
            </IconButton>
          )}
          {!isCollapsed && <Typography variant="h6">{currentTitle}</Typography>}
          <IconButton onClick={handleToggleCollapse}>
            {isCollapsed ? (
              <KeyboardArrowRight color="primary" />
            ) : (
              <KeyboardArrowLeft color="primary" />
            )}
          </IconButton>
        </Box>

        {/* Menu Items */}
        <List>
          {menuItems.map((item) =>
            item.submenu ? (
              // Handle submenu items
              <Box key={item.text}>
                <ListItem disablePadding>
                  <ListItemButton
                    onClick={() => handleItemClick(item.text)}
                    sx={{
                      backgroundColor:
                        selectedItem === item.text
                          ? "rgba(0, 0, 255, 0.1)"
                          : "transparent",
                      "&:hover": {
                        backgroundColor:
                          selectedItem === item.text
                            ? "rgba(0, 0, 255, 0.1)"
                            : "rgba(0, 0, 255, 0.2)",
                      },
                    }}
                  >
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    {!isCollapsed && <ListItemText primary={item.text} />}
                    {!isCollapsed &&
                      ((item.text === "Services" && openServicesSubmenu) ||
                      (item.text === "Products" && openProductsSubmenu) ||
                      (item.text === "Imports" && openImportsSubmenu) ||
                      (item.text === "Orders" && openOrdersSubmenu) ||
                      (item.text === "Users" && openUsersSubmenu) ? (
                        <ExpandLess />
                      ) : (
                        <ExpandMore />
                      ))}
                  </ListItemButton>
                </ListItem>
                <Collapse
                  in={
                    (item.text === "Services" && openServicesSubmenu) ||
                    (item.text === "Products" && openProductsSubmenu) ||
                    (item.text === "Imports" && openImportsSubmenu) ||
                    (item.text === "Orders" && openOrdersSubmenu) ||
                    (item.text === "Users" && openUsersSubmenu)
                  }
                  timeout="auto"
                  unmountOnExit
                >
                  <List component="div" disablePadding>
                    {item.submenu?.map((submenuItem, index) => (
                      <ListItem disablePadding key={index}>
                        <ListItemButton
                          sx={{ pl: 4 }}
                          onClick={() =>
                            handleItemClick(
                              typeof submenuItem === "string"
                                ? submenuItem
                                : submenuItem.text
                            )
                          }
                        >
                          <ListItemText
                            primary={
                              typeof submenuItem === "string"
                                ? submenuItem
                                : submenuItem.text
                            }
                          />
                        </ListItemButton>
                      </ListItem>
                    ))}
                  </List>
                </Collapse>
              </Box>
            ) : (
              // Handle regular menu items
              <ListItem disablePadding key={item.text}>
                <ListItemButton
                  onClick={() => handleItemClick(item.text)}
                  sx={{
                    backgroundColor:
                      selectedItem === item.text
                        ? "rgba(0, 0, 255, 0.1)"
                        : "transparent",
                    "&:hover": {
                      backgroundColor:
                        selectedItem === item.text
                          ? "rgba(0, 0, 255, 0.1)"
                          : "rgba(0, 0, 255, 0.2)",
                    },
                  }}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  {!isCollapsed && <ListItemText primary={item.text} />}
                </ListItemButton>
              </ListItem>
            )
          )}
        </List>

        <Divider />

        {/* Bottom Dock */}
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          p={2}
          mt="auto"
        >
          <Avatar
            src={baseURl + account.image}
            sx={{ width: 40, height: 40, mb: 1 }}
          />
          {!isCollapsed && (
            <Typography variant="body1">{account.name}</Typography>
          )}
        </Box>
      </Drawer>
    </ThemeProvider>
  );
};

export default Sidebar;
