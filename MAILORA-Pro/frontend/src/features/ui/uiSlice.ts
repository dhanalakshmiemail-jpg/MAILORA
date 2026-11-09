import { createSlice, PayloadAction } from "@reduxjs/toolkit";
const slice = createSlice({ name: "ui", initialState: { mode: "dark" as "dark" | "light", toast: "" }, reducers: {
  toggleMode(s) { s.mode = s.mode === "dark" ? "light" : "dark"; },
  setToast(s, a: PayloadAction<string>) { s.toast = a.payload; }
}});
export const { toggleMode, setToast } = slice.actions;
export default slice.reducer;
