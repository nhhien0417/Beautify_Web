import { SetStateAction, useEffect, useState } from "react";
import { Search } from "@mui/icons-material";
import { Box, TextField, InputAdornment, Button, Paper } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import UpdateUserForm from "./UpdateUserForm";
import NewUserForm from "./NewUserForm";
import { getAllUsersAdmin, getUserAdmin } from "../../../config/api";
import { useUserStore } from "../../../zustand/useUserStore";
import { ALL_PERMISSION } from "../../../config/permission";
interface TableData {
  id: string;
  image: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  role: string;
}

export default function UserTable() {
  const [isFormOpen, setFormOpen] = useState(false);
  const [isUpdateFormOpen, setUpdateFormOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<TableData | null>(null);

  const [searchText, setSearchText] = useState("");
  const [allItems, setAllItems] = useState<TableData[]>([]);
  const [filteredRows, setFilteredRows] = useState<TableData[]>([]);
  const [displayRows, setDisplayRows] = useState<TableData[]>([]);
  const [totalRows, setTotalRows] = useState(0);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const { account } = useUserStore();
  const permissions = account.role.permissions;
  const handleSearchChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setSearchText(event.target.value);
  };

  const fetchUsers = async () => {
    try {
      const res = await getAllUsersAdmin(1, 100);
      const users = res.data.result.map((user: any) => ({
        id: user.id,
        name: user.name,
        email: user.email,
        image: user.userImage,
        phone: user.phoneNumber,
        address: user.address,
        role: user.role ? user.role.name : "CUSTOMER",
      }));

      setAllItems(users);
      setFilteredRows(users);
      setTotalRows(users.length);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
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

  const handleUpdate = async (row: TableData) => {
    try {
      const response = await getUserAdmin(+row.id); // Gọi API lấy thông tin
      const userDetails = response.data;
      setSelectedUser({
        id: userDetails.id,
        name: userDetails.name,
        email: userDetails.email,
        image: userDetails.userImage,
        phone: userDetails.phoneNumber,
        address: userDetails.address,
        role: userDetails.role ? userDetails.role.name : "CUSTOMER",
      });
      setUpdateFormOpen(true); // Hiển thị modal
      console.log(isUpdateFormOpen);
    } catch (error) {
      console.error("Error fetching service details:", error);
    }
  };

  const viewCreate = permissions?.find(
    (item) =>
      typeof item !== "string" &&
      item.apiPath === ALL_PERMISSION.USER.CREATE.apiPath &&
      item.method === ALL_PERMISSION.USER.CREATE.method
  );

  const viewUpdate = permissions?.find(
    (item) =>
      typeof item !== "string" &&
      item.apiPath === ALL_PERMISSION.USER.UPDATE.apiPath &&
      item.method === ALL_PERMISSION.USER.UPDATE.method
  );

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "name", headerName: "Name", flex: 0.7 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "phone", headerName: "Phone", flex: 0.5 },
    { field: "address", headerName: "Address", flex: 0.7 },
    { field: "role", headerName: "Role", flex: 0.5 },
    {
      field: "actions",
      headerAlign: "center",
      headerName: "Actions",
      flex: 1,
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
          {viewUpdate && (
            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={() => handleUpdate(params.row)}
              sx={{ textTransform: "none" }}
            >
              Update
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
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            },
          }}
          placeholder="Search by Name"
          variant="outlined"
          value={searchText}
          onChange={handleSearchChange}
          sx={{ width: "25%", height: "auto", backgroundColor: "white" }}
        />
        {viewCreate && (
          <Button variant="contained" onClick={() => setFormOpen(true)}>
            Add new user
          </Button>
        )}
      </Box>
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
      <NewUserForm
        open={isFormOpen}
        onClose={() => setFormOpen(false)}
        onAdded={fetchUsers}
      />

      {selectedUser && (
        <UpdateUserForm
          open={isUpdateFormOpen}
          onClose={() => setUpdateFormOpen(false)}
          user={selectedUser}
          onUpdated={fetchUsers}
        />
      )}
    </Box>
  );
}
