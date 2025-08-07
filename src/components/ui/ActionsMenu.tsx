import React, { useState } from "react";
import { IconButton, Menu, MenuItem, Tooltip } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { useTranslation } from "react-i18next";

interface ActionsMenuProps {
  id: number;
  onEdit?: (id: number) => void;
  onDelete?: (id: number) => void;
  onCopy?: (id: number) => void;
  onView?: (id: number) => void;
  onViewRecord?: (id: number) => void;
  showViewAction?: boolean;
}

const ActionsMenu = ({
  id,
  onEdit,
  onDelete,
  onCopy,
  onView,
  onViewRecord,
  showViewAction = false,
}: ActionsMenuProps) => {
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    if (onEdit) {
      onEdit(id);
      handleClose();
    }
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete(id);
      handleClose();
    }
  };

  const handleCopy = () => {
    if (onCopy) {
      onCopy(id);
      handleClose();
    }
  };

  const handleView = () => {
    if (onView) {
      onView(id);
      handleClose();
    }
  };

  const handleViewRecord = () => {
    if (onViewRecord) {
      onViewRecord(id);
      handleClose();
    }
  };

  return (
    <div>
      <IconButton
        aria-label="actions"
        onClick={handleClick}
        sx={{ color: "primary.main" }}
      >
        <MoreVertIcon />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        {/* View Record Action */}
        {onViewRecord && (
          <Tooltip title={t("viewRecord")} placement="left">
            <MenuItem onClick={handleViewRecord}>
              <SupportAgentIcon sx={{ color: "info.main", marginRight: 1 }} />
              {t("viewRecord")}
            </MenuItem>
          </Tooltip>
        )}

        {/* View User Action */}
        {showViewAction && onView && (
          <Tooltip title={t("viewUser")} placement="left">
            <MenuItem onClick={handleView}>
              <VisibilityIcon sx={{ color: "success.main", marginRight: 1 }} />
              {t("viewUser")}
            </MenuItem>
          </Tooltip>
        )}

        {/* Edit Action */}
        {onEdit && (
          <Tooltip title={t("edit")} placement="left">
            <MenuItem onClick={handleEdit}>
              <EditIcon sx={{ marginRight: 1 }} />
              {t("edit")}
            </MenuItem>
          </Tooltip>
        )}

        {/* Copy/Clone Action */}
        {onCopy && (
          <Tooltip title={t("clone")} placement="left">
            <MenuItem onClick={handleCopy}>
              <ContentCopyIcon sx={{ color: "info.main", marginRight: 1 }} />
              {t("clone")}
            </MenuItem>
          </Tooltip>
        )}

        {/* Delete Action */}
        {onDelete && (
          <Tooltip title={t("delete")} placement="left">
            <MenuItem onClick={handleDelete}>
              <DeleteIcon sx={{ color: "error.main", marginRight: 1 }} />
              {t("delete")}
            </MenuItem>
          </Tooltip>
        )}
      </Menu>
    </div>
  );
};

export default ActionsMenu;