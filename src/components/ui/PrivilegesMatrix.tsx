import { forwardRef, useImperativeHandle, useState, useEffect, useMemo, useCallback } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Checkbox } from "@mui/material";
import { useTranslation } from "react-i18next";

interface Privilege {
  [key: string]: boolean;
}

export interface EntityPrivileges {
  entity: string;
  privileges: Privilege;
}

export interface PrivilegesMatrixRef {
  resetPrivileges: () => void;
}

type PrivilegesMatrixProps = object;

const PrivilegesMatrix = forwardRef<PrivilegesMatrixRef, PrivilegesMatrixProps>((_, ref) => {
  const { t } = useTranslation();

  // Memoized entities and privileges
  const entities = useMemo(
    () => [
      t("ad"),
      t("license"),
      t("projects"),
      t("categories"),
      t("severities"),
      t("applicationUsers"),
      t("usersRoles"),
      t("evaluationForms"),
      t("recordsList"),
      t("recordsComments"),
      t("reports"),
      t("myProfile"),
    ],
    [t]
  );

  const privilegeTypes = useMemo(
    () => [
      t("list"),
      t("add"),
      t("edit"),
      t("delete"),
      t("viewDetails"),
      t("export"),
      t("suspend"),
      t("activate"),
      t("manualSync"),
      t("autoSync"),
      t("viewLogs"),
      t("assign"),
      t("monitor"),
    ],
    [t]
  );

  // Use a single state object to avoid multiple re-renders
  const [privileges, setPrivileges] = useState<Record<string, Privilege>>({});

  // Initialize privileges once and update only when necessary
  useEffect(() => {
    setPrivileges(
      entities.reduce((acc, entity) => {
        acc[entity] = privilegeTypes.reduce((pAcc, privilege) => {
          pAcc[privilege] = false;
          return pAcc;
        }, {} as Privilege);
        return acc;
      }, {} as Record<string, Privilege>)
    );
  }, [entities, privilegeTypes]);

  // Reset privileges when called from parent
  useImperativeHandle(ref, () => ({
    resetPrivileges: () => {
      setPrivileges(() =>
        entities.reduce((acc, entity) => {
          acc[entity] = privilegeTypes.reduce((pAcc, privilege) => {
            pAcc[privilege] = false;
            return pAcc;
          }, {} as Privilege);
          return acc;
        }, {} as Record<string, Privilege>)
      );
    },
  }));

  // Optimized event handler using useCallback
  const handleCheckboxChange = useCallback(
    (entity: string, privilegeType: string, checked: boolean) => {
      setPrivileges((prevPrivileges) => ({
        ...prevPrivileges,
        [entity]: {
          ...prevPrivileges[entity],
          [privilegeType]: checked,
        },
      }));
    },
    []
  );

  return (
    <TableContainer sx={{ width: "100%", height: "100%" }}>
      <Table size="small" sx={{ tableLayout: "fixed" }}>
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: "bold", fontSize: "13px", padding: "6px", width: "12%" }}>
              {t("entities")}
            </TableCell>
            {privilegeTypes.map((type) => (
              <TableCell 
                key={type} 
                sx={{ 
                  fontWeight: "bold", 
                  fontSize: "13px", 
                  padding: "6px", 
                  width: `${88 / privilegeTypes.length}%`,
                  textAlign: "center",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis"
                }}
              >
                {type}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {entities.map((entity) => (
            <TableRow key={entity}>
              <TableCell 
                sx={{ 
                  fontWeight: "bold", 
                  fontSize: "13px", 
                  padding: "10px",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis"
                }}
              >
                {entity}
              </TableCell>
              {privilegeTypes.map((type) => (
                <TableCell key={type} sx={{ padding: "4px", textAlign: "center" }}>
                  <Checkbox
                    checked={privileges[entity]?.[type] || false}
                    onChange={(e) => handleCheckboxChange(entity, type, e.target.checked)}
                    sx={{ 
                      padding: 0, 
                      "& .MuiSvgIcon-root": { fontSize: 18 } 
                    }}
                  />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
});

export default PrivilegesMatrix;