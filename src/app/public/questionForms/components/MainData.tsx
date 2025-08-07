import React from "react";
import {
  Box,
  TextField,
  FormControlLabel,
  Checkbox,
  Radio,
  RadioGroup,
  CircularProgress,
  Slider,
  Typography,
  Alert,
} from "@mui/material";
import { Control, Controller, FieldErrors } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { FormData } from "../QuestionsPage";

interface MainDataSectionProps {
  control: Control<FormData>;
  errors: FieldErrors<FormData>;
  onFormTypeChange?: (type: string) => void;
}

const MainDataSection: React.FC<MainDataSectionProps> = ({
  control,
  errors,
  onFormTypeChange,
}) => {
  const { t } = useTranslation();

  const marks = [
    { value: 0, label: "0%" },
    { value: 33.3, label: "33.3%" },
    { value: 66.6, label: "66.6%" },
    { value: 100, label: "100%" },
  ];

  const getCircularProgressProps = (value: number[]) => {
    const [min, max] = value;
    const average = (min + max) / 2;
    let color = "#ff0000";
    let label = t("needsImprovement");
    let description = [
      t("theEmployeePerformsExpected"),
      t("longResolutionTimes"),
      t("lackingClarity"),
      t("receivingFrequent"),
      t("failingToFollow"),
      t("lowProductivity"),
      t("needsCoaching"),
    ];

    if (average >= 33.3 && average < 66.6) {
      color = "#003399";
      label = t("meetsExpectations");
      description = [
        t("satisfactoryLevel"),
        t("resolvingCustomer"),
        t("clearPolite"),
        t("consistentlyAchieving"),
        t("followingCall"),
        t("meetingCallVolume"),
        t("canImproveEfficiency"),
      ];
    } else if (average >= 66.6) {
      color = "#50BF73";
      label = t("exceedsExpectations");
      description = [
        t("employeeConsistently"),
        t("quickAndEffective"),
        t("engagingEmpathetic"),
        t("highPositive"),
        t("masteringGuidelines"),
        t("handlingCalls"),
        t("eligibleForRewards"),
      ];
    }

    return {
      color,
      label,
      value: average,
      description,
    };
  };

  return (
    <>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 3, mb: 4 }}>
        {/* Form Name and Form Description in One Row */}
        <Box sx={{ display: "flex", gap: 2 }}>
          {/* Form Name */}
          <Controller
            name="formName"
            control={control}
            rules={{ required: t("formNameRequired") }}
            render={({ field }) => (
              <TextField
                {...field}
                className="form-name-field"
                label={t("formName")}
                fullWidth
                size="small"
                error={!!errors.formName}
                helperText={errors.formName?.message}
                required
                sx={{
                  "& .MuiInputBase-root": { height: "30px" },
                  "& .MuiFormLabel-root": { fontSize: "14px" },
                }}
              />
            )}
          />

          {/* Form Description */}
          <Controller
            name="formDescription"
            control={control}
            rules={{}}
            render={({ field }) => (
              <TextField
                {...field}
                className="form-description-field"
                label={t("formDescription") + ` (${t("optional")})`}
                fullWidth
                size="small"
                error={!!errors.formDescription}
                sx={{
                  "& .MuiInputBase-root": { height: "30px" },
                  "& .MuiFormLabel-root": { fontSize: "14px" },
                }}
              />
            )}
          />
        </Box>

        {/* Approval Required Checkbox */}
        <Controller
          name="approvalRequired"
          control={control}
          render={({ field }) => (
            <Box
              className="approval-required-checkbox"
              sx={{ display: "inline-flex", alignItems: "center", width: "auto" }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    {...field}
                    checked={field.value}
                    sx={{ transform: "scale(0.8)" }}
                  />
                }
                label={
                  <Typography variant="body2">{t("approvalRequired")}</Typography>
                }
                sx={{ "& .MuiFormControlLabel-label": { fontSize: "0.85rem" } }}
              />
            </Box>
          )}
        />

        {/* Agent Response Options */}
        <Box className="agent-response-options">
          <Typography variant="subtitle2" sx={{ fontWeight: "bold", mb: 0.5 }}>
            {t("evaluationResponseOptions")}
          </Typography>
          <Controller
            name="agentResponseOption"
            control={control}
            defaultValue="noResponse"
            render={({ field }) => (
              <RadioGroup
                {...field}
                sx={{ display: "flex", flexDirection: "row", gap: 2 }}
              >
                {[
                  { value: "noResponse", label: t("noAgentResponse") },
                  {
                    value: "allowAcknowledge",
                    label: t("allowAgentAcknowledge"),
                  },
                  {
                    value: "allowAcknowledgeAndAppeal",
                    label: t("allowAgentAcknowledgeAndAppeal"),
                  },
                ].map((option) => (
                  <FormControlLabel
                    key={option.value}
                    value={option.value}
                    control={<Radio sx={{ transform: "scale(0.8)" }} />}
                    label={
                      <Typography variant="body2">{option.label}</Typography>
                    }
                    sx={{
                      "& .MuiFormControlLabel-root": {
                        display: "inline-flex",
                        width: "auto",
                      },
                      "& .MuiFormControlLabel-label": {
                        fontSize: "0.85rem",
                        whiteSpace: "nowrap",
                      },
                    }}
                  />
                ))}
              </RadioGroup>
            )}
          />
        </Box>

        {/* Form Type Options */}
        <Box className="form-type-options">
          <Typography variant="subtitle2" sx={{ fontWeight: "bold", mb: 0.5 }}>
            {t("formType")}
          </Typography>
          <Controller
            name="formTypeOption"
            control={control}
            defaultValue="percentage"
            render={({ field }) => (
              <RadioGroup
                {...field}
                sx={{ display: "flex", flexDirection: "row", gap: 2 }}
                onChange={(e) => {
                  field.onChange(e);
                  if (onFormTypeChange) {
                    onFormTypeChange(e.target.value);
                  }
                }}
              >
                {[
                  { value: "percentage", label: t("percentage") },
                  { value: "points", label: t("points") },
                ].map((option) => (
                  <FormControlLabel
                    key={option.value}
                    value={option.value}
                    control={<Radio sx={{ transform: "scale(0.8)" }} />}
                    label={
                      <Typography variant="body2">{option.label}</Typography>
                    }
                    sx={{
                      "& .MuiFormControlLabel-root": {
                        display: "inline-flex",
                        width: "auto",
                      },
                      "& .MuiFormControlLabel-label": {
                        fontSize: "0.85rem",
                        whiteSpace: "nowrap",
                      },
                    }}
                  />
                ))}
              </RadioGroup>
            )}
          />
        </Box>

        {/* Range Slider */}
        <Box className="scoring-band-range">
          <Typography variant="subtitle2" sx={{ fontWeight: "bold", mb: 0.5 }}>
            {t("scoringBandRange")}
          </Typography>
          <Controller
            name="evaluationScore"
            control={control}
            defaultValue={[0, 0]}
            render={({ field }) => {
              const { color, label, value, description } =
                getCircularProgressProps(field.value);
              return (
                <>
                  <Slider
                    {...field}
                    marks={marks}
                    step={0.1}
                    min={0}
                    max={100}
                    valueLabelDisplay="auto"
                    onChange={(_event, value) =>
                      field.onChange(value as number[])
                    }
                  />
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      width: "100%",
                      mb: 1,
                    }}
                  >
                    <Box
                      sx={{
                        position: "relative",
                        display: "inline-flex",
                      }}
                    >
                      <CircularProgress
                        variant="determinate"
                        value={value}
                        size={100}
                        thickness={5}
                        sx={{
                          color,
                        }}
                      />
                      <Box
                        sx={{
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          transform: "translate(-50%, -50%)",
                        }}
                      >
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: "600",
                            color,
                          }}
                        >
                          {Math.round(value)}%
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                  <Typography
                    variant="body2"
                    sx={{
                      textAlign: "center",
                      width: "100%",
                    }}
                  >
                    {label}
                  </Typography>
                  {label === t("needsImprovement") && (
                    <Alert severity="warning" sx={{ mt: 2 }}>
                      {description.map((line, index) => (
                        <Box key={index} sx={{ mb: 1 }}>
                          {line}
                        </Box>
                      ))}
                    </Alert>
                  )}
                  {label === t("meetsExpectations") && (
                    <Alert severity="info" sx={{ mt: 2 }}>
                      {description.map((line, index) => (
                        <Box key={index} sx={{ mb: 1 }}>
                          {line}
                        </Box>
                      ))}
                    </Alert>
                  )}
                  {label === t("exceedsExpectations") && (
                    <Alert severity="success" sx={{ mt: 2 }}>
                      {description.map((line, index) => (
                        <Box key={index} sx={{ mb: 1 }}>
                          {line}
                        </Box>
                      ))}
                    </Alert>
                  )}
                </>
              );
            }}
          />
        </Box>
      </Box>
    </>
  );
};

export default MainDataSection;