import { useParams } from "react-router-dom";
import { ServiceDetail } from "../components/ServiceDetailPage.tsx/ServiceDetail";
import { Box, CircularProgress } from "@mui/material";
import useServiceStore from "../zustand/useServiceStore";
const ServiceDetailPage = () => {
  const { serviceId } = useParams();
  const services = useServiceStore((state) => state.services);
  const service = services.find((p) => p.id === Number(serviceId)) || null;

  if (!service) {
    return (
      <Box
        sx={{
          textAlign: "center",
          marginTop: "20vh",
        }}
      >
        <CircularProgress color="primary" />
      </Box>
    );
  }

  return <ServiceDetail service={service} />;
};

export default ServiceDetailPage;
