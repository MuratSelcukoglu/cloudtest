import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getUsers = createAsyncThunk("users/getUsers", async (token) => {
  try {
    const response = await fetch("https://gorest.co.in/public/v2/users", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept:"application/json",
        Authorization: token,
      },
    });
    const userlistResponse = await response.json();
    return userlistResponse;
  } catch (error) {
    console.log("user list " + error);
  }
});

export const usersSlice = createSlice({
  name: "userList",
  initialState: {
    userList: [],
    isLoading: false,
  },
  extraReducers: {
    [getUsers.pending]: (state) => {
      state.isLoading = true;
    },
    [getUsers.fulfilled]: (state, action) => {
      state.userList = action.payload;
      state.isLoading = false;
    },
    [getUsers.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

export default usersSlice;
