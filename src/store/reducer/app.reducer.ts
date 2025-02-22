import { createSlice } from "@reduxjs/toolkit";

export interface MessageToastType {
  msg: string;
  type: "error" | "info" | "success";
}
export interface AppState {
  msgToast: MessageToastType | null;
  fetchCount: number;
}

const initialState: AppState = {
  msgToast: null,
  fetchCount: 0,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    openMsg: (state, action) => ({ ...state, msgToast: action.payload }),
    increaseFetch: (state) => {
      return {
        ...state,
        fetchCount: state.fetchCount + 1,
      };
    },
    decreaseFetch: (state) => {
      const fetchCount = state.fetchCount - 1 < 0 ? 0 : state.fetchCount - 1;
      return {
        ...state,
        fetchCount,
      };
    },
  },
});

export const { openMsg, increaseFetch, decreaseFetch } = appSlice.actions;

export default appSlice.reducer;
