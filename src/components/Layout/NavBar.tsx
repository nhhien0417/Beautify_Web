import { useMemo, useState, useEffect, useRef } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  InputBase,
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  useMediaQuery,
  useTheme,
  Button,
  Badge,
  Menu,
  MenuItem,
  ListItemIcon,
  Paper,
  Typography,
} from "@mui/material";
import {
  Search,
  ShoppingCart,
  Person,
  Menu as MenuIcon,
  Logout,
  LocalMall,
  AccountBox,
} from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import useCartStore from "../../zustand/useCartStore";
import logo from "../../assets/AppIcon.jpg";
import Cart from "../CartPage/Cart";
import { useUserStore } from "../../zustand/useUserStore";
import SearchList from "./SearchList";
import useProductStore from "../../zustand/useProductStore";
import useServiceStore from "../../zustand/useServiceStore";

const Navbar = () => {
  const theme = useTheme();
  const { products } = useProductStore();
  const { services } = useServiceStore();
  const { isAuthenticated, logout } = useUserStore();

  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchList, setShowSearchList] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const handleSearchFocus = () => {
    setShowSearchList(true);
  };
  const handleSearchItemClick = () => {
    setShowSearchList(false);
    setSearchQuery("");
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setShowSearchList(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [menuAnchor, setMenuAnchor] = useState(null);
  const navigate = useNavigate();
  const getUniqueItemsCount = useCartStore(
    (state) => new Set(state.cartItems.map((item) => item.product.id)).size
  );

  const handleMenuOpen = (event: any) => {
    setMenuAnchor(event.currentTarget);
    window.addEventListener("scroll", handleMenuClose);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
    window.removeEventListener("scroll", handleMenuClose);
  };

  const handleLinkToEditInfo = () => {
    navigate("/info");
  };

  const handleLinkToOrders = () => {
    handleMenuClose();
    navigate("/orders");
  };

  const handleLogout = async () => {
    logout();
    navigate("/");
    window.location.reload();
  };

  const handleSearch = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const lowerCaseQuery = searchQuery.toLowerCase();
    setShowSearchList(true);

    return [
      ...services
        .filter((service) =>
          service.name.toLowerCase().includes(lowerCaseQuery)
        )
        .map((service) => ({
          name: service.name,
          image: service.image,
          price: service.price,
          id: service.id,
          type: "service",
        })),
      ...products
        .filter((product) =>
          product.name.toLowerCase().includes(lowerCaseQuery)
        )
        .map((product) => ({
          name: product.name,
          image: product.images[0],
          price: product.price,
          id: product.id,
          type: "product",
        })),
    ];
  }, [searchQuery, products, services]);

  const menuItems = (
    <List
      sx={{
        display: isMobile ? "block" : "flex",
        "& a": {
          textDecoration: "none",
          color: "inherit",
          fontFamily: "inherit",
        },
      }}
    >
      <Link to="/products">
        <ListItemButton>
          <ListItemText
            primary="Products"
            primaryTypographyProps={{ noWrap: true }}
          />
        </ListItemButton>
      </Link>
      <Link to="/services">
        <ListItemButton>
          <ListItemText
            primary="Services"
            primaryTypographyProps={{ noWrap: true }}
          />
        </ListItemButton>
      </Link>
      <Link to="/reviews">
        <ListItemButton>
          <ListItemText
            primary="Reviews"
            primaryTypographyProps={{ noWrap: true }}
          />
        </ListItemButton>
      </Link>
      <Link to="/about">
        <ListItemButton>
          <ListItemText
            primary="About"
            primaryTypographyProps={{ noWrap: true }}
          />
        </ListItemButton>
      </Link>
    </List>
  );

  return (
    <AppBar
      position="sticky"
      style={{
        backgroundColor: "#0B0B0B",
        boxShadow: "none",
        color: "#FBFCD4",
        top: 0,
        zIndex: 1100,
      }}
    >
      <Toolbar style={{ justifyContent: "space-between" }}>
        {/* Logo và chữ BEAUTIFY */}
        {!isMobile && (
          <Link
            to="/"
            style={{
              display: "flex",
              alignItems: "center",
              textDecoration: "none",
            }}
          >
            <img
              src={logo}
              alt="Brand Logo"
              style={{
                height: "50px",
                borderRadius: "20px",
                marginRight: "10px", // Tạo khoảng cách giữa logo và chữ
              }}
            />
            <Typography
              variant="h6"
              sx={{ color: "#FF748B", fontWeight: "bold" }} // Tùy chỉnh kiểu chữ
            >
              BEAUTIFY
            </Typography>
          </Link>
        )}

        {/* Menu */}
        {isMobile ? (
          <>
            <IconButton onClick={() => setDrawerOpen(true)}>
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor="left"
              open={drawerOpen}
              onClose={() => setDrawerOpen(false)}
            >
              <Box
                role="presentation"
                onClick={() => setDrawerOpen(false)}
                onKeyDown={() => setDrawerOpen(false)}
                style={{ width: 250 }}
                sx={{
                  "& a": {
                    textDecoration: "none",
                    color: "inherit",
                    fontFamily: "inherit",
                  },
                }}
              >
                {menuItems}
              </Box>
            </Drawer>
          </>
        ) : (
          menuItems
        )}

        {isMobile && (
          <Link to="/">
            <img
              src={logo}
              alt="Brand Logo"
              style={{
                height: "60px",
                mixBlendMode: "multiply",
              }}
            />
          </Link>
        )}

        {/* Search, Cart, and User */}
        <Box
          style={{
            display: "flex",
            alignItems: "center",
            gap: "15px",
          }}
          ref={searchContainerRef} // Gắn Ref vào Container tìm kiếm
        >
          <Box sx={{ position: "relative", width: "100%" }}>
            <InputBase
              placeholder="Search"
              startAdornment={<Search style={{ color: "#999" }} />}
              style={{
                backgroundColor: "#FBFBFB",
                padding: "5px 10px",
                borderRadius: "20px",
                width: "300px",
              }}
              value={searchQuery}
              onFocus={handleSearchFocus}
              onChange={(e) => setSearchQuery(e.target.value)}
            />

            {/* Danh sách tìm kiếm */}
            {searchQuery && showSearchList && (
              <Paper
                sx={{
                  position: "absolute",
                  top: "calc(100% + 5px)",
                  left: 0,
                  right: 0,
                  zIndex: 1000,
                  borderRadius: "10px",
                  boxShadow: theme.shadows[4],
                  padding: "10px",
                }}
                onClick={handleSearchItemClick}
              >
                <SearchList searchResults={handleSearch} />
              </Paper>
            )}
          </Box>
          {isAuthenticated && (
            <IconButton onClick={() => setCartOpen(true)}>
              <Badge badgeContent={getUniqueItemsCount} color="error">
                <ShoppingCart style={{ color: theme.palette.primary.light }} />
              </Badge>
            </IconButton>
          )}
          {isAuthenticated === false ? (
            <Link to="/auth">
              <Button
                variant="contained"
                sx={{
                  textTransform: "none",
                  textWrap: "nowrap",
                  color: "white",
                  backgroundColor: "#1976d2",
                  borderRadius: "8px",
                  padding: "8px 16px",
                  fontWeight: "bold",
                  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                  "&:hover": {
                    backgroundColor: "#FFC0CB",
                    boxShadow: "0px 6px 10px rgba(0, 0, 0, 0.15)",
                  },
                }}
              >
                Sign in
              </Button>
            </Link>
          ) : (
            <>
              <IconButton onClick={handleMenuOpen}>
                <Person style={{ color: theme.palette.primary.light }} />
              </IconButton>
              <Menu
                anchorEl={menuAnchor}
                open={Boolean(menuAnchor)}
                onClose={handleMenuClose}
                disableScrollLock
                sx={{
                  mt: 1,
                  ml: -1.5,
                }}
              >
                <MenuItem onClick={handleLinkToOrders}>
                  <ListItemIcon>
                    <LocalMall
                      fontSize="small"
                      style={{ color: theme.palette.primary.dark }}
                    />
                  </ListItemIcon>
                  Orders
                </MenuItem>
                <MenuItem onClick={handleLinkToEditInfo}>
                  <ListItemIcon>
                    <AccountBox
                      fontSize="small"
                      style={{ color: theme.palette.primary.dark }}
                    />
                  </ListItemIcon>
                  Account
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                  <ListItemIcon>
                    <Logout
                      fontSize="small"
                      style={{ color: theme.palette.primary.dark }}
                    />
                  </ListItemIcon>
                  Logout
                </MenuItem>
              </Menu>
            </>
          )}
        </Box>
      </Toolbar>

      {/* Cart Drawer */}
      <Drawer
        anchor="right"
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        disableScrollLock
      >
        <Cart onClose={() => setCartOpen(false)} />
      </Drawer>
    </AppBar>
  );
};

export default Navbar;
