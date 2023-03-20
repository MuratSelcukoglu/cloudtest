import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const user = localStorage.getItem("token");

export const userLogin = createAsyncThunk("auth/login", async (data) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        if (data.username && data.password) {
          const token =
            "Bearer eb8b028dd80d661a81e88190a388752f45a943fa4ed55d88cf92035d1bd1222c";
          localStorage.setItem("token", token);
          resolve({ user: token });
        }
      } catch (error) {
        console.log(" user login " + error);
        reject(error);
      }
    }, 3000);
  });
});

export const userLogout = createAsyncThunk("auth/logout", async () => {
  await localStorage.removeItem("token");
});
const initialState = user
  ? { isLoggedIn: true, user }
  : { isLoggedIn: false, user: null };

export const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: {
    [userLogin.pending]: (state) => {
      state.isLoading = true;
    },
    [userLogin.fulfilled]: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload;
    },
    [userLogin.rejected]: (state, action) => {
      state.isLoggedIn = false;
      state.user = null;
    },
    [userLogout.fulfilled]: (state, action) => {
      state.user = action.payload;
      state.user = null;
    },
  },
});

export default authSlice;
