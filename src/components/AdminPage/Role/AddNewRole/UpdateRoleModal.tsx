import { useEffect, useState } from "react";
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
import { updateRole } from "../../../../config/api";
import { useUserStore } from "../../../../zustand/useUserStore";
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

const UpdateRoleModal = ({
  open,
  handleClose,
  onUpdated,
  initialData, // Role data được truyền từ RoleTable
  permissions, // Danh sách permissions toàn bộ
}: any) => {
  const [roleName, setRoleName] = useState("");
  const [description, setDescription] = useState("");
  const [isActive, setIsActive] = useState(true);
  const { account, setRole } = useUserStore();
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success", // "success" hoặc "error"
  });

  // Mock data for permissions
  const [permissionGroups, setPermissionGroups] = useState<PermissionGroup[]>(
    []
  );

  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);

  useEffect(() => {
    if (initialData) {
      // Gán dữ liệu role
      setRoleName(initialData.name);
      setDescription(initialData.description);
      setIsActive(initialData.active);

      // Gán permissions cho role
      const rolePermissionIds = initialData.permissions.map(
        (p: { id: any }) => p.id
      );
      setSelectedPermissions(rolePermissionIds);

      // Tạo groups permissions
      const groupedPermissions = permissions.reduce(
        (groups: { [x: string]: any }, p: { module: string | number }) => {
          const group = groups[p.module] || { name: p.module, permissions: [] };
          group.permissions.push(p);
          groups[p.module] = group;
          return groups;
        },
        {}
      );
      setPermissionGroups(Object.values(groupedPermissions));
    }
  }, [initialData, permissions]);

  const togglePermission = (id: string) => {
    setSelectedPermissions((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
    );
  };

  const toggleAllPermissions = (groupName: string) => {
    const group = permissionGroups.find((g) => g.name === groupName);
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
    const formData = {
      id: Number(initialData.id),
      name: roleName,
      description,
      active: isActive,
      permissions: selectedPermissions.map((id) => ({ id: Number(id) })), // Chỉ gửi ID
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
      const res = await updateRole(
        formData.id,
        formData.name,
        formData.description,
        formData.active,
        formData.permissions
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
          message: "Role updated successfully!",
          severity: "success",
        });
        if (account.role.id == formData.id.toString()) {
          setRole(res.data);
        }
        setDescription("");
        setRoleName("");

        if (onUpdated) {
          onUpdated();
        }
        handleClose();
      }
    } catch (error) {
      console.error("Role creating permission", error);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
      <DialogTitle fontWeight={600}>Update Role</DialogTitle>
      <DialogContent>
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
          {permissionGroups.map((group) => (
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
              <AccordionDetails>
                {group.permissions.map((permission) => (
                  <Grid
                    container
                    alignItems="center"
                    key={permission.id}
                    spacing={2}
                    mb={1}
                  >
                    <Grid item xs={4}>
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
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity as any}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Dialog>
  );
};

export default UpdateRoleModal;
