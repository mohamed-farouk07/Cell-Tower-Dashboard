import React, { useState, useMemo } from "react";
import {
  Box,
  Typography,
  TextField,
  IconButton,
  MenuItem,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import RefreshIcon from "@mui/icons-material/Refresh";
import { GridColDef } from "@mui/x-data-grid";
import Table from "../../../components/ui/Table";
import ActionsMenu from "../../../components/ui/ActionsMenu";
import LargeModal from "../../../components/modals/LargeModal";
import ViewForm from "./forms/ViewForm";
import { useTranslation } from "react-i18next";

// Define interface for user data
interface RecordsData {
  id: number;
  agentId: string;
  caseNo: string;
  serviceCategory: string;
  callType: string;
  callAbout: string;
  callDirection: string;
  callStatus: string;
  latestCallback: string;
  orderNumber: number;
  createdDate: string;
  url: string; // Add the URL field
}

const RecordsPage: React.FC = () => {
  const { t } = useTranslation();
  const [filters, setFilters] = useState({
    agentId: "",
    caseNo: "",
    serviceCategory: "",
    callType: "",
    callAbout: "",
    callDirection: "",
    callStatus: "",
    latestCallback: "",
    orderNumber: "",
    createdDate: "",
  });

  // State for managing the modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<RecordsData | null>(
    null
  );

  const columns: GridColDef[] = useMemo(
    () => [
      { field: "id", headerName: t("id"), width: 100 },
      { field: "agentId", headerName: t("agentId"), flex: 1 },
      { field: "caseNo", headerName: t("caseNo"), flex: 1 },
      { field: "serviceCategory", headerName: t("serviceCategory"), flex: 1 },
      { field: "callType", headerName: t("callType"), flex: 1 },
      { field: "callAbout", headerName: t("callAbout"), flex: 1 },
      { field: "callDirection", headerName: t("callDirection"), flex: 1 },
      { field: "callStatus", headerName: t("callStatus"), flex: 1 },
      { field: "latestCallback", headerName: t("latestCallback"), flex: 1 },
      {
        field: "orderNumber",
        headerName: t("orderNumber"),
        flex: 1,
        type: "number",
      },
      { field: "createdDate", headerName: t("createdDate"), flex: 1 },
      {
        field: "actions",
        headerName: t("actions"),
        width: 120,
        renderCell: (params) => (
          <ActionsMenu
            id={params.row.id}
            onViewRecord={() => handleViewRecord(params.row)} // Pass the entire record
            showViewAction={true}
          />
        ),
      },
    ],
    [t]
  );

  const initialRows: RecordsData[] = useMemo(
    () => [
      {
        id: 1,
        agentId: "A123",
        caseNo: "C456",
        serviceCategory: "Internet",
        callType: "Support",
        callAbout: "Slow Connection",
        callDirection: "Inbound",
        callStatus: "Resolved",
        latestCallback: "2025-03-10 14:00",
        orderNumber: 789,
        createdDate: "2025-03-09 10:00",
        url: "/src/assets/records/ring.mp3",
      },
      {
        id: 2,
        agentId: "B456",
        caseNo: "C789",
        serviceCategory: "TV",
        callType: "Inquiry",
        callAbout: "Billing",
        callDirection: "Outbound",
        callStatus: "Pending",
        latestCallback: "2025-03-11 09:30",
        orderNumber: 456,
        createdDate: "2025-03-08 12:45",
        url: "/src/assets/records/ring.mp3",
      },
      {
        id: 3,
        agentId: "C789",
        caseNo: "C123",
        serviceCategory: "Mobile",
        callType: "Complaint",
        callAbout: "Service Down",
        callDirection: "Inbound",
        callStatus: "In Progress",
        latestCallback: "2025-03-10 16:45",
        orderNumber: 123,
        createdDate: "2025-03-07 08:15",
        url: "/src/assets/records/ring.mp3",
      },
      {
        id: 4,
        agentId: "D101",
        caseNo: "C321",
        serviceCategory: "Internet",
        callType: "Support",
        callAbout: "Setup Issue",
        callDirection: "Outbound",
        callStatus: "Resolved",
        latestCallback: "2025-03-12 11:20",
        orderNumber: 654,
        createdDate: "2025-03-06 14:25",
        url: "/src/assets/records/ring.mp3",
      },
    ],
    []
  );

  const [rows, setRows] = useState(initialRows);

  const handleSearch = () => {
    const filteredRows = initialRows.filter((row) =>
      Object.entries(filters).every(([key, value]) =>
        value
          ? String(row[key as keyof Omit<RecordsData, "id">])
              .toLowerCase()
              .includes(value.toLowerCase())
          : true
      )
    );
    setRows(filteredRows);
  };

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleReset = () => {
    setFilters({
      agentId: "",
      caseNo: "",
      serviceCategory: "",
      callType: "",
      callAbout: "",
      callDirection: "",
      callStatus: "",
      latestCallback: "",
      orderNumber: "",
      createdDate: "",
    });
    setRows(initialRows);
  };

  // Handle opening the modal and setting the selected record
  const handleViewRecord = (record: RecordsData) => {
    setSelectedRecord(record);
    setIsModalOpen(true);
  };

  // Handle closing the modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedRecord(null);
  };

  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 2,
        overflow: "hidden",
      }}
    >
      <Typography variant="h4" sx={{ fontWeight: "bold" }}>
        {t("records")}
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
          gap: 2,
          alignItems: "center",
        }}
      >
        {Object.keys(filters).map((filterKey) => (
          <React.Fragment key={filterKey}>
            {filterKey === "createdDate" ? (
              <input
                type="date"
                name="createdDate"
                value={filters.createdDate}
                onChange={handleFilterChange}
                style={{
                  minWidth: 120,
                  height: 40,
                  padding: "8px",
                  border: "1px solid #3E337C",
                  borderRadius: "4px",
                }}
              />
            ) : (
              <TextField
                key={filterKey}
                label={t(filterKey)}
                name={filterKey}
                select={filterKey === "callDirection"}
                value={filters[filterKey as keyof typeof filters]}
                onChange={handleFilterChange}
                size="small"
                sx={{ minWidth: 120, height: 40 }}
                type={filterKey === "orderNumber" ? "number" : "text"}
              >
                {filterKey === "callDirection"
                  ? ["", t("inbound"), t("outbound")].map((option) => (
                      <MenuItem key={option} value={option}>
                        {option || t("all")}
                      </MenuItem>
                    ))
                  : null}
              </TextField>
            )}
          </React.Fragment>
        ))}
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-center",
            gap: 2,
          }}
        >
          <IconButton
            aria-label={t("reset")}
            onClick={handleReset}
            size="small"
            sx={{
              height: 40,
              width: 40,
              backgroundColor: "error.main",
              color: "white",
              "&:hover": {
                backgroundColor: "secondary.dark",
              },
            }}
          >
            <RefreshIcon />
          </IconButton>
          <IconButton
            aria-label={t("search")}
            onClick={handleSearch}
            size="small"
            sx={{
              height: 40,
              width: 40,
              backgroundColor: "primary.main",
              color: "white",
              "&:hover": {
                backgroundColor: "primary.dark",
              },
            }}
          >
            <SearchIcon />
          </IconButton>
        </Box>
      </Box>

      <Table
        rows={rows}
        columns={columns}
        disableExport
        disableDensity
        disableSearch
      />

      {/* Large Modal for Viewing Record */}
      <LargeModal
        open={isModalOpen}
        onClose={handleCloseModal}
        title={t("viewRecord")}
        showSubmitButton={false}
      >
        {selectedRecord && <ViewForm selectedRecord={selectedRecord} />}
      </LargeModal>
    </Box>
  );
};

export default RecordsPage;
