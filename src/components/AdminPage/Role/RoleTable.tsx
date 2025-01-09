import { SetStateAction, useEffect, useState } from "react";
import { Box, Button, TextField, InputAdornment, Paper } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Search } from "@mui/icons-material";
import AddRoleModal from "./AddNewRole/AddRoleModal";
import UpdateRoleModal from "./AddNewRole/UpdateRoleModal";
import useRoleStore from "../../../zustand/useRoleStore";
import usePermissionStore from "../../../zustand/usePermissionStore";
import { Permission } from "../../../entities/Permission";
import { Role } from "../../../entities/Role";
import { useUserStore } from "../../../zustand/useUserStore";
import { ALL_PERMISSION } from "../../../config/permission";

const RoleTable = () => {
  const [searchText, setSearchText] = useState("");
  const [allRoles, setAllRoles] = useState<Role[]>([]); // Lưu tất cả roles
  const [filteredRows, setFilteredRows] = useState<Role[]>([]); // Lưu kết quả đã lọc
  const [displayRows, setDisplayRows] = useState<Role[]>([]); // Lưu kết quả hiển thị sau khi phân trang
  const [totalRows, setTotalRows] = useState(0);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);

  const [isModalOpen, setModalOpen] = useState(false);
  const [isModalUpdateOpen, setModalUpdateOpen] = useState(false);
  const [currentRole, setCurrentRole] = useState(null);
  const [permissions, setPermissions] = useState<Permission[]>();

  const { meta, result, fetchRoles, isFetching } = useRoleStore();
  const { fetchActivePermissions, activePermissions } = usePermissionStore();
  const { account } = useUserStore();
  const permissionss = account.role.permissions;
  useEffect(() => {
    fetchRoles();
    fetchActivePermissions();
  }, []);

  useEffect(() => {
    if (result.length > 0) {
      setAllRoles(result); // Lưu toàn bộ dữ liệu
      setFilteredRows(result); // Mặc định không lọc
      setTotalRows(result.length);
    }
  }, [result]);

  useEffect(() => {
    // Áp dụng phân trang trên kết quả đã lọc
    const startIndex = page * pageSize;
    const endIndex = startIndex + pageSize;
    setDisplayRows(filteredRows.slice(startIndex, endIndex));
  }, [page, pageSize, filteredRows]);

  useEffect(() => {
    if (searchText) {
      const filtered = allRoles.filter((role) =>
        role.name.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredRows(filtered);
      setTotalRows(filtered.length); // Cập nhật tổng số hàng
    } else {
      setFilteredRows(allRoles); // Không lọc khi searchText rỗng
      setTotalRows(allRoles.length);
    }
  }, [searchText, allRoles]);

  useEffect(() => {
    if (meta) {
      setTotalRows(meta.total);
    }
  }, [meta]);

  const handleSearchChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setSearchText(event.target.value);
  };

  const handleAddRole = async () => {
    setCurrentRole(null);

    setPermissions(activePermissions || []); // Đảm bảo không bị undefined
    setModalOpen(true);
  };

  const handleUpdateRole = async (role: any) => {
    setPermissions(activePermissions || []);
    setCurrentRole(role);
    setModalUpdateOpen(true);
  };

  const viewCreate = permissionss?.find(
    (item) =>
      typeof item !== "string" &&
      item.apiPath === ALL_PERMISSION.ROLE.CREATE.apiPath &&
      item.method === ALL_PERMISSION.ROLE.CREATE.method
  );

  const viewUpdate = permissionss?.find(
    (item) =>
      typeof item !== "string" &&
      item.apiPath === ALL_PERMISSION.ROLE.UPDATE.apiPath &&
      item.method === ALL_PERMISSION.ROLE.UPDATE.method
  );
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
      flex: 1,
      headerAlign: "left",
      align: "left",
    },
    {
      field: "status",
      headerName: "Status",
      flex: 0.75,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <Button
          variant="contained"
          color={params.row.active === true ? "success" : "error"}
          size="small"
          sx={{
            fontWeight: "bold",
            cursor: "default",
          }}
        >
          {params.row.active === true ? "Active" : "Inactive"}
        </Button>
      ),
    },
    {
      field: "update",
      headerName: "Update",
      flex: 0.75,
      headerAlign: "center",
      align: "center",
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
              variant="outlined"
              color="primary"
              size="small"
              onClick={() => handleUpdateRole(params.row)}
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
      {/* Search and Add */}
      <Box
        justifyContent="space-between"
        display="flex"
        alignItems="center"
        sx={{ marginBottom: 2, backgroundColor: "primary" }}
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
          sx={{
            width: "25%",
            height: "auto",
            backgroundColor: "white",
          }}
        />
        {viewCreate && (
          <Button variant="contained" onClick={handleAddRole}>
            Add New Role
          </Button>
        )}
      </Box>

      {/* Data Table */}
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
          loading={isFetching}
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

      {/* Add and Update Modals */}
      <AddRoleModal
        open={isModalOpen}
        handleClose={() => setModalOpen(false)}
        onAdded={() => fetchRoles()}
        permissions={permissions} // Truyền danh sách permissions
      />
      <UpdateRoleModal
        open={isModalUpdateOpen}
        handleClose={() => setModalUpdateOpen(false)}
        initialData={currentRole}
        permissions={permissions}
        onUpdated={fetchRoles}
      />
    </Box>
  );
};

export default RoleTable;
