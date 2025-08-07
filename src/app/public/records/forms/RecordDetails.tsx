import {
  Box,
  Typography,
  Paper,
  Divider,
  Chip,
  Alert,
  Stack,
} from "@mui/material";
import HeadphonesIcon from "@mui/icons-material/Headphones";
import { useTranslation } from "react-i18next";
import { useEffect, useMemo, useRef, useState } from "react";
import { RecordDetailsProps } from "./types";

const RecordDetails = ({ record }: RecordDetailsProps) => {
  const { t } = useTranslation();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [shownComments, setShownComments] = useState<string[]>([]);
  const [lastTime, setLastTime] = useState<number>(-1);

  const fields = [
    { label: "agentId", value: record.agentId },
    { label: "caseNo", value: record.caseNo },
    { label: "serviceCategory", value: record.serviceCategory },
    { label: "callType", value: record.callType },
    { label: "callAbout", value: record.callAbout },
    { label: "callDirection", value: record.callDirection },
    { label: "callStatus", value: record.callStatus },
    { label: "latestCallback", value: record.latestCallback },
    { label: "orderNumber", value: record.orderNumber },
    { label: "createdDate", value: record.createdDate },
  ];

  const comments = useMemo(
    () => [
      { time: 3, text: t("First checkpoint at 3 seconds") },
      { time: 7, text: t("Customer raised an issue at 7s") },
      { time: 12, text: t("Agent confirmed resolution around 12s") },
    ],
    [t]
  );

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => {
      const currentTime = Math.floor(audio.currentTime);

      if (currentTime !== lastTime) {
        const comment = comments.find(
          (c) => c.time === currentTime && !shownComments.includes(c.text)
        );
        if (comment) {
          setShownComments((prev) => [...prev, comment.text]);
        }
        setLastTime(currentTime);
      }
    };

    const handleEnded = () => {
      setShownComments([]); // Clear comments when audio ends
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [lastTime, shownComments, t, comments]);

  return (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        borderRadius: 2,
        bgcolor: "#f9f9f9",
        boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
        flex: 1,
        display: "flex",
        flexDirection: "column",
        gap: 3,
      }}
    >
      <Typography
        variant="h6"
        sx={{ fontWeight: "bold", mb: 1, color: "primary.main" }}
      >
        {t("recordDetails")}
      </Typography>

      <Divider sx={{ mb: 2 }} />

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
          gap: 3,
        }}
      >
        {fields.map((field) => (
          <Box
            key={field.label}
            sx={{ display: "flex", flexDirection: "column", alignItems: "start" }}
          >
            <Typography
              variant="body1"
              color="textSecondary"
              sx={{ textTransform: "capitalize", fontWeight: 700 }}
            >
              {t(field.label)}
            </Typography>
            <Typography
              variant="subtitle1"
              color="primary"
              sx={{ fontWeight: 500 }}
            >
              {field.value || "-"}
            </Typography>
          </Box>
        ))}
      </Box>

      <Divider sx={{ my: 2 }} />

      <Box sx={{ width: "100%" }}>
        <Typography
          variant="subtitle2"
          color="textSecondary"
          sx={{
            fontWeight: "bold",
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <HeadphonesIcon fontSize="small" /> {t("listenToRecord")}
        </Typography>

        <Box
          sx={{
            mt: 1,
            bgcolor: "#f5f5f5",
            borderRadius: 1,
            p: 2,
            boxShadow: "inset 0 1px 2px rgba(0,0,0,0.1)",
          }}
        >
          <audio
            ref={audioRef}
            controls
            controlsList="nodownload"
            src={record.url}
            style={{ width: "100%", outline: "none" }}
          >
            {t("audioNotSupported")}
          </audio>
        </Box>

        {shownComments.length > 0 && (
          <Stack spacing={1} sx={{ mt: 2 }}>
            {shownComments.map((comment, idx) => (
              <Alert key={idx} severity="info" sx={{ fontWeight: "bold", borderRadius: 2 }}>
                {comment}
              </Alert>
            ))}
          </Stack>
        )}
      </Box>

      <Box sx={{ mt: 1 }}>
        <Typography
          variant="subtitle2"
          color="textSecondary"
          sx={{ fontWeight: "bold", mb: 1 }}
        >
          {t("status")}
        </Typography>
        <Chip
          label={record.callStatus}
          sx={{
            bgcolor:
              record.callStatus === "Resolved"
                ? "success.main"
                : record.callStatus === "In Progress"
                ? "#003399"
                : record.callStatus === "Pending"
                ? "warning.main"
                : "error.main",
            color: "#fff",
            fontWeight: 600,
          }}
        />
      </Box>
    </Paper>
  );
};

export default RecordDetails;
