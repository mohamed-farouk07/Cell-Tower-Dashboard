import { Box } from "@mui/material";
import {  
  DataGrid, 
  GridColDef, 
  GridToolbarContainer, 
  GridToolbarQuickFilter, 
  GridToolbarExport, 
  GridToolbarDensitySelector 
} from "@mui/x-data-grid";
import { useTranslation } from "react-i18next";

// Define the Table component props
interface TableProps<T> {
  rows: T[];
  columns: GridColDef[];
  pageSize?: number;
  pageSizeOptions?: number[];
  disableExport?: boolean;
  disableDensity?: boolean;
  disableSearch?: boolean;
}

const CustomToolbar = ({
  disableExport,
  disableDensity,
  disableSearch,
}: {
  disableExport?: boolean;
  disableDensity?: boolean;
  disableSearch?: boolean;
}) => {
  const { t } = useTranslation();
  
  return (
    <GridToolbarContainer>
      {!disableSearch && <GridToolbarQuickFilter />}
      {!disableDensity && (
        <GridToolbarDensitySelector
          slotProps={{
            tooltip: { title: t('density') },
          }}
        />
      )}
      {!disableExport && (
        <GridToolbarExport
          slotProps={{
            tooltip: { title: t('export') },
          }}
        />
      )}
    </GridToolbarContainer>
  );
};

function Table<T>({
  rows,
  columns,
  pageSize = 5,
  pageSizeOptions = [5, 10, 20],
  disableExport = false,
  disableDensity = false,
  disableSearch = false,
}: TableProps<T>) {
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        flex: 1,
        "& .MuiDataGrid-root": { border: "none" },
        "& .MuiDataGrid-columnHeaders": {
          backgroundColor: "#f5f5f5",
          fontWeight: "bold",
        },
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { pageSize, page: 0 },
          },
        }}
        pageSizeOptions={pageSizeOptions}
        disableRowSelectionOnClick
        disableColumnFilter
        disableColumnSelector
        // checkboxSelection this is for selectable rows
        slots={{
          toolbar: () => (
            <CustomToolbar
              disableExport={disableExport}
              disableDensity={disableDensity}
              disableSearch={disableSearch}
            />
          ),
        }}
        localeText={{
          toolbarQuickFilterPlaceholder: t("search"),
          toolbarDensity: t("density"),
          toolbarExport: t("export"),
          toolbarExportCSV: t("exportCSV"),
          toolbarExportPrint: t("exportPrint"),
          toolbarExportExcel: t("exportExcel"),
          MuiTablePagination: {
            labelRowsPerPage: t("rowsPerPage"),
          },
          toolbarDensityCompact: t("densityCompact"),
          toolbarDensityStandard: t("densityStandard"),
          toolbarDensityComfortable: t("densityComfortable"),
        }}
      />
    </Box>
  );
}

export default Table;