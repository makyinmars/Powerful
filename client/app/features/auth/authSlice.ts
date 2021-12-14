import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import type { User } from "../../services/interfaces/userInterface";
import type { RootState } from "../../store";

interface AuthState {
  user: User | null;
  token: string | null;
}

const slice = createSlice({
  name: "auth",
  initialState: { user: null, token: null } as AuthState,
  reducers: {
    setCredentials: (
      state,
      { payload: { user, token } }: PayloadAction<{ user: User; token: string }>
    ) => {
      state.user = user;
      state.token = token;
    },

    removeCredentials: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setCredentials, removeCredentials } = slice.actions;

export default slice.reducer;

export const selectCurrentUser = (state: RootState) => state.auth.user;
