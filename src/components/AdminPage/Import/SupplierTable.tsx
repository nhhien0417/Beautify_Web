import { SetStateAction, useEffect, useState } from "react";
import {
  Box,
  Button,
  TextField,
  InputAdornment,
  Modal,
  Typography,
  Paper,
} from "@mui/material";
import { Search } from "@mui/icons-material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Snackbar, Alert } from "@mui/material";
import {
  getAllSuppliers,
  createSupplier,
  updateSupplier,
  deleteSupplier,
  restoreSupplier,
} from "../../../config/api";
import { useUserStore } from "../../../zustand/useUserStore";
import { ALL_PERMISSION } from "../../../config/permission";
interface TableData {
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  isDelete: boolean;
}

const SupplierTable = () => {
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success", // or "error"
  });
  const handleCloseSnackbar = () => {
    setSnackbar({ open: false, message: "", severity: "success" });
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentSupplier, setCurrentSupplier] = useState<TableData | null>(
    null
  );

  const [searchText, setSearchText] = useState("");
  const [allItems, setAllItems] = useState<TableData[]>([]);
  const [filteredRows, setFilteredRows] = useState<TableData[]>([]);
  const [displayRows, setDisplayRows] = useState<TableData[]>([]);
  const [totalRows, setTotalRows] = useState(0);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);

  const [selectedSupplier, setSelectedSupplier] = useState<TableData | null>(
    null
  );
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  // Xử lý tìm kiếm
  const { account } = useUserStore();
  const permissions = account.role.permissions;

  const fetchAllSuppliers = async () => {
    try {
      const res = await getAllSuppliers(1, 100);
      const items = res.data.result.map((item: any) => ({
        id: item.id.toString(),
        name: item.name,
        address: item.address,
        phone: item.phone,
        email: item.email,
        isDeleted: item.deleted,
      }));

      setAllItems(items);
      setFilteredRows(items);
      setTotalRows(items.length);
    } catch (error) {
      console.error("Error fetching suppliers:", error);
    }
  };

  useEffect(() => {
    fetchAllSuppliers();
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

  const handleDetailClick = (supplier: TableData) => {
    setSelectedSupplier(supplier); // Gán nhà cung cấp được chọn vào state
    setIsDetailModalOpen(true); // Mở modal chi tiết
  };

  const handleRestore = async (id: string) => {
    try {
      await restoreSupplier(+id);
      fetchAllSuppliers();
    } catch (error) {
      console.error("Error restoring product:", error);
    }
  };

  const handleSoftDelete = async (id: string) => {
    try {
      await deleteSupplier(+id);
      fetchAllSuppliers();
    } catch (error) {
      console.error("Error soft deleting product:", error);
    }
  };

  // Xử lý thêm mới hoặc chỉnh sửa nhà cung cấp
  const handleSave = async (supplier: TableData) => {
    // Validation: Check if any fields are empty
    const { id, name, email, address, phone } = supplier;

    if (!name || !email || !address || !phone) {
      setSnackbar({
        open: true,
        message: "Please fill in all required fields.",
        severity: "error",
      });
      return;
    }

    // Validation: Check for valid email format
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(supplier.email)) {
      console.error("Invalid email address.");
      setSnackbar({
        open: true,
        message: "Please enter a valid email address.",
        severity: "error",
      });
      return;
    }

    // Validation: Check for valid phone number (basic check)
    const phoneRegex = /^[0-9]+$/; // Allows only numeric characters
    if (!phoneRegex.test(supplier.phone)) {
      console.error("Invalid phone number.");
      setSnackbar({
        open: true,
        message: "Please enter a valid phone number.",
        severity: "error",
      });
      return;
    }

    if (supplier.id) {
      // Update supplier
      try {
        const res = await updateSupplier(+id, name, email, address, phone);
        const statusCode = (res as unknown as { statusCode: number })
          .statusCode;
        if (statusCode === 400) {
          setSnackbar({
            open: true,
            message: "Supplier already exists.",
            severity: "error",
          });
        } else if (statusCode === 200) {
          setSnackbar({
            open: true,
            message: "Supplier updated successfully!",
            severity: "success",
          });
          setIsModalOpen(false);
          fetchAllSuppliers();
        }
      } catch (error) {
        console.error("Error updating supplier:", error);
        setSnackbar({
          open: true,
          message: "Error updating supplier!",
          severity: "error",
        });
      }
    } else {
      // Add new supplier
      try {
        const res = await createSupplier(
          supplier.address,
          supplier.email,
          supplier.name,
          supplier.phone
        );
        const statusCode = (res as unknown as { statusCode: number })
          .statusCode;
        if (statusCode === 400) {
          setSnackbar({
            open: true,
            message: "Supplier already exists.",
            severity: "error",
          });
        } else if (statusCode === 200) {
          setSnackbar({
            open: true,
            message: "Supplier added successfully!",
            severity: "success",
          });
          setIsModalOpen(false);
          fetchAllSuppliers();
        }
      } catch (error) {
        console.error("Error creating supplier:", error);
        setSnackbar({
          open: true,
          message: "Error creating supplier!",
          severity: "error",
        });
      }
    }
  };

  const viewUpdateSupplier = permissions?.find(
    (item) =>
      typeof item !== "string" &&
      item.apiPath === ALL_PERMISSION.SUPPLIER.UPDATE.apiPath &&
      item.method === ALL_PERMISSION.SUPPLIER.UPDATE.method
  );

  const viewDeleteSupplier = permissions?.find(
    (item) =>
      typeof item !== "string" &&
      item.apiPath === ALL_PERMISSION.SUPPLIER.DELETE.apiPath &&
      item.method === ALL_PERMISSION.SUPPLIER.DELETE.method
  );

  const viewAddNewSupplier = permissions?.find(
    (item) =>
      typeof item !== "string" &&
      item.apiPath === ALL_PERMISSION.SUPPLIER.CREATE.apiPath &&
      item.method === ALL_PERMISSION.SUPPLIER.CREATE.method
  );

  const viewDetailSupplier = permissions?.find(
    (item) =>
      typeof item !== "string" &&
      item.apiPath === ALL_PERMISSION.SUPPLIER.DETAIL.apiPath &&
      item.method === ALL_PERMISSION.SUPPLIER.DETAIL.method
  );

  // Cấu hình cột cho DataGrid
  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "ID",
      width: 100,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "name",
      headerName: "Name",
      width: 150,
      align: "left",
      flex: 0.3,
      headerAlign: "left",
    },
    { field: "address", headerName: "Address", flex: 0.5 },
    {
      field: "email",
      headerName: "Email",
      flex: 0.5,
      align: "left",
      headerAlign: "left",
    },
    {
      field: "phone",
      headerName: "Phone",
      width: 150,
      align: "left",
      headerAlign: "left",
    },
    {
      field: "actions",
      headerAlign: "center",
      headerName: "Actions",
      flex: 0.5,
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
          {viewDeleteSupplier && (
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

          {viewUpdateSupplier && (
            <Button
              variant="outlined"
              color="primary"
              size="small"
              sx={{ textTransform: "none" }}
              onClick={() => {
                setCurrentSupplier(params.row); // Gán hàng được chọn vào state
                setIsModalOpen(true); // Mở modal
              }}
            >
              Update
            </Button>
          )}
          {viewDetailSupplier && (
            <Button
              variant="outlined"
              color="secondary"
              size="small"
              sx={{ textTransform: "none" }}
              onClick={() => {
                handleDetailClick(params.row);
              }}
            >
              Details
            </Button>
          )}
        </Box>
      ),
    },
  ];

  return (
    <Box>
      {/* Thanh tìm kiếm và nút thêm */}
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
          sx={{ width: "25%", height: "auto", backgroundColor: "white" }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
        />
        {viewAddNewSupplier && (
          <Button
            variant="contained"
            onClick={() => {
              setCurrentSupplier(null);
              setIsModalOpen(true);
            }}
          >
            Add New Supplier
          </Button>
        )}
      </Box>

      {/* Bảng dữ liệu */}
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
            headerClassName: "custom-header", // Áp dụng lớp tùy chỉnh cho tiêu đề
          }))}
          pagination
          paginationMode="server"
          rowCount={totalRows} // Tổng số hàng từ API
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

      {/* Modal Add/Edit Supplier */}
      <SupplierFormModal
        open={isModalOpen}
        handleClose={() => setIsModalOpen(false)}
        handleSave={handleSave}
        supplier={currentSupplier}
      />

      <DetailModal
        open={isDetailModalOpen}
        handleClose={() => setIsDetailModalOpen(false)}
        supplier={selectedSupplier}
      />
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity as "success" | "error"}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

