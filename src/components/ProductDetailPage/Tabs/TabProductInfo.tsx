import React, { useState, useRef } from "react";
import { Tabs, Tab, Box, Typography, Grid } from "@mui/material";
import TabPanel from "./TabPanel"; // Assuming you have TabPanel component
import Product from "../../../entities/Product";

interface Props {
  product: Product;
}

const TabProductInfo: React.FC<Props> = ({ product }) => {
  const tabPanels = [
    {
      title: "PRODUCT DESCRIPTION",
      content: (
        <Box>
          <Typography sx={{ mb: 2 }}>{product.description}</Typography>
          <Box sx={{ mt: 4 }}>
            <Grid container spacing={3}>
              {product.images.map((image, index) => (
                <Grid item xs={12} key={index}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent:
                        index % 2 === 0 ? "flex-start" : "flex-end",
                      alignItems: "center",
                      px: 15,
                    }}
                  >
                    <img
                      src={image}
                      alt={`Product image ${index + 1}`}
                      style={{
                        width: "100%",
                        maxWidth: "600px",
                        borderRadius: "8px",
                        objectFit: "contain",
                      }}
                    />
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>
      ),
    },
    {
      title: "PAYMENT AND DELIVERY POLICY",
      content: (
        <Box sx={{ whiteSpace: "pre-line", lineHeight: 1.7 }}>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            1. PAYMENT METHODS
          </Typography>
          <Typography>
            To provide the most convenience for customers shopping online at
            Watsons, we support the following payment methods:
          </Typography>
          <ul>
            <li>
              <strong>Cash on Delivery</strong>
            </li>
            <li>
              <strong>Prepayment options:</strong>
              <ul>
                <li>
                  <strong>Domestic ATM cards:</strong> Register for internet
                  banking (online payment) before using this method for Watsons
                  orders.
                </li>
                <li>
                  <strong>Credit/Debit Cards:</strong> VISA, MASTER, JCB, AMEX.
                </li>
                <li>
                  <strong>E-wallets:</strong> Momo.
                </li>
              </ul>
            </li>
          </ul>

          <Typography variant="h6" sx={{ fontWeight: "bold", mt: 2 }}>
            2. ORDER CANCELLATION
          </Typography>
          <Typography>
            Your order will be processed as soon as payment is confirmed. For
            support with order cancellation, please contact us:
          </Typography>
          <ul>
            <li>
              <strong>Hotline:</strong> 1900 989877 (9:00 AM - 9:00 PM).
            </li>
            <li>
              <strong>Email:</strong> contactus@watsons.vn.
            </li>
          </ul>

          <Typography variant="h6" sx={{ fontWeight: "bold", mt: 2 }}>
            3. DELIVERY TIME AND SHIPPING FEES
          </Typography>
          <Typography>
            We always strive to deliver orders as quickly as possible. Please be
            patient.
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: "bold", mt: 2 }}>
            4. RETURN & REFUND POLICY
          </Typography>
          <Typography>
            We strive to deliver products to customers in the best condition and
            exactly as ordered. Returns and refunds are considered under the
            following circumstances:
          </Typography>
          <ul>
            <li>
              <strong>Product Issues:</strong>
              <ul>
                <li>
                  Defective products, wrong type, size, color, or missing items
                  compared to the order.
                </li>
                <li>Expired products.</li>
                <li>Damaged products during shipping.</li>
              </ul>
            </li>
            <li>
              <strong>Return Instructions:</strong>
              <ul>
                <li>Products must be returned within 14 days of receipt.</li>
                <li>
                  The returned order must include all purchased items, gifts,
                  vouchers, and coupons (if applicable).
                </li>
                <li>
                  The product must show no signs of use, damage, scratches, or
                  stains on its packaging.
                </li>
              </ul>
            </li>
          </ul>

          <Typography>
            Once the returned package is received and verified, the refund will
            be processed within 30 working days.
          </Typography>

          <Typography sx={{ mt: 2 }}>
            For assistance, please contact us at:
          </Typography>
          <ul>
            <li>
              <strong>Hotline:</strong> 1900 989877 (9:00 AM - 9:00 PM)
            </li>
            <li>
              <strong>Email:</strong> contactus@watsons.vn
            </li>
          </ul>
        </Box>
      ),
    },
  ];

  const [currentTab, setCurrentTab] = useState(0);
  const tabPanelRefs = useRef<HTMLDivElement[]>([]);

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
    tabPanelRefs.current[newValue]?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Box
      sx={{
        backgroundColor: "#fff",
        borderRadius: 4,
        display: "flex",
        flexDirection: "column",
        maxWidth: 1200,
        margin: "0 auto",
        p: 6,
        mt: 5,
      }}
    >
      {/* Tabs at the top */}
      <Tabs
        value={currentTab}
        onChange={handleTabChange}
        variant="fullWidth"
        textColor="primary"
        indicatorColor="primary"
        sx={{
          backgroundColor: "#FAF6F3",
          borderRadius: 2,
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
          mb: "30px",
        }}
      >
        {tabPanels.map((panel, index) => (
          <Tab
            key={index}
            label={panel.title}
            sx={{
              fontWeight: "600",
              fontSize: "20px",
            }}
          />
        ))}
      </Tabs>

      {/* TabPanels */}
      <Box>
        {tabPanels.map((panel, index) => (
          <div key={index} ref={(el) => (tabPanelRefs.current[index] = el!)}>
            <TabPanel
              index={index}
              title={panel.title}
              content={panel.content}
            />
          </div>
        ))}
      </Box>
    </Box>
  );
};

export default TabProductInfo;
