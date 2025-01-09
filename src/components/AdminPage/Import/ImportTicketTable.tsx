import { SetStateAction, useEffect, useState } from "react";
import { Box, Button, TextField, InputAdornment, Paper } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Search } from "@mui/icons-material";
import jsPDF from "jspdf";
import "jspdf-autotable";
import ImportTicket from "./ImportTicket/ImportTicket";
import {
  getAllImportTickets,
  completeImportTicket,
  deleteImportTicket,
  getDetailImportTicket,
} from "../../../config/api";
import ImportTicketDetailModal from "./ImportTicket/ImportTicketDetailModal";
import { formatDate } from "../../../services/date";
import { useUserStore } from "../../../zustand/useUserStore";
import { ALL_PERMISSION } from "../../../config/permission";

interface TableData {
  id: string;
  date: string;
  totalPrice: number;
  status: boolean;
  supplier: string;
}

const ImportTicketTable = () => {
  const [searchText, setSearchText] = useState("");
  const [allItems, setAllItems] = useState<TableData[]>([]);
  const [filteredRows, setFilteredRows] = useState<TableData[]>([]);
  const [displayRows, setDisplayRows] = useState<TableData[]>([]);
  const [totalRows, setTotalRows] = useState(0);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);

  const [isImportTicketOpen, setIsImportTicketOpen] = useState(false);
  const [selectedDetail, setSelectedDetail] = useState<any | null>(null);
  const [isDetailOpen, setDetailOpen] = useState(false);
  const { account } = useUserStore();
  const permissions = account.role.permissions;
  const fetchData = async () => {
    try {
      const res = await getAllImportTickets(1, 100);
      const tickets = res.data.result.map((importTicket: any) => ({
        id: importTicket.id.toString(),
        date: importTicket.date,
        totalPrice: importTicket.total,
        status: importTicket.status,
        supplier: importTicket.supplier.name,
      }));

      tickets.sort(
        (
          a: {
            date: string;
            status: any;
          },
          b: {
            date: string;
            status: any;
          }
        ) => {
          if (a.status !== b.status) {
            return a.status ? 1 : -1;
          }
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        }
      );

      const formattedTickets = tickets.map((ticket: any) => ({
        ...ticket,
        date: formatDate(ticket.date),
        totalPrice: ticket.totalPrice.toFixed(2),
      }));

      setAllItems(formattedTickets);
      setFilteredRows(formattedTickets);
      setTotalRows(formattedTickets.length);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (searchText) {
      const filtered = allItems.filter((item) =>
        item.id.toLowerCase().includes(searchText.toLowerCase())
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

  const handleCompleteTicket = async (id: string) => {
    try {
      await completeImportTicket(+id); // Gọi API
      fetchData();
    } catch (error) {
      console.error("Error confirming import:", error);
    }
  };

  const handleDetailClick = async (id: string) => {
    try {
      const response = await getDetailImportTicket(+id);
      setSelectedDetail(response.data);
      setDetailOpen(true);
    } catch (error) {
      console.error("Error fetching service ticket details:", error);
    }
  };

  // Xử lý xuất PDF
  const handleExport = async (id: string) => {
    try {
      const response = await getDetailImportTicket(+id);
      const exportData = response.data;
      console.log(exportData);

      // Initialize jsPDF
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "pt",
        format: "a4",
      });
      const pageWidth = pdf.internal.pageSize.width;

      // Header Section
      pdf.setFont("times", "bold");
      pdf.setFontSize(16);
      pdf.text("BEAUTIFY", 50, 40); // Company Name
      pdf.setFont("times", "normal");
      pdf.setFontSize(12);
      pdf.text(
        "University of Information Technology, HCM City, Vietnam",
        50,
        55
      );
      pdf.text("Phone: (123) 456-7890 | Email: beautify@gmail.com", 50, 70);
      pdf.setFont("times", "bold");
      pdf.setFontSize(18);
      pdf.text("IMPORT TICKET DETAIL", pageWidth - 100, 40, {
        align: "right",
      });

      // Divider Line
      pdf.setLineWidth(0.5);
      pdf.line(50, 85, pageWidth - 50, 85);

      // Order Details Section
      pdf.setFontSize(12);
      pdf.setFont("times", "normal");
      pdf.text(`Import Ticket ID: ${id}`, 50, 110);
      pdf.text(`Date: ${formatDate(exportData.date)}`, 50, 125);
      pdf.text(`Supplier: ${exportData.supplier}`, 50, 140);
      pdf.text(`Total Price: $${exportData.total.toFixed(2)}`, 50, 155);

      const tableColumns = ["#", "Product Name", "Price", "Quantity", "Total"];
      const tableRows = exportData.listProducts.map(
        (
          product: {
            quantity: any;
            product: any;
          },
          index: number
        ) => [
          index + 1,
          product.product.name,
          `$${(product.product.unitPrice * 0.9).toFixed(2)}`,
          product.quantity,
          `$${(product.quantity * product.product.unitPrice * 0.9).toFixed(2)}`,
        ]
      );

      pdf.autoTable({
        head: [tableColumns],
        body: tableRows,
        startY: 180,
        theme: "grid",
        headStyles: {
          fillColor: [200],
          textColor: [0],
          fontSize: 12,
          halign: "center",
        },
        columnStyles: {
          0: { cellWidth: 40, halign: "center" }, // #
          1: { cellWidth: 220 }, // Product Name
          2: { cellWidth: 80, halign: "center" }, // Price
          3: { cellWidth: 80, halign: "center" }, // Quantity
          4: { cellWidth: 80, halign: "center" }, // Total
        },
        styles: {
          fontSize: 10,
          lineColor: [0, 0, 0],
          lineWidth: 0.15,
        },
        margin: { left: 50, right: 50 },
      });

      // Footer
      const lastTableY = pdf.lastAutoTable.finalY;
      pdf.setFont("times", "italic");
      pdf.setFontSize(10);
      pdf.text("Thank you for your business!", 50, lastTableY + 30);
      pdf.text(
        "If you have any questions, please contact us at beautify@gmail.com.",
        50,
        lastTableY + 45
      );

      pdf.line(
        50,
        lastTableY + 50, // Điều chỉnh vị trí theo Delivery Fee
        pageWidth - 50,
        lastTableY + 50
      );

      // Save PDF
      pdf.save(`Import_Ticket_${id}.pdf`);
    } catch (error) {
      console.error("Error exporting service ticket:", error);
      // Display an error message (if using Snackbar or similar)
    }
  };

  const handleDelete = async (id: string) => {
    await deleteImportTicket(+id);
    fetchData();
  };

  const viewCreateImportTicket = permissions?.find(
    (item) =>
      typeof item !== "string" &&
      item.apiPath ===
        ALL_PERMISSION.IMPORT_TICKET.CREATE_IMPORT_TICKET.apiPath &&
      item.method === ALL_PERMISSION.IMPORT_TICKET.CREATE_IMPORT_TICKET.method
  );

  const viewDetailImportTicket = permissions?.find(
    (item) =>
      typeof item !== "string" &&
      item.apiPath === ALL_PERMISSION.IMPORT_TICKET.DETAIL.apiPath &&
      item.method === ALL_PERMISSION.IMPORT_TICKET.DETAIL.method
  );

  const viewDeleteImportTicket = permissions?.find(
    (item) =>
      typeof item !== "string" &&
      item.apiPath ===
        ALL_PERMISSION.IMPORT_TICKET.DELETE_IMPORT_TICKET.apiPath &&
      item.method === ALL_PERMISSION.IMPORT_TICKET.DELETE_IMPORT_TICKET.method
  );

  const viewCompleteImportTicket = permissions?.find(
    (item) =>
      typeof item !== "string" &&
      item.apiPath ===
        ALL_PERMISSION.IMPORT_TICKET.COMPLETE_IMPORT_TICKET.apiPath &&
      item.method === ALL_PERMISSION.IMPORT_TICKET.COMPLETE_IMPORT_TICKET.method
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
      field: "supplier",
      headerName: "Supplier",
      width: 150,
      align: "left",
      flex: 0.5,
      headerAlign: "left",
    },
    { field: "date", headerName: "Date", flex: 0.5 },
    {
      field: "totalPrice",
      headerName: "Total Price",
      width: 150,
      type: "number",
      align: "left",
      headerAlign: "left",
    },

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
          {viewCompleteImportTicket && (
            <>
              {params.row.status === false ? (
                <Button
                  variant="outlined"
                  color="warning" // Use warning for pending payment
                  size="small"
                  onClick={() => handleCompleteTicket(params.row.id)}
                  sx={{ textTransform: "none" }}
                >
                  Not Completed
                </Button>
              ) : (
                <Button
                  variant="outlined"
                  color="success" // Use success for paid
                  size="small"
                  sx={{ textTransform: "none" }}
                >
                  Completed
                </Button>
              )}
              {viewDetailImportTicket && (
                <Button
                  variant="outlined"
                  color="primary" // Use primary for Detail button
                  size="small"
                  sx={{ textTransform: "none" }}
                  onClick={() => handleDetailClick(params.row.id)}
                >
                  Detail
                </Button>
              )}
            </>
          )}
          {viewDeleteImportTicket && (
            <>
              {params.row.status === false ? (
                <Button
                  variant="outlined"
                  color="warning" // Use warning for pending payment
                  size="small"
                  onClick={() => handleDelete(params.row.id)}
                  sx={{ textTransform: "none" }}
                >
                  Delete
                </Button>
              ) : (
                <></>
              )}
            </>
          )}
          <Button
            variant="contained"
            color="info"
            size="small"
            sx={{ textTransform: "none" }}
            onClick={() => handleExport(params.row.id)}
          >
            Export Invoice
          </Button>
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
          placeholder="Search by ID"
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
        {viewCreateImportTicket && (
          <Button
            variant="contained"
            onClick={() => setIsImportTicketOpen(true)}
          >
            Add New Import Ticket
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

      {/* Import Ticket Modal */}
      <ImportTicket
        open={isImportTicketOpen}
        handleClose={() => setIsImportTicketOpen(false)}
        onAdded={fetchData}
      />

      {selectedDetail && (
        <ImportTicketDetailModal
          open={isDetailOpen}
          onClose={() => {
            setDetailOpen(false); // Đóng modal
            setSelectedDetail(null); // Reset dữ liệu chi tiết
          }}
          data={selectedDetail} // Truyền dữ liệu chi tiết
        />
      )}
    </Box>
  );
};

export default ImportTicketTable;
