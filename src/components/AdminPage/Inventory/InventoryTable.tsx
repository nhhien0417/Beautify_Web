import { useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Snackbar,
  SnackbarContent,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import { saveInventory } from "../../../config/api";

const InventoryTable = () => {
  const [selectedDate, setSelectedDate] = useState(() => {
    const currentDate = new Date();
    return `${currentDate.getFullYear()}-${String(
      currentDate.getMonth() + 1
    ).padStart(2, "0")}`;
  });

  interface InventoryItem {
    productName: string;
    beginningInventory: number;
    totalImported: number;
    totalSold: number;
    endingInventory: number;
  }

  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const isFirstRender = useRef(true);

  const handleGetInventory = async () => {
    try {
      const [year, month] = selectedDate.split("-");
      const res = await saveInventory(+month, +year);
      setInventory(res.data.details);
    } catch (error) {
      console.error("Error fetching inventory:", error);
    }
  };

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      handleGetInventory();
    }
  }, []);

  const handleExportToExcel = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Inventory Report");

    // Tiêu đề Beautify
    worksheet.mergeCells("A1:F1");
    const titleCell = worksheet.getCell("A1");
    titleCell.value = "Beautify";
    titleCell.font = {
      bold: true,
      size: 18,
      color: { argb: "FF0000" },
    };
    titleCell.alignment = {
      horizontal: "center",
      vertical: "middle",
    };
    titleCell.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FFF9C4" }, // Soft yellow background
    };

    // Tiêu đề phụ Inventory Report
    worksheet.mergeCells("A2:F2");
    const subtitleCell = worksheet.getCell("A2");
    subtitleCell.value = "Inventory Report";
    subtitleCell.font = { bold: true, size: 14, color: { argb: "4CAF50" } }; // Green color
    subtitleCell.alignment = {
      horizontal: "center",
      vertical: "middle",
    };
    subtitleCell.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "E3F2FD" }, // Light blue background
    };

    // Ngày tháng
    worksheet.mergeCells("A3:F3");
    const dateCell = worksheet.getCell("A3");
    dateCell.value = `Month/Year: ${selectedDate}`;
    dateCell.font = { italic: true, color: { argb: "000000" } }; // Black color for date
    dateCell.alignment = {
      horizontal: "center",
      vertical: "middle",
    };
    dateCell.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "E3F2FD" }, // Light blue background
    };

    // Chừa một dòng trống trước bảng dữ liệu (row 4)
    worksheet.addRow([]);

    // Cột tiêu đề bảng bắt đầu từ dòng 6
    const headerRow = worksheet.getRow(6);
    headerRow.values = [
      "No.",
      "Name",
      "Beginning Inventory",
      "Total Imported",
      "Total Sold",
      "Ending Inventory",
    ];
    headerRow.font = { bold: true, size: 12, color: { argb: "FFFFFF" } }; // White font for header
    headerRow.alignment = { horizontal: "center", vertical: "middle" };
    headerRow.eachCell((cell) => {
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "1976D2" }, // Blue background for headers
      };
      cell.border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
    });

    // Thêm dữ liệu, bắt đầu từ dòng 7
    inventory.forEach((row, index) => {
      const rowIndex = index + 7;
      const dataRow = worksheet.getRow(rowIndex);
      dataRow.values = [
        index + 1,
        row.productName,
        row.beginningInventory,
        row.totalImported,
        row.totalSold,
        row.endingInventory,
      ];
      dataRow.eachCell((cell) => {
        cell.alignment = { horizontal: "center", vertical: "middle" };
        cell.border = {
          top: { style: "thin" },
          left: { style: "thin" },
          bottom: { style: "thin" },
          right: { style: "thin" },
        };
      });

      // Align product name to the left
      const productNameCell = dataRow.getCell(2); // Product name is in the second column (index 2)
      productNameCell.alignment = { horizontal: "left", vertical: "middle" };

      // Alternate row color for better readability
      if (index % 2 === 0) {
        dataRow.eachCell((cell) => {
          cell.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "E3F2FD" }, // Light blue background for alternate rows
          };
        });
      }
    });

    // **Canh độ rộng tự động dựa trên nội dung**
    if (worksheet.columns) {
      worksheet.columns.forEach((column) => {
        let maxLength = 0;
        if (column.eachCell) {
          column.eachCell({ includeEmpty: true }, (cell) => {
            const cellValue = cell.value ? cell.value.toString() : "";
            maxLength = Math.max(maxLength, cellValue.length);
          });
        }
        column.width = maxLength < 20 ? 20 : maxLength + 5; // Set minimum width to 20
      });
    }

    // Lưu file
    const buffer = await workbook.xlsx.writeBuffer();
    const data = new Blob([buffer], { type: "application/octet-stream" });
    saveAs(data, "Beautify_Inventory_Report.xlsx");
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Box>
      {/* Header */}
      <Box
        justifyContent="space-between"
        display="flex"
        alignItems="center"
        sx={{ marginBottom: 2 }}
      >
        <TextField
          label="Month"
          type="month"
          value={selectedDate}
          onChange={(e) => {
            const selected = e.target.value;
            const currentDate = new Date();
            const currentYearMonth = `${currentDate.getFullYear()}-${String(
              currentDate.getMonth() + 1
            ).padStart(2, "0")}`;

            if (selected > currentYearMonth) {
              setOpenSnackbar(true); // Hiển thị Snackbar khi chọn tháng tương lai
              return;
            }

            setSelectedDate(selected);
          }}
          InputLabelProps={{ shrink: true }}
          sx={{ width: "15%", backgroundColor: "white" }}
        />

        <Box>
          <Button
            variant="contained"
            sx={{
              textTransform: "none",
              marginRight: 2,
              width: "100px",
            }}
            onClick={handleGetInventory}
          >
            Refresh
          </Button>
          <Button
            variant="contained"
            color="success"
            onClick={handleExportToExcel}
            sx={{ textTransform: "none", width: "100px" }}
          >
            Export
          </Button>
        </Box>
      </Box>

      {/* Bảng */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow
              sx={{
                backgroundColor: "#1976d2",
                boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.2)",
              }}
            >
              <TableCell sx={{ color: "#ffffff", fontWeight: "bold" }}>
                No.
              </TableCell>
              <TableCell sx={{ color: "#ffffff", fontWeight: "bold" }}>
                Name
              </TableCell>
              <TableCell sx={{ color: "#ffffff", fontWeight: "bold" }}>
                Beginning Inventory
              </TableCell>
              <TableCell sx={{ color: "#ffffff", fontWeight: "bold" }}>
                Total Imported
              </TableCell>
              <TableCell sx={{ color: "#ffffff", fontWeight: "bold" }}>
                Total Sold
              </TableCell>
              <TableCell sx={{ color: "#ffffff", fontWeight: "bold" }}>
                Ending Inventory
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {inventory.map((row, index) => (
              <TableRow key={index}>
                <TableCell sx={{ textAlign: "center" }}>{index + 1}</TableCell>
                <TableCell>{row.productName}</TableCell>
                <TableCell sx={{ textAlign: "center" }}>
                  {row.beginningInventory}
                </TableCell>
                <TableCell sx={{ textAlign: "center" }}>
                  {row.totalImported}
                </TableCell>
                <TableCell sx={{ textAlign: "center" }}>
                  {row.totalSold}
                </TableCell>
                <TableCell sx={{ textAlign: "center" }}>
                  {row.endingInventory}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Snackbar */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
      >
        <SnackbarContent
          message="You cannot select a future date."
          sx={{
            backgroundColor: "#f44336",
            color: "white",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
          action={
            <IconButton
              size="small"
              color="inherit"
              onClick={handleCloseSnackbar}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          }
        />
      </Snackbar>
    </Box>
  );
};

export default InventoryTable;
