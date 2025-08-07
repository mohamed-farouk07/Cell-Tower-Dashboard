import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";
import { ReactNode, useMemo } from "react";
import { useTranslation } from "react-i18next";
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { prefixer } from "stylis";

export default function ThemeProviderClient({
  children,
}: {
  children: ReactNode;
}) {
  const { i18n } = useTranslation();
  const isRtl = i18n.language === "ar";

  // Create RTL cache
  const cacheRtl = createCache({
    key: "muirtl",
    stylisPlugins: [prefixer, rtlPlugin],
  });

  // Create LTR cache
  const cacheLtr = createCache({
    key: "muiltr",
  });

  const theme = useMemo(
    () =>
      createTheme({
        direction: isRtl ? "rtl" : "ltr",
        palette: {
          primary: {
            main: "#3E337C",
          },
          success: {
            main: "#2ba149e5",
          },
          error: {
            main: "#A8394B",
          },
        },
        typography: {
          fontSize: 14,
          h3: {
            fontWeight: "bold",
            fontSize: "1.5rem",
          },
        },
        components: {
          MuiOutlinedInput: {
            styleOverrides: {
              root: {
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "var(--light-primary)",
                },
                "&.Mui-error .MuiOutlinedInput-notchedOutline": {
                  borderColor: "red",
                },
              },
              input: {
                "&.Mui-focused": {
                  color: "var(--light-primary)",
                },
                "&.Mui-error": {
                  color: "red",
                },
              },
            },
          },
          MuiInputLabel: {
            styleOverrides: {
              root: {
                color: "var(--light-primary)",
                "&.Mui-focused": {
                  color: "var(--light-primary)",
                },
                "&.Mui-error": {
                  color: "red",
                },
              },
            },
          },
          MuiButton: {
            styleOverrides: {
              containedPrimary: {
                background: "var(--primary)",
                color: "var(--primary-foreground)",
                fontWeight: "bold",
                textTransform: "none",
                borderRadius: "0",
                "&:hover": {
                  background: "var(--primary-900)",
                },
                "&:disabled": {
                  opacity: 0.6,
                  color: "var(--primary-foreground)",
                },
              },
              root: {
                textTransform: "none",
                fontWeight: "bold",
                padding: "8px 16px",
              },
              contained: {
                boxShadow: "none",
                "&:hover": {
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
                },
              },
              outlined: {
                borderColor: "var(--primary)",
                borderRadius: "0",
                color: "var(--primary)",
                "&:hover": {
                  borderColor: "var(--primary)",
                  backgroundColor: "var(--primary)",
                  color: "var(--primary-foreground)",
                },
              },
            },
          },
        },
      }),
    [isRtl]
  );

  return (
    <CacheProvider value={isRtl ? cacheRtl : cacheLtr}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </CacheProvider>
  );
}
