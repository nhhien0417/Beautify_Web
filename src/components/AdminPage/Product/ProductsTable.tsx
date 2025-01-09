import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Snackbar, Alert } from "@mui/material";
import Paper from "@mui/material/Paper";
import { Box, Button, InputAdornment, TextField } from "@mui/material";
import { useState, useEffect, SetStateAction } from "react";
import { Search } from "@mui/icons-material";
import AddNewProduct from "./AddProduct/AddNewProduct";
import UpdateProductModal from "./AddProduct/UpdateProductModal";
import ProductDetailModal from "./AddProduct/ProductDetailModal";
import { getProductById } from "../../../config/api";
import {
  getAllProductsAdmin,
  deleteProductAdmin,
  restoreProductAdmin,
} from "../../../config/api";
import { ALL_PERMISSION } from "../../../config/permission";
import { useUserStore } from "../../../zustand/useUserStore";
interface TableData {
  id: string;
  name: string;
  category: string;
  price: number;
  isDeleted: boolean;
  description: string;
  quantity: number;
  brand: string;
  images: string[];
}

export default function ProductTable() {
  const [searchText, setSearchText] = useState("");
  const [allItems, setAllItems] = useState<TableData[]>([]);
  const [filteredRows, setFilteredRows] = useState<TableData[]>([]);
  const [displayRows, setDisplayRows] = useState<TableData[]>([]);
  const [totalRows, setTotalRows] = useState(0);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);

  const [showAddNewProduct, setShowAddNewProduct] = useState(false);
  const [showUpdateProduct, setShowUpdateProduct] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<TableData | null>(
    null
  );
  const [showProductDetail, setShowProductDetail] = useState(false);
  const [detailProduct, setDetailProduct] = useState<TableData | null>(null);

  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "info", // Có thể là 'success', 'error', 'warning', 'info'
  });
  const { account } = useUserStore();
  const permissions = account.role.permissions;

  const handleNotificationClose = () => {
    setNotification({ ...notification, open: false });
  };

  const fetchAllProducts = async () => {
    try {
      const res = await getAllProductsAdmin(1, 100); // Fetch tất cả sản phẩm
      const products = res.data.result.map((product: any) => ({
        id: product.id.toString(),
        name: product.name,
        category: product.category.name,
        quantity: product.quantity,
        price: product.unitPrice,
        isDeleted: product.deleted,
      }));

      setAllItems(products);
      setFilteredRows(products);
      setTotalRows(products.length);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchAllProducts();
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

  const handleSoftDelete = async (id: string) => {
    try {
      await deleteProductAdmin(+id);
      fetchAllProducts();
    } catch (error) {
      console.error("Error soft deleting product:", error);
    }
  };

  const handleRestore = async (id: string) => {
    try {
      const res = await getProductById(+id);
      if (res.data.category.deleted === true) {
        setNotification({
          open: true,
          message: "You have to enable the category first.",
          severity: "warning",
        });
        return; // Ngăn không cho chạy tiếp nếu category chưa kích hoạt
      }
      await restoreProductAdmin(+id);
      fetchAllProducts();
    } catch (error) {
      console.error("Error restoring product:", error);
    }
  };

  const handleShowAddNewProduct = () => {
    setShowAddNewProduct(true);
  };

  const handleCloseAddNewProduct = () => {
    setShowAddNewProduct(false);
  };

  const handleUpdateProduct = async (product: TableData) => {
    try {
      const res = await getProductById(+product.id);
      const productDetails = res.data;

      // Đảm bảo dữ liệu ảnh đúng định dạng
      setSelectedProduct({
        id: productDetails.id.toString(),
        name: productDetails.name,
        category: productDetails.category.name,
        price: productDetails.unitPrice,
        isDeleted: productDetails.deleted,
        description: productDetails.detailDescription || "",
        quantity: productDetails.quantity,
        brand: productDetails.brand || "",
        images: productDetails.productImage
          ? [
              productDetails.productImage,
              productDetails.subImage1,
              productDetails.subImage2,
              productDetails.subImage3,
            ]
          : [], // Nếu chỉ có một ảnh, đưa vào mảng
      });

      setShowUpdateProduct(true);
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };

  const handleCloseUpdateProduct = () => {
    setShowUpdateProduct(false);
    setSelectedProduct(null);
  };

  const handleShowProductDetail = async (product: TableData) => {
    try {
      const res = await getProductById(+product.id);
      const productDetails = res.data;

      setDetailProduct({
        id: productDetails.id.toString(),
        name: productDetails.name,
        category: productDetails.category.name,
        price: productDetails.unitPrice,
        isDeleted: productDetails.deleted,
        description: productDetails.detailDescription || "",
        quantity: productDetails.quantity,
        brand: productDetails.brand || "",
        images: productDetails.productImage
          ? [
              productDetails.productImage,
              productDetails.subImage1,
              productDetails.subImage2,
              productDetails.subImage3,
            ]
          : [], // Nếu chỉ có một ảnh, đưa vào mảng
      });

      setShowProductDetail(true);
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };

  const handleCloseProductDetail = () => {
    setShowProductDetail(false);
    setDetailProduct(null);
  };

  const viewUpdateProduct = permissions?.find(
    (item) =>
      typeof item !== "string" &&
      item.apiPath === ALL_PERMISSION.PRODUCT.UPDATE.apiPath &&
      item.method === ALL_PERMISSION.PRODUCT.UPDATE.method
  );

  const viewDeleteProduct = permissions?.find(
    (item) =>
      typeof item !== "string" &&
      item.apiPath === ALL_PERMISSION.PRODUCT.DELETE.apiPath &&
      item.method === ALL_PERMISSION.PRODUCT.DELETE.method
  );

  const viewDetailProduct = permissions?.find(
    (item) =>
      typeof item !== "string" &&
      item.apiPath === ALL_PERMISSION.PRODUCT.DETAIL.apiPath &&
      item.method === ALL_PERMISSION.PRODUCT.DETAIL.method
  );

  const viewAddNewProduct = permissions?.find(
    (item) =>
      typeof item !== "string" &&
      item.apiPath === ALL_PERMISSION.PRODUCT.CREATE.apiPath &&
      item.method === ALL_PERMISSION.PRODUCT.CREATE.method
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
    { field: "category", headerName: "Category", width: 175 },
    {
      field: "price",
      headerName: "Price",
      width: 125,
      type: "number",
      align: "left",
      headerAlign: "left",
    },
    {
      field: "quantity",
      headerName: "Quantity",
      width: 150,
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
          {viewDeleteProduct && (
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

          {viewUpdateProduct ? (
            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={() => handleUpdateProduct(params.row)}
              sx={{ textTransform: "none" }}
            >
              Update
            </Button>
          ) : (
            <></>
          )}

          {viewDetailProduct && (
            <Button
              variant="contained"
              sx={{
                color: "#3C552D",
                textTransform: "none",
                backgroundColor: "#B2C9AD",
                "&:hover": {
                  backgroundColor: "#A0B89C", // Màu khi hover (tùy chỉnh)
                },
              }}
              size="small"
              onClick={() => handleShowProductDetail(params.row)}
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
        {viewAddNewProduct ? (
          <Button variant="contained" onClick={handleShowAddNewProduct}>
            Add new Product
          </Button>
        ) : (
          <></>
        )}

        <AddNewProduct
          show={showAddNewProduct}
          onClose={handleCloseAddNewProduct}
          onProductAdded={fetchAllProducts} // Truyền callback
        />
      </Box>
      {selectedProduct && (
        <UpdateProductModal
          show={showUpdateProduct}
          onClose={handleCloseUpdateProduct}
          product={selectedProduct}
          onProductUpdated={fetchAllProducts}
        />
      )}

      {detailProduct && (
        <ProductDetailModal
          show={showProductDetail}
          onClose={handleCloseProductDetail}
          product={detailProduct}
        />
      )}
      <Snackbar
        open={notification.open}
        autoHideDuration={3000}
        onClose={handleNotificationClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleNotificationClose}
          severity={notification.severity as any}
          sx={{ width: "100%" }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
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
