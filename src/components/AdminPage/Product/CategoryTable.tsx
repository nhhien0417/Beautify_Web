import { SetStateAction, useEffect, useState } from "react";
import { Box, Button, Paper, TextField, InputAdornment } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Search } from "@mui/icons-material";
import {
  deleteCategoryAdmin,
  restoreCategoryAdmin,
  getAllCategoriesAdmin,
} from "../../../config/api";
import AddCategory from "./Category/AddCategory";
import UpdateCategory from "./Category/UpdateCategory";
import CategoryDetail from "./Category/CategoryDetail";
import { ALL_PERMISSION } from "../../../config/permission";
import { useUserStore } from "../../../zustand/useUserStore";
interface TableData {
  id: number;
  name: string;
  isDeleted: boolean;
}

export default function CategoryTable() {
  const [searchText, setSearchText] = useState("");
  const [allItems, setAllItems] = useState<TableData[]>([]);
  const [filteredRows, setFilteredRows] = useState<TableData[]>([]);
  const [displayRows, setDisplayRows] = useState<TableData[]>([]);
  const [totalRows, setTotalRows] = useState(0);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [updateDialogOpen, setUpdateDialogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<{
    id: number;
    name: string;
  } | null>(null);
  const [detailDialogOpen, setDetailDialogOpen] = useState(false);
  const { account } = useUserStore();
  const permissions = account.role.permissions;

  const fetchAllCategories = async () => {
    try {
      const res = await getAllCategoriesAdmin(1, 100);
      const items = res.data.result.map((item: any) => ({
        id: item.id.toString(),
        name: item.name,
        isDeleted: item.deleted,
      }));
      setAllItems(items);
      setFilteredRows(items);
      setTotalRows(items.length);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchAllCategories();
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
      await deleteCategoryAdmin(id);
      fetchAllCategories();
    } catch (error) {
      console.error("Error soft deleting category:", error);
    }
  };

  const handleRestore = async (id: number) => {
    try {
      await restoreCategoryAdmin(id);
      fetchAllCategories();
    } catch (error) {
      console.error("Error restoring category:", error);
    }
  };

  const viewUpdateCategory = permissions?.find(
    (item) =>
      typeof item !== "string" &&
      item.apiPath === ALL_PERMISSION.CATEGORY.UPDATE.apiPath &&
      item.method === ALL_PERMISSION.CATEGORY.UPDATE.method
  );

  const viewDeleteCategory = permissions?.find(
    (item) =>
      typeof item !== "string" &&
      item.apiPath === ALL_PERMISSION.CATEGORY.DELETE.apiPath &&
      item.method === ALL_PERMISSION.CATEGORY.DELETE.method
  );

  const viewDetailCategory = permissions?.find(
    (item) =>
      typeof item !== "string" &&
      item.apiPath === ALL_PERMISSION.CATEGORY.DETAIL.apiPath &&
      item.method === ALL_PERMISSION.CATEGORY.DETAIL.method
  );

  const viewAddNewCategory = permissions?.find(
    (item) =>
      typeof item !== "string" &&
      item.apiPath === ALL_PERMISSION.CATEGORY.CREATE.apiPath &&
      item.method === ALL_PERMISSION.CATEGORY.CREATE.method
  );

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "ID",
      width: 100,
      headerAlign: "center",
      align: "center",
    },
    { field: "name", headerName: "Name", flex: 1 },
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
          {viewDeleteCategory && (
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

          {viewUpdateCategory && (
            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={() => {
                setSelectedCategory({
                  id: params.row.id,
                  name: params.row.name,
                });
                setUpdateDialogOpen(true);
              }}
              sx={{ textTransform: "none" }}
            >
              Update
            </Button>
          )}
          {viewDetailCategory && (
            <Button
              variant="contained"
              color="info"
              size="small"
              onClick={() => {
                setSelectedCategory({
                  id: params.row.id,
                  name: params.row.name,
                });
                setDetailDialogOpen(true);
              }}
              sx={{
                color: "#3C552D",
                textTransform: "none",
                backgroundColor: "#B2C9AD",
                "&:hover": {
                  backgroundColor: "#A0B89C",
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
        {viewAddNewCategory && (
          <Button variant="contained" onClick={() => setDialogOpen(true)}>
            Add New Category
          </Button>
        )}

        <AddCategory
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
          onCategoryAdded={fetchAllCategories}
        />
      </Box>

      <UpdateCategory
        open={updateDialogOpen}
        onClose={() => setUpdateDialogOpen(false)}
        category={selectedCategory}
        onCategoryUpdated={fetchAllCategories}
      />
      <CategoryDetail
        open={detailDialogOpen}
        onClose={() => setDetailDialogOpen(false)}
        category={selectedCategory}
      />
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
