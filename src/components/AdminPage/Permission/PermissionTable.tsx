import React, { useEffect, useState } from "react";
import { Box, Button, TextField, InputAdornment, Paper } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Search } from "@mui/icons-material";
import AddPermissionModal from "./AddNewPermission/AddPermissionModal";
import usePermissionStore from "../../../zustand/usePermissionStore";
import UpdatePermissionModal from "./AddNewPermission/UpdatePermissionModal";
import { deletePermission, restorePermission } from "../../../config/api";
import { useUserStore } from "../../../zustand/useUserStore";
import { ALL_PERMISSION } from "../../../config/permission";
import { Permission } from "../../../entities/Permission";

const PermissionTable = () => {
  const [searchText, setSearchText] = useState("");
  const [allPermission, setAllPermissions] = useState<Permission[]>([]); // Lưu tất cả roles
  const [filteredRows, setFilteredRows] = useState<Permission[]>([]); // Lưu kết quả đã lọc
  const [displayRows, setDisplayRows] = useState<Permission[]>([]); // Lưu kết quả hiển thị sau khi phân trang
  const [totalRows, setTotalRows] = useState(0);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);

  const [isModalOpen, setModalOpen] = useState(false);
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
  const [selectedPermission, setSelectedPermission] =
    useState<Permission | null>(null);

  const { account } = useUserStore();
  const permissions = account.role.permissions;
  // Zustand store
  const {
    allPermissions,
    isFetching,
    fetchAllPermissions,
    metaAll,
    refreshPermissions,
  } = usePermissionStore();

  // Fetch permissions khi component mount hoặc thay đổi pagination
  useEffect(() => {
    fetchAllPermissions();
  }, []);

  useEffect(() => {
    if (allPermissions.length > 0) {
      setAllPermissions(allPermissions); // Lưu toàn bộ dữ liệu
      setFilteredRows(allPermissions); // Mặc định không lọc
      setTotalRows(allPermissions.length);
    }
  }, [allPermissions]);

  useEffect(() => {
    // Áp dụng phân trang trên kết quả đã lọc
    const startIndex = page * pageSize;
    const endIndex = startIndex + pageSize;
    setDisplayRows(filteredRows.slice(startIndex, endIndex));
  }, [page, pageSize, filteredRows]);

  useEffect(() => {
    if (searchText) {
      const filtered = allPermission.filter((item) =>
        item.name?.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredRows(filtered);
      setTotalRows(filtered.length); // Cập nhật tổng số hàng
    } else {
      setFilteredRows(allPermission); // Không lọc khi searchText rỗng
      setTotalRows(allPermission.length);
    }
  }, [searchText, allPermission]);

  useEffect(() => {
    if (metaAll) {
      setTotalRows(metaAll.total);
    }
  }, [metaAll]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  const toggleDeleteState = async (id: number, isDeleted: boolean) => {
    try {
      if (isDeleted) {
        await restorePermission(id); // Gọi API khôi phục
      } else {
        await deletePermission(id); // Gọi API xóa mềm
      }

      await refreshPermissions();
    } catch (error) {
      console.error(
        isDeleted
          ? "Error restoring permission:"
          : "Error soft deleting permission:",
        error
      );
    }
  };

  const viewCreate = permissions?.find(
    (item) =>
      typeof item !== "string" &&
      item.apiPath === ALL_PERMISSION.PERMISSION.CREATE.apiPath &&
      item.method === ALL_PERMISSION.PERMISSION.CREATE.method
  );

  const viewUpdate = permissions?.find(
    (item) =>
      typeof item !== "string" &&
      item.apiPath === ALL_PERMISSION.PERMISSION.UPDATE.apiPath &&
      item.method === ALL_PERMISSION.PERMISSION.UPDATE.method
  );

  const viewDelete = permissions?.find(
    (item) =>
      typeof item !== "string" &&
      item.apiPath === ALL_PERMISSION.PERMISSION.DELETE.apiPath &&
      item.method === ALL_PERMISSION.PERMISSION.DELETE.method
  );

  const viewRestore = permissions?.find(
    (item) =>
      typeof item !== "string" &&
      item.apiPath === ALL_PERMISSION.PERMISSION.RESTORE.apiPath &&
      item.method === ALL_PERMISSION.PERMISSION.RESTORE.method
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
      field: "apiPath",
      headerName: "API",
      flex: 0.5,
      headerAlign: "left",
      align: "left",
    },
    {
      field: "method",
      headerName: "Method",
      flex: 0.75,
      headerAlign: "left",
      align: "left",
    },
    {
      field: "module",
      headerName: "Module",
      flex: 0.75,
      headerAlign: "left",
      align: "left",
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
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
              sx={{ textTransform: "none" }}
              onClick={() => {
                setSelectedPermission(params.row);
                setUpdateModalOpen(true);
              }}
            >
              Update
            </Button>
          )}
          {!params.row.deleted && viewDelete ? (
            <Button
              variant="outlined"
              color={"error"}
              size="small"
              onClick={() =>
                toggleDeleteState(params.row.id, params.row.deleted)
              }
              sx={{ textTransform: "none" }}
            >
              Delete
            </Button>
          ) : (
            params.row.deleted &&
            viewRestore && (
              <Button
                variant="outlined"
                color={"success"}
                size="small"
                onClick={() =>
                  toggleDeleteState(params.row.id, params.row.deleted)
                }
                sx={{ textTransform: "none" }}
              >
                Restore
              </Button>
            )
          )}
        </Box>
      ),
    },
  ];

  return (
    <Box>
      {/* Thanh tìm kiếm */}
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
        {viewCreate && (
          <Button variant="contained" onClick={() => setModalOpen(true)}>
            Add New Permission
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

      {/* Modal */}
      <AddPermissionModal
        open={isModalOpen}
        handleClose={() => setModalOpen(false)}
        onAdded={fetchAllPermissions}
      />

      {/* Modal Update */}
      {selectedPermission && (
        <UpdatePermissionModal
          open={isUpdateModalOpen}
          handleClose={() => setUpdateModalOpen(false)}
          onUpdated={fetchAllPermissions}
          permissionId={selectedPermission.id}
          currentData={selectedPermission}
        />
      )}
    </Box>
  );
};

export default PermissionTable;
