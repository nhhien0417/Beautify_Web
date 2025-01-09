import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  InputAdornment,
  TextField,
} from "@mui/material";
import { SetStateAction, useEffect, useState } from "react";
import { Search } from "@mui/icons-material";
import jsPDF from "jspdf";
import "jspdf-autotable";
import ServiceTicket from "./ServiceTicket/ServiceTicket";
import DetailServiceTicket from "./ServiceTicket/DetailServiceTicket";
import {
  getAllServiceTicketAdmin,
  confirmCheckoutServiceTicket,
  confirmServiceTicket,
  getDetailServiceTicketAdmin,
} from "../../../config/api";
import { formatDate } from "../../../services/date";
import { ALL_PERMISSION } from "../../../config/permission";
import { useUserStore } from "../../../zustand/useUserStore";
interface TableData {
  id: string;
  date: string;
  totalPrice: number;
  customer: string;
  status: boolean;
  checkout: boolean;
}

export default function ServiceTicketTable() {
  const [searchText, setSearchText] = useState("");
  const [allItems, setAllItems] = useState<TableData[]>([]);
  const [filteredRows, setFilteredRows] = useState<TableData[]>([]);
  const [displayRows, setDisplayRows] = useState<TableData[]>([]);
  const [totalRows, setTotalRows] = useState(0);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);

  const [isOrderTicketOpen, setOrderTicketOpen] = useState(false);
  const [selectedDetail, setSelectedDetail] = useState<any | null>(null);
  const [isDetailOpen, setDetailOpen] = useState(false);
  const { account } = useUserStore();
  const permissions = account.role.permissions;
  const [confirmationDialog, setConfirmationDialog] = useState({
    open: false,
    title: "",
    content: "",
    onConfirm: () => {},
  });

  const fetchData = async () => {
    try {
      const res = await getAllServiceTicketAdmin(1, 100);
      const tickets = res.data.result.map((serviceticket: any) => ({
        id: serviceticket.id.toString(),
        date: serviceticket.date,
        totalPrice: serviceticket.total,
        customer: serviceticket.user.name,
        checkout: serviceticket.checkout,
        status: serviceticket.status,
      }));
      tickets.sort(
        (
          a: {
            date: string;
            status: any;
            checkout: any;
          },
          b: {
            date: string;
            status: any;
            checkout: any;
          }
        ) => {
          if (a.status !== b.status) {
            return a.status ? 1 : -1;
          }
          if (a.checkout !== b.checkout) {
            return a.checkout ? 1 : -1;
          }
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        }
      );

      const formattedTickets = tickets.map((ticket: any) => ({
        ...ticket,
        date: formatDate(ticket.date),
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

  const handleAddNew = () => {
    setOrderTicketOpen(true);
  };

  const handleCloseOrderTicket = () => {
    setOrderTicketOpen(false);
  };

  const handleExport = async (id: string) => {
    try {
      const response = await getDetailServiceTicketAdmin(+id);
      const exportData = response.data;

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
      pdf.text("SERVICE TICKET DETAIL", pageWidth - 100, 40, {
        align: "right",
      });

      // Divider Line
      pdf.setLineWidth(0.5);
      pdf.line(50, 85, pageWidth - 50, 85);

      // Ticket Info
      pdf.setFontSize(12);
      pdf.setFont("times", "normal");
      pdf.text(`Service Ticket ID: ${exportData.serviceTicket.id}`, 50, 110);
      pdf.text(`Date: ${formatDate(exportData.serviceTicket.date)}`, 50, 125);
      pdf.text(`Customer: ${exportData.serviceTicket.user.name}`, 50, 140);
      pdf.text(
        `Total Price: $${exportData.serviceTicket.total.toFixed(2)}`,
        50,
        155
      );

      // Table
      const tableColumns = ["#", "Service", "Price"];
      const tableRows = exportData.listServices.map(
        (service: { name: any; price: number }, index: number) => [
          index + 1,
          service.name,
          `$${service.price.toFixed(2)}`,
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
          0: { cellWidth: 40, halign: "center" },
          1: { cellWidth: 300, halign: "left" },
          2: { cellWidth: 100, halign: "center" },
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
      pdf.save(`Service_Ticket_${exportData.serviceTicket.id}.pdf`);
    } catch (error) {
      console.error("Error exporting service ticket:", error);
      // Display an error message (if using Snackbar or similar)
    }
  };

  const handleConfirmCheckout = async (id: string) => {
    setConfirmationDialog({
      open: true,
      title: "Confirm Checkout",
      content: "Are you sure you want to mark this ticket as paid?",
      onConfirm: async () => {
        try {
          await confirmCheckoutServiceTicket(+id);
          fetchData();
        } catch (error) {
          console.error("Error confirming checkout:", error);
        }
      },
    });
  };

  const handleConfirmService = async (id: string) => {
    setConfirmationDialog({
      open: true,
      title: "Confirm Service",
      content: "Are you sure you want to mark this ticket as done?",
      onConfirm: async () => {
        try {
          await confirmServiceTicket(+id);
          fetchData();
        } catch (error) {
          console.error("Error confirming service:", error);
        }
      },
    });
  };

  const handleDetailClick = async (id: string) => {
    try {
      const response = await getDetailServiceTicketAdmin(+id);
      setSelectedDetail(response.data);
      setDetailOpen(true);
    } catch (error) {
      console.error("Error fetching service ticket details:", error);
    }
  };

  const viewAddNewServiceTicket = permissions?.find(
    (item) =>
      typeof item !== "string" &&
      item.apiPath === ALL_PERMISSION.SERVICE_TICKET.CREATE.apiPath &&
      item.method === ALL_PERMISSION.SERVICE_TICKET.CREATE.method
  );

  const viewConfirmServiceTicket = permissions?.find(
    (item) =>
      typeof item !== "string" &&
      item.apiPath ===
        ALL_PERMISSION.SERVICE_TICKET.CONFIRM_SERVICE_TICKET.apiPath &&
      item.method ===
        ALL_PERMISSION.SERVICE_TICKET.CONFIRM_SERVICE_TICKET.method
  );

  const viewConfirmCheckoutServiceTicket = permissions?.find(
    (item) =>
      typeof item !== "string" &&
      item.apiPath === ALL_PERMISSION.SERVICE_TICKET.CONFIRM_CHECKOUT.apiPath &&
      item.method === ALL_PERMISSION.SERVICE_TICKET.CONFIRM_CHECKOUT.method
  );

  const viewDetailServiceTicket = permissions?.find(
    (item) =>
      typeof item !== "string" &&
      item.apiPath === ALL_PERMISSION.SERVICE_TICKET.DETAIL.apiPath &&
      item.method === ALL_PERMISSION.SERVICE_TICKET.DETAIL.method
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
      flex: 0.75,
      type: "string",
      align: "left",
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
          {viewConfirmCheckoutServiceTicket && (
            <>
              {params.row.checkout === false ? (
                <Button
                  variant="outlined"
                  color="warning"
                  size="small"
                  onClick={() => handleConfirmCheckout(params.row.id)}
                  sx={{ textTransform: "none" }}
                >
                  Pending payment
                </Button>
              ) : (
                <Button
                  variant="outlined"
                  color="success"
                  size="small"
                  sx={{ textTransform: "none" }}
                >
                  Paid
                </Button>
              )}
            </>
          )}

          {viewConfirmServiceTicket && (
            <>
              {params.row.status === false ? (
                <Button
                  variant="outlined"
                  color="error"
                  size="small"
                  onClick={() => handleConfirmService(params.row.id)}
                  sx={{ textTransform: "none" }}
                >
                  Not done
                </Button>
              ) : (
                <Button
                  variant="outlined"
                  color="success"
                  size="small"
                  sx={{ textTransform: "none" }}
                >
                  Done
                </Button>
              )}
            </>
          )}
          {viewDetailServiceTicket && (
            <Button
              variant="outlined"
              color="primary"
              size="small"
              sx={{ textTransform: "none" }}
              onClick={() => handleDetailClick(params.row.id)}
            >
              Detail
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
      <Box
        justifyContent="space-between"
        display="flex"
        alignItems="center"
        sx={{ marginBottom: 2 }}
      >
        <TextField
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
          placeholder="Search by ID"
          variant="outlined"
          value={searchText}
          onChange={handleSearchChange}
          sx={{ width: "25%", height: "auto", backgroundColor: "white" }}
        />
        {viewAddNewServiceTicket && (
          <Button variant="contained" color="primary" onClick={handleAddNew}>
            Add New Service Ticket
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

      <ServiceTicket
        open={isOrderTicketOpen}
        handleClose={handleCloseOrderTicket}
        onAdded={fetchData}
      />

      {selectedDetail && (
        <DetailServiceTicket
          open={isDetailOpen}
          onClose={() => {
            setDetailOpen(false);
            setSelectedDetail(null);
          }}
          data={selectedDetail}
        />
      )}

      <Dialog
        open={confirmationDialog.open}
        onClose={() =>
          setConfirmationDialog({ ...confirmationDialog, open: false })
        }
      >
        <DialogTitle>{confirmationDialog.title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{confirmationDialog.content}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() =>
              setConfirmationDialog({ ...confirmationDialog, open: false })
            }
            color="error"
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              confirmationDialog.onConfirm();
              setConfirmationDialog({ ...confirmationDialog, open: false });
            }}
            color="primary"
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
