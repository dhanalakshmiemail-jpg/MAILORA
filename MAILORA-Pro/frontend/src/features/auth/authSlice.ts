import { createSlice, PayloadAction } from "@reduxjs/toolkit";
type User = { id: string; name: string; email: string; role: string };
type State = { user: User | null; authenticated: boolean };
const initialState: State = { user: null, authenticated: Boolean(sessionStorage.getItem("mailora_token")) };
const slice = createSlice({ name: "auth", initialState, reducers: {
  signedIn(state, action: PayloadAction<{ user: User; token: string }>) { state.user = action.payload.user; state.authenticated = true; sessionStorage.setItem("mailora_token", action.payload.token); },
  signedOut(state) { state.user = null; state.authenticated = false; sessionStorage.removeItem("mailora_token"); }
}});
export const { signedIn, signedOut } = slice.actions;
export default slice.reducer;
