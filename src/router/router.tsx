import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../pages/NotFoundPage";
import Layout from "../pages/Layout";
import HomePage from "../pages/HomePage";
import AccountPage from "../pages/AccountPage";
import ProductPage from "../pages/ProductPage";
import ProductDetailPage from "../pages/ProductDetailPage";
import AboutPage from "../pages/AboutPage";
import ServicePage from "../pages/ServicePage";
import ServiceDetailPage from "../pages/ServiceDetailPage";
import ReviewPage from "../pages/ReviewPage";
import CheckoutPage from "../pages/CheckoutPage";
import OrdersPage from "../pages/OrderPage";
import OrderDetailPage from "../pages/OrderDetailPage";
import EditProfilePage from "../pages/ProfilePage";
import ForbiddenPage from "../pages/ForbiddenPage";
import ChangePasswordPage from "../components/EditProfilePage/ChangePasswordPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "products",
        element: <ProductPage />,
      },
      {
        path: "products/:productId",
        element: <ProductDetailPage />,
      },
      {
        path: "services",
        element: <ServicePage />,
      },
      {
        path: "services/:serviceId",
        element: <ServiceDetailPage />,
      },
      {
        path: "about",
        element: <AboutPage />,
      },
      {
        path: "reviews",
        element: <ReviewPage />,
      },
      {
        path: "checkout",
        element: <CheckoutPage />,
      },
      {
        path: "orders",
        element: <OrdersPage />,
      },
      {
        path: "orders/:orderId",
        element: <OrderDetailPage />,
      },
      {
        path: "info",
        element: <EditProfilePage />,
        children: [
          {
            path: "changepassword",
            element: <ChangePasswordPage />,
          },
        ],
      },
    ],
  },
  {
    path: "/auth",
    errorElement: <ErrorPage />,
    element: <AccountPage />,
  },
  {
    path: "/403",
    errorElement: <ErrorPage />,
    element: <ForbiddenPage />,
  },
]);

export default router;
