import { useState, useEffect, useRef } from "react";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Layout/NavBar";
import Footer from "../components/Layout/Footer";
import ScrollPage from "../components/Scroll/ScrollPage";
import useProductStore from "../zustand/useProductStore";
import useCategoryStore from "../zustand/useCategory";
import useShopReviewStore from "../zustand/useShopReviewStore";
import useCartStore from "../zustand/useCartStore";
import useVoucherStore from "../zustand/useVoucherStore";
import useSaleTicketStore from "../zustand/useSaleTicketStore";

const Layout = () => {
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [navbarHeight, setNavbarHeight] = useState(0);
  const navbarRef = useRef<HTMLDivElement>(null);

  const { fetchCategories } = useCategoryStore();
  const { fetchProducts } = useProductStore();
  const { fetchCart } = useCartStore();
  const { fetchShopReviews } = useShopReviewStore();
  const { fetchVouchers } = useVoucherStore();
  const { fetchSaleTickets } = useSaleTicketStore();

  useEffect(() => {
    if (navbarRef.current) {
      setNavbarHeight(navbarRef.current.offsetHeight);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
    fetchProducts();
    fetchCart();
    fetchShopReviews();
    fetchVouchers();
    fetchSaleTickets();
  }, []);

  const handleScroll = () => {
    if (window.scrollY > lastScrollY) {
      // Scrolling down
      setShowNavbar(false);
    } else {
      // Scrolling up
      setShowNavbar(true);
    }
    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return (
    <Box>
      <ScrollPage />
      {/* Navbar and BreadcrumbsBar combined */}
      <Box
        ref={navbarRef}
        sx={{
          position: "fixed",
          top: 0,
          width: "100%",
          zIndex: 1000,
          transition: "transform 0.3s ease",
          transform: showNavbar
            ? "translateY(0)"
            : `translateY(-${navbarHeight}px)`,
          backgroundColor: "#0D47A1", // Ensures consistent background color
        }}
      >
        <Navbar />
        {/* <BreadcrumbsBar /> */}
      </Box>

      {/* Main content */}
      <Box
        sx={{
          marginTop: `${navbarHeight}px`, // Đảm bảo main content luôn cách rìa trên một khoảng bằng navbar
          transition: "margin-top 0.3s ease", // Thêm hiệu ứng mượt khi navbar xuất hiện/biến mất
        }}
      >
        <Outlet />
      </Box>

      <Footer />
    </Box>
  );
};

export default Layout;
