import { useState, useEffect, SetStateAction } from "react";
import { Box, Button, Paper, TextField, InputAdornment } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Search } from "@mui/icons-material";
import AddNewService from "./AddService/AddNewService"; // Import component
import ServiceDetailModal from "./AddService/ServiceDetail";
import UpdateServiceModal from "./AddService/UpdateService";
import {
  getAllServicesAdmin,
  restoreServiceAdmin,
  deleteServiceAdmin,
  getServiceById,
} from "../../../config/api";
import { useUserStore } from "../../../zustand/useUserStore";
import { ALL_PERMISSION } from "../../../config/permission";

interface TableData {
  id: number;
  name: string;
  price: number;
  description?: string;
  isDeleted: boolean;
  image?: string | null; // Add image property
}

export default function ServiceTable() {
  const [searchText, setSearchText] = useState("");
  const [allItems, setAllItems] = useState<TableData[]>([]);
  const [filteredRows, setFilteredRows] = useState<TableData[]>([]);
  const [displayRows, setDisplayRows] = useState<TableData[]>([]);
  const [totalRows, setTotalRows] = useState(0);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);

  const [showAddNewService, setShowAddNewService] = useState(false);
  const [showUpdateService, setShowUpdateService] = useState(false);
  const [selectedService, setSelectedService] = useState<TableData | null>(
    null
  );
  const [showServiceDetail, setShowServiceDetail] = useState(false);
  const [detailService, setDetailService] = useState<TableData | null>(null);
  const { account } = useUserStore();
  const permissions = account.role.permissions;

  const fetchAllServices = async () => {
    try {
      const res = await getAllServicesAdmin(1, 100);
      const items = res.data.result.map((item: any) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        description: item.shortDescription,
        isDeleted: item.deleted,
      }));

      setAllItems(items);
      setFilteredRows(items);
      setTotalRows(items.length);
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  useEffect(() => {
    fetchAllServices();
  }, []);

  useEffect(() => {
    if (searchText) {
      const filtered = allItems.filter((item) =>
        item.name.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredRows(filtered);
      setTotalRows(filtered.length);
    } else {
      setFilteredRows(allItems);
      setTotalRows(allItems.length);
    }
  }, [searchText, allItems]);

  useEffect(() => {
    const startIndex = page * pageSize;
    const endIndex = startIndex + pageSize;
    setDisplayRows(filteredRows.slice(startIndex, endIndex));
  }, [page, pageSize, filteredRows]);

  const handleSearchChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setSearchText(event.target.value);
  };

  const handleSoftDelete = async (id: number) => {
    try {
      await deleteServiceAdmin(id);
      fetchAllServices();
    } catch (error) {
      console.error("Error soft deleting service:", error);
    }
  };

  const handleRestore = async (id: number) => {
    try {
      await restoreServiceAdmin(id);
      await fetchAllServices();
    } catch (error) {
      console.error("Error restoring service:", error);
    }
  };

  const handleShowAddNewService = () => {
    setShowAddNewService(true);
  };

  const handleCloseAddNewService = () => {
    setShowAddNewService(false);
  };

  // In ServiceTable component
  const handleUpdateService = async (service: TableData) => {
    try {
      const response = await getServiceById(service.id); // Gọi API lấy thông tin
      const serviceDetails = response.data;
      setSelectedService({
        id: serviceDetails.id,
        name: serviceDetails.name,
        price: serviceDetails.price,
        description: serviceDetails.shortDescription || "",
        isDeleted: serviceDetails.deleted,
        image: serviceDetails.serviceImage || null,
      });
      setShowUpdateService(true); // Hiển thị modal
    } catch (error) {
      console.error("Error fetching service details:", error);
    }
  };

  const handleCloseUpdateService = () => {
    setShowUpdateService(false);
    setSelectedService(null);
  };

  const handleShowServiceDetail = async (service: TableData) => {
    try {
      const response = await getServiceById(service.id);
      const serviceDetails = response.data;

      setDetailService({
        id: serviceDetails.id,
        name: serviceDetails.name,
        price: serviceDetails.price,
        description: serviceDetails.shortDescription || "",
        isDeleted: serviceDetails.deleted,
        image: serviceDetails.serviceImage || null, // Thêm trường hình ảnh nếu có
      });

      setShowServiceDetail(true);
    } catch (error) {
      console.error("Error fetching service details:", error);
    }
  };

  const handleCloseServiceDetail = () => {
    setShowServiceDetail(false);
    setDetailService(null);
  };

  const viewUpdateService = permissions?.find(
    (item) =>
      typeof item !== "string" &&
      item.apiPath === ALL_PERMISSION.SERVICE.UPDATE.apiPath &&
      item.method === ALL_PERMISSION.SERVICE.UPDATE.method
  );

  const viewDeleteService = permissions?.find(
    (item) =>
      typeof item !== "string" &&
      item.apiPath === ALL_PERMISSION.SERVICE.DELETE.apiPath &&
      item.method === ALL_PERMISSION.SERVICE.DELETE.method
  );

  const viewDetailService = permissions?.find(
    (item) =>
      typeof item !== "string" &&
      item.apiPath === ALL_PERMISSION.SERVICE.DETAIL.apiPath &&
      item.method === ALL_PERMISSION.SERVICE.DETAIL.method
  );

  const viewAddNewService = permissions?.find(
    (item) =>
      typeof item !== "string" &&
      item.apiPath === ALL_PERMISSION.SERVICE.CREATE.apiPath &&
      item.method === ALL_PERMISSION.SERVICE.CREATE.method
  );
  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "ID",
      width: 100,
      headerAlign: "center",
      align: "center",
    },
    { field: "name", headerName: "Name", flex: 0.8 },
    {
      field: "price",
      headerName: "Price",
      flex: 0.3,
      type: "number",
      align: "left",
      headerAlign: "left",
    },
    {
      field: "actions",
      headerAlign: "center",
      headerName: "Actions",
      flex: 0.75,
      align: "center",
      filterable: false,
      renderCell: (params) => (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 1,
            height: "100%",
            width: "100%",
          }}
        >
          {viewDeleteService && (
            <>
              {params.row.isDeleted ? (
                <Button
                  variant="outlined"
                  color="success"
                  size="small"
                  onClick={() => handleRestore(params.row.id)}
                  sx={{ textTransform: "none" }}
                >
                  Restore
                </Button>
              ) : (
                <Button
                  variant="outlined"
                  color="error"
                  size="small"
                  onClick={() => handleSoftDelete(params.row.id)}
                  sx={{ textTransform: "none" }}
                >
                  Delete
                </Button>
              )}
            </>
          )}

          {viewUpdateService && (
            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={() => handleUpdateService(params.row)}
              sx={{ textTransform: "none" }}
            >
              Update
            </Button>
          )}
          {viewDetailService && (
            <Button
              variant="contained"
              color="info"
              size="small"
              onClick={() => handleShowServiceDetail(params.row)}
              sx={{
                color: "#3C552D",
                textTransform: "none",
                backgroundColor: "#B2C9AD",
                "&:hover": {
                  backgroundColor: "#A0B89C", // Màu khi hover (tùy chỉnh)
                },
              }}
            >
              Detail
            </Button>
          )}
        </Box>
      ),
    },
  ];

  return (
    <Box>
      <Box
        justifyContent="space-between"
        display="flex"
        alignItems="center"
        sx={{ marginBottom: 2 }}
      >
        <TextField
          placeholder="Search by Name"
          variant="outlined"
          value={searchText}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
          sx={{ width: "25%", height: "auto", backgroundColor: "white" }}
        />
        {viewAddNewService && (
          <Button variant="contained" onClick={handleShowAddNewService}>
            Add New Service
          </Button>
        )}

        <AddNewService
          open={showAddNewService} // Ensure this is passing the correct state
          onClose={handleCloseAddNewService}
          onServiceAdded={fetchAllServices}
        />
      </Box>

      {selectedService && (
        <UpdateServiceModal
          open={showUpdateService}
          service={selectedService}
          onClose={handleCloseUpdateService}
          onServiceUpdated={fetchAllServices}
        />
      )}
      {detailService && (
        <ServiceDetailModal
          show={showServiceDetail}
          onClose={handleCloseServiceDetail}
          service={detailService}
        />
      )}
      <Paper
        sx={{
          height: 486,
          width: "100%",
          borderRadius: "8px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", // Thêm shadow cho bảng
          overflow: "hidden",
        }}
      >
        <DataGrid
          rowHeight={75}
          rows={displayRows}
          columns={columns.map((col) => ({
            ...col,
            headerClassName: "custom-header",
          }))}
          pagination
          paginationMode="server"
          rowCount={totalRows}
          pageSizeOptions={[5, 10, 25, 50]}
          paginationModel={{ page, pageSize }}
          onPaginationModelChange={(newModel) => {
            setPage(newModel.page);
            setPageSize(newModel.pageSize);
          }}
          sx={{
            "& .MuiDataGrid-cell:focus": {
              outline: "none",
            },
            "& .MuiDataGrid-columnHeader:focus": {
              outline: "none",
            },
            "& .custom-header": {
              backgroundColor: "#1976d2", // Màu xanh cho thanh tiêu đề
              color: "#fff",
            },
            "& .MuiDataGrid-columnHeaderTitle": {
              fontSize: "1rem",
            },
            boxShadow: "none", // Loại bỏ shadow mặc định của bảng (nếu có)
          }}
        />
      </Paper>
    </Box>
  );
}
