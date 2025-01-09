import { SetStateAction, useEffect, useState } from "react";
import {
  Box,
  Button,
  TextField,
  InputAdornment,
  Paper,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Search } from "@mui/icons-material";
import jsPDF from "jspdf";
import "jspdf-autotable";
import {
  confirmCompleteSaleTicket,
  confirmDeliverySaleTicket,
  deleteSaleTicket,
  getAllSaleTickets,
  getDetailOfSaleTicket,
} from "../../../config/api";
import { formatDate } from "../../../services/date";
import OrderTicket from "./OrderTicket/OrderTicket";
import OrderTicketDetailModal from "./OrderTicket/OrderTicketDetailModal";
import { useUserStore } from "../../../zustand/useUserStore";
import { ALL_PERMISSION } from "../../../config/permission";

interface TableData {
  id: string;
  customer: string;
  date: string;
  total: number;
  status: string;
}

const OrderTicketTable = () => {
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [nextStatus, setNextStatus] = useState<string | null>(null);

  const [searchText, setSearchText] = useState("");
  const [allItems, setAllItems] = useState<TableData[]>([]);
  const [filteredRows, setFilteredRows] = useState<TableData[]>([]);
  const [displayRows, setDisplayRows] = useState<TableData[]>([]);
  const [totalRows, setTotalRows] = useState(0);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);

  const [selectedDetail, setSelectedDetail] = useState<any | null>(null);
  const [isDetailOpen, setDetailOpen] = useState(false);
  const [ticketsWithDetails, setTicketsWithDetails] = useState<any[]>([]);
  const [openModal, setOpenModal] = useState(false);

  const { account } = useUserStore();
  const permissions = account.role.permissions;

  const fetchData = async () => {
    try {
      const response = await getAllSaleTickets(1, 100);
      const tickets = response.data.result.map(
        (saleTicket: {
          id: number;
          user: { name: string };
          date: string;
          total: number;
          status: "PREPARING" | "DELIVERING" | "COMPLETED";
        }) => ({
          id: saleTicket.id.toString(),
          customer: saleTicket.user.name,
          date: saleTicket.date,
          total: saleTicket.total,
          status: saleTicket.status,
        })
      );
      tickets.sort(
        (
          a: { status: "PREPARING" | "DELIVERING" | "COMPLETED"; date: string },
          b: { status: "PREPARING" | "DELIVERING" | "COMPLETED"; date: string }
        ) => {
          const statusOrder: {
            [key in "PREPARING" | "DELIVERING" | "COMPLETED"]: number;
          } = { PREPARING: 1, DELIVERING: 2, COMPLETED: 3 };
          if (statusOrder[a.status] !== statusOrder[b.status]) {
            return statusOrder[a.status] - statusOrder[b.status];
          }
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        }
      );

      const formattedTickets = tickets.map((ticket: any) => ({
        ...ticket,
        date: formatDate(ticket.date), // Áp dụng formatDate
      }));

      setAllItems(formattedTickets);
      setFilteredRows(formattedTickets);
      setTotalRows(formattedTickets.length);

      const ticketsWithDetails = await Promise.all(
        response.data.result.map(async (ticket: any) => {
          const detailResponse = await getDetailOfSaleTicket(Number(ticket.id));
          return { ...ticket, details: detailResponse.data };
        })
      );
      setTicketsWithDetails(ticketsWithDetails);
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

  const handleDetailClick = (id: string) => {
    const ticketDetails = ticketsWithDetails.find((item) => item.id == id);
    setSelectedDetail(ticketDetails);
    setDetailOpen(true);
  };

  const handleExport = async (id: string) => {
    try {
      const ticketDetails = ticketsWithDetails.find((item) => item.id == id);
      const exportData = ticketDetails;

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
      pdf.text("SALE TICKET DETAIL", pageWidth - 100, 40, {
        align: "right",
      });

      // Divider Line
      pdf.setLineWidth(0.5);
      pdf.line(50, 85, pageWidth - 50, 85);

      // Order Details Section
      pdf.setFontSize(12);
      pdf.setFont("times", "normal");
      pdf.text(`Sale Ticket ID: ${exportData.id}`, 50, 110);
      pdf.text(`Date: ${formatDate(exportData.date)}`, 50, 125);
      pdf.text(`Customer: ${exportData.user.name}`, 50, 140);
      pdf.text(`Total Price: $${exportData.total.toFixed(2)}`, 50, 155);

      const tableColumns = ["#", "Product Name", "Price", "Quantity", "Total"];
      const tableRows = exportData.details.listProducts.map(
        (
          product: {
            quantity: any;
            product: any;
          },
          index: number
        ) => [
          index + 1,
          product.product.name,
          `$${product.product.unitPrice.toFixed(2)}`,
          product.quantity,
          `$${(product.quantity * product.product.unitPrice).toFixed(2)}`,
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

      const lastTableY = pdf.lastAutoTable.finalY;

      const subtotal = exportData.details.listProducts.reduce(
        (
          acc: number,
          product: { quantity: number; product: { unitPrice: number } }
        ) => acc + product.quantity * product.product.unitPrice,
        0
      );

      // Xử lý thông tin voucher
      let voucherText = "Voucher: None";
      let discountAmount = 0;
      if (exportData.discount) {
        const discountValue = exportData.discount.discountValue;
        if (exportData.discount.percentage) {
          discountAmount = (subtotal * discountValue) / 100; // Tính giảm giá %
          voucherText = `Voucher: -$${discountAmount.toFixed(2)} (-${discountValue}%)`;
        } else {
          discountAmount = discountValue; // Giảm giá cố định
          voucherText = `Voucher: -$${discountAmount.toFixed(2)}`;
        }
      }

      // Tính toán Grand Total
      let grandTotal = subtotal - discountAmount;
      let deliveryFee = 0;

      // Nếu Grand Total khác exportData.total, thêm phí giao hàng $5
      if (grandTotal !== exportData.total) {
        deliveryFee = 5;
        grandTotal += deliveryFee;
      }

      // Hiển thị Subtotal
      pdf.text(
        `Subtotal: $${subtotal.toFixed(2)}`,
        pageWidth - 160,
        lastTableY + 30
      );

      // Hiển thị Voucher
      pdf.text(voucherText, pageWidth - 160, lastTableY + 50);

      // Hiển thị Delivery Fee nếu có
      if (deliveryFee > 0) {
        pdf.text(
          `Delivery Fee: $${deliveryFee.toFixed(2)}`,
          pageWidth - 160,
          lastTableY + 70
        );
      }

      // Hiển thị Grand Total
      pdf.text(
        `Grand Total: $${grandTotal.toFixed(2)}`,
        pageWidth - 160,
        lastTableY + (deliveryFee > 0 ? 90 : 70) // Điều chỉnh vị trí theo Delivery Fee
      );

      // Divider line
      pdf.line(
        50,
        lastTableY + (deliveryFee > 0 ? 100 : 80), // Điều chỉnh vị trí theo Delivery Fee
        pageWidth - 50,
        lastTableY + (deliveryFee > 0 ? 100 : 80)
      );

      // Footer Section
      pdf.setFont("times", "italic");
      pdf.setFontSize(10);
      pdf.text(
        "Thank you for your business!",
        50,
        lastTableY + (deliveryFee > 0 ? 75 : 55)
      );
      pdf.text(
        "If you have any questions, please contact us at beautify@gmail.com.",
        50,
        lastTableY + (deliveryFee > 0 ? 90 : 70)
      );

      // Save PDF
      pdf.save(`Sale_Ticket_${exportData.id}.pdf`);
    } catch (error) {
      console.error("Error exporting sale ticket:", error);
      // Display an error message (if using Snackbar or similar)
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteSaleTicket(+id);
      fetchData();
    } catch (error) {
      console.error("Error deleting sale ticket:", error);
    }
  };

  const handleOpenConfirmDialog = (id: string, status: string) => {
    setSelectedOrderId(id);
    setNextStatus(status);
    setConfirmDialogOpen(true);
  };

  const handleConfirmStatusChange = async () => {
    if (!selectedOrderId || !nextStatus) return;

    try {
      if (nextStatus === "DELIVERING") {
        await confirmDeliverySaleTicket(+selectedOrderId);
      } else if (nextStatus === "COMPLETED") {
        await confirmCompleteSaleTicket(+selectedOrderId);
      }

      fetchData();
      setConfirmDialogOpen(false);
      setSelectedOrderId(null);
      setNextStatus(null);
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const viewCreate = permissions?.find(
    (item) =>
      typeof item !== "string" &&
      item.apiPath === ALL_PERMISSION.ORDER_TICKET.CREATE_ADMIN.apiPath &&
      item.method === ALL_PERMISSION.ORDER_TICKET.CREATE_ADMIN.method
  );

  const viewDetail = permissions?.find(
    (item) =>
      typeof item !== "string" &&
      item.apiPath === ALL_PERMISSION.ORDER_TICKET.DETAIL.apiPath &&
      item.method === ALL_PERMISSION.ORDER_TICKET.DETAIL.method
  );

  const viewDelete = permissions?.find(
    (item) =>
      typeof item !== "string" &&
      item.apiPath === ALL_PERMISSION.ORDER_TICKET.DELETE.apiPath &&
      item.method === ALL_PERMISSION.ORDER_TICKET.DELETE.method
  );

  const viewDelivering = permissions?.find(
    (item) =>
      typeof item !== "string" &&
      item.apiPath === ALL_PERMISSION.ORDER_TICKET.CONFIRM_DELIVERY.apiPath &&
      item.method === ALL_PERMISSION.ORDER_TICKET.CONFIRM_DELIVERY.method
  );

  const viewComplete = permissions?.find(
    (item) =>
      typeof item !== "string" &&
      item.apiPath === ALL_PERMISSION.ORDER_TICKET.CONFIRM_COMPLETE.apiPath &&
      item.method === ALL_PERMISSION.ORDER_TICKET.CONFIRM_COMPLETE.method
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
      field: "customer",
      headerName: "Customer",
      width: 150,
      align: "left",
      flex: 0.5,
      headerAlign: "left",
    },
    { field: "date", headerName: "Date", flex: 0.5 },
    {
      field: "total",
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
          {params.row.status === "PREPARING" ? (
            <Button
              variant="outlined"
              color="inherit" // Use warning for pending payment
              size="small"
              onClick={() => {
                handleOpenConfirmDialog(params.row.id, "DELIVERING");
              }}
              sx={{ textTransform: "none" }}
            >
              Preparing
            </Button>
          ) : params.row.status === "DELIVERING" ? (
            viewDelivering && (
              <Button
                variant="outlined"
                color="warning" // Use success for paid
                size="small"
                onClick={() => {
                  handleOpenConfirmDialog(params.row.id, "COMPLETED");
                }}
                sx={{ textTransform: "none" }}
              >
                Delivering
              </Button>
            )
          ) : (
            viewComplete && (
              <Button
                variant="outlined"
                color="success" // Use success for paid
                size="small"
                sx={{ textTransform: "none" }}
              >
                Completed
              </Button>
            )
          )}

          {viewDetail && (
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

          {params.row.status !== "COMPLETED" && viewDelete && (
            <Button
              variant="outlined"
              color="warning" // Use warning for pending payment
              size="small"
              onClick={() => handleDelete(params.row.id)}
              sx={{ textTransform: "none" }}
            >
              Delete
            </Button>
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
      {/* Flex container for search and add button */}
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
          <Button
            variant="contained"
            onClick={() => setOpenModal(true)} // Open modal
          >
            Add New Order Ticket
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

      <OrderTicket
        open={openModal}
        handleClose={() => setOpenModal(false)}
        onAdded={fetchData} // Close modal
      />

      {selectedDetail && (
        <OrderTicketDetailModal
          open={isDetailOpen}
          onClose={() => {
            setDetailOpen(false); // Đóng modal
            setSelectedDetail(null); // Reset dữ liệu chi tiết
          }}
          data={selectedDetail} // Truyền dữ liệu chi tiết
        />
      )}
      <Dialog
        open={confirmDialogOpen}
        onClose={() => setConfirmDialogOpen(false)}
        aria-labelledby="confirm-dialog-title"
        aria-describedby="confirm-dialog-description"
      >
        <DialogTitle id="confirm-dialog-title">
          Confirm Status Change
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="confirm-dialog-description">
            Are you sure you want to change the status of this order to{" "}
            <b>
              <span
                style={{
                  color:
                    nextStatus === "DELIVERING"
                      ? "blue"
                      : nextStatus === "COMPLETED"
                        ? "green"
                        : "black",
                }}
              >
                {nextStatus}
              </span>
            </b>
            ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDialogOpen(false)} color="inherit">
            Cancel
          </Button>
          <Button onClick={handleConfirmStatusChange} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default OrderTicketTable;
