import { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Switch,
  TextField,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid,
  Chip,
  FormControlLabel,
  Alert,
  Snackbar,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { createNewRole } from "../../../../config/api";
interface Permission {
  id: string;
  name: string;
  apiPath: string;
  method: string;
}

interface PermissionGroup {
  name: string; // Module Name
  permissions: Permission[];
}

const AddRoleModal = ({
  open,
  handleClose,
  onAdded,
  permissions = [],
}: any) => {
  const [roleName, setRoleName] = useState("");
  const [description, setDescription] = useState("");
  const [isActive, setIsActive] = useState(true);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const handleCloseSnackbar = () => {
    setSnackbar({ open: false, message: "", severity: "success" });
  };

  // Mock data for permissions
  const groupedPermissions: PermissionGroup[] = (permissions || []).reduce(
    (
      groups: { name: any; permissions: any[] }[],
      permission: { module: string }
    ) => {
      const moduleName = permission.module?.toUpperCase() || "UNKNOWN"; // Lấy module hoặc gán UNKNOWN nếu không tồn tại
      const group = groups.find((g) => g.name === moduleName);

      if (group) {
        group.permissions.push(permission);
      } else {
        groups.push({ name: moduleName, permissions: [permission] });
      }

      return groups;
    },
    [] as PermissionGroup[]
  );

  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);

  const togglePermission = (id: string) => {
    setSelectedPermissions((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
    );
  };

  const toggleAllPermissions = (groupName: string) => {
    const group = groupedPermissions.find((g) => g.name === groupName);
    if (!group) return;

    const groupPermissionIds = group.permissions.map((p) => p.id);
    const allSelected = groupPermissionIds.every((id) =>
      selectedPermissions.includes(id)
    );

    setSelectedPermissions((prev) =>
      allSelected
        ? prev.filter((id) => !groupPermissionIds.includes(id))
        : [...new Set([...prev, ...groupPermissionIds])]
    );
  };

  const getMethodColor = (method: string) => {
    switch (method) {
      case "GET":
        return "success";
      case "POST":
        return "primary";
      case "PUT":
        return "warning";
      case "DELETE":
        return "error";
      default:
        return "default";
    }
  };

  const handleSubmit = async () => {
    const payload = {
      name: roleName,
      description,
      active: isActive,
      permissions: selectedPermissions.map((id) => ({ id: Number(id) })),
    };

    if (!roleName || !description) {
      setSnackbar({
        open: true,
        message: "Please fill in all required fields.",
        severity: "error",
      });
      return;
    }

    try {
      const res = await createNewRole(
        payload.name,
        payload.description,
        payload.active,
        payload.permissions
      );
      const statusCode = (res as unknown as { statusCode: number }).statusCode;
      if (statusCode === 400) {
        setSnackbar({
          open: true,
          message: "Role already exists.",
          severity: "error",
        });
      } else if (statusCode === 200) {
        setSnackbar({
          open: true,
          message: "Role created successfully!",
          severity: "success",
        });
        setDescription("");
        setRoleName("");
        handleClose();

        if (onAdded) {
          onAdded();
        }
      }
    } catch (error) {
      console.error("Role creating permission", error);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
      <DialogTitle fontWeight={600}>Add new Role</DialogTitle>
      <DialogContent style={{ maxHeight: "70vh", overflowY: "auto" }}>
        {/* Role Name */}
        <Box mb={2}>
          <Typography variant="subtitle1">Role</Typography>
          <TextField
            fullWidth
            placeholder="Enter role"
            value={roleName}
            onChange={(e) => setRoleName(e.target.value)}
          />
        </Box>

        {/* Description */}
        <Box mb={2}>
          <Typography variant="subtitle1">Description</Typography>
          <TextField
            fullWidth
            placeholder="Enter description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            multiline
            rows={2}
          />
        </Box>

        {/* Status */}
        <Box mb={2}>
          <FormControlLabel
            control={
              <Switch
                checked={isActive}
                onChange={() => setIsActive(!isActive)}
              />
            }
            label={isActive ? "Active" : "Inactive"}
          />
        </Box>

        {/* Permissions */}
        <Box>
          <Typography fontWeight={600} mb={1}>
            Permissions
          </Typography>
          {groupedPermissions.map((group) => (
            <Accordion key={group.name} defaultExpanded>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={group.permissions.every((p) =>
                        selectedPermissions.includes(p.id)
                      )}
                      onChange={() => toggleAllPermissions(group.name)}
                    />
                  }
                  label={
                    <Typography variant="subtitle1">{group.name}</Typography>
                  }
                />
              </AccordionSummary>
              <AccordionDetails style={{ overflowX: "hidden" }}>
                {group.permissions.map((permission) => (
                  <Grid
                    container
                    alignItems="center"
                    key={permission.id}
                    spacing={2}
                    mb={1}
                  >
                    <Grid item xs={12} sm={6} md={4}>
                      <Typography>{permission.name}</Typography>
                    </Grid>
                    <Grid item xs={2}>
                      <Chip
                        label={permission.method}
                        color={getMethodColor(permission.method)}
                        sx={{ fontWeight: "bold" }}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <Typography
                        variant="body2"
                        sx={{ color: "gray", fontStyle: "italic" }}
                      >
                        {permission.apiPath}
                      </Typography>
                    </Grid>
                    <Grid item xs={2}>
                      <Switch
                        checked={selectedPermissions.includes(permission.id)}
                        onChange={() => togglePermission(permission.id)}
                      />
                    </Grid>
                  </Grid>
                ))}
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Save
        </Button>
      </DialogActions>
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
    </Dialog>
  );
};

export default AddRoleModal;
