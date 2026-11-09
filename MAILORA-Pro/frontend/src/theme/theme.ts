import { createTheme } from "@mui/material/styles";
export const createMailoraTheme = (mode: "dark" | "light") => createTheme({
  palette: { mode, primary: { main: "#8B5CF6" }, secondary: { main: "#22D3EE" }, background: mode === "dark" ? { default: "#090B13", paper: "#111522" } : { default: "#F5F6FA", paper: "#FFFFFF" }, success: { main: "#34D399" }, warning: { main: "#FBBF24" }, error: { main: "#FB7185" } },
  shape: { borderRadius: 14 },
  typography: { fontFamily: '"Inter", "Manrope", system-ui, sans-serif', h4: { fontWeight: 800, letterSpacing: "-.04em" }, h5: { fontWeight: 750, letterSpacing: "-.03em" }, button: { textTransform: "none", fontWeight: 700 } },
  components: { MuiCard: { styleOverrides: { root: { border: "1px solid rgba(148,163,184,.12)", boxShadow: "0 18px 55px rgba(0,0,0,.12)" } } }, MuiButton: { styleOverrides: { root: { borderRadius: 10, paddingInline: 16 } } }, MuiOutlinedInput: { styleOverrides: { root: { borderRadius: 11 } } } }
});