// Modal để thêm mới hoặc chỉnh sửa nhà cung cấp
const SupplierFormModal = ({
  open,
  handleClose,
  supplier,
  handleSave,
}: any) => {
  const [name, setName] = useState(supplier?.name || "");
  const [address, setAddress] = useState(supplier?.address || "");
  const [phone, setPhone] = useState(supplier?.phone || "");
  const [email, setEmail] = useState(supplier?.email || "");

  useEffect(() => {
    if (supplier) {
      setName(supplier.name || "");
      setAddress(supplier.address || "");
      setPhone(supplier.phone || "");
      setEmail(supplier.email || "");
    } else {
      setName("");
      setAddress("");
      setPhone("");
      setEmail("");
    }
  }, [supplier]);

  const handleSubmit = async () => {
    const supplierData = {
      id: supplier?.id || null,
      name,
      address,
      phone,
      email,
    };
    await handleSave(supplierData);
    setName("");
    setAddress("");
    setPhone("");
    setEmail("");
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          padding: 4,
          borderRadius: 2,
          boxShadow: 24,
          width: 400,
        }}
      >
        <Typography variant="h6" fontWeight={600} mb={2}>
          {supplier ? "Edit Supplier" : "Add Supplier"}
        </Typography>
        <TextField
          label="Name"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Address"
          fullWidth
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Phone"
          fullWidth
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Email"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{ mb: 2 }}
        />
        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
          <Button variant="outlined" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleSubmit}>
            {supplier ? "Save" : "Add"}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

const DetailModal = ({
  open,
  handleClose,
  supplier,
}: {
  open: boolean;
  handleClose: () => void;
  supplier: TableData | null;
}) => {
  if (!supplier) return null; // Nếu không có nhà cung cấp nào được chọn, không hiển thị modal

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          padding: 4,
          borderRadius: 2,
          boxShadow: 24,
          width: 400,
        }}
      >
        <Typography variant="h6" fontWeight={600} mb={2}>
          Supplier Details
        </Typography>
        <TextField
          label="Name"
          fullWidth
          value={supplier.name}
          InputProps={{
            readOnly: true,
          }}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Address"
          fullWidth
          value={supplier.address}
          InputProps={{
            readOnly: true,
          }}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Phone"
          fullWidth
          value={supplier.phone}
          InputProps={{
            readOnly: true,
          }}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Email"
          fullWidth
          value={supplier.email}
          InputProps={{
            readOnly: true,
          }}
          sx={{ mb: 2 }}
        />
        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
          <Button variant="outlined" onClick={handleClose}>
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default SupplierTable;
