import { useState, useEffect, useRef } from "react";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Layout/NavBar";
import Footer from "../components/Layout/Footer";
import ScrollPage from "../components/Scroll/ScrollPage";
import useProductStore from "../zustand/useProductStore";
import useCartStore from "../zustand/useCartStore";
import useSaleTicketStore from "../zustand/useSaleTicketStore";

const Layout = () => {
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [navbarHeight, setNavbarHeight] = useState(0);
  const navbarRef = useRef<HTMLDivElement>(null);

  const { fetchProducts } = useProductStore();
  const { fetchCart } = useCartStore();
  const { fetchSaleTickets } = useSaleTicketStore();

  useEffect(() => {
    if (navbarRef.current) {
      setNavbarHeight(navbarRef.current.offsetHeight);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
    fetchCart();
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
