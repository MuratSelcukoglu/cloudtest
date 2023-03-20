import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getCreate = createAsyncThunk("create/getCreate", async (data) => {
  try {
    const response = await fetch(
      `https://gorest.co.in/public/v2/users`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept:"application/json",
          Authorization: data.token,
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          status: data.status,
          gender: data.gender,
        }),
      }
    );
    const usercreateResponse = await response.json();
    return usercreateResponse;
  } catch (error) {
    console.log("user create " + error);
  }
});

export const createuserSlice = createSlice({
  name: "userCreate",
  initialState: {
    createuser: [],
    isLoading: false,
  },
  extraReducers: {
    [getCreate.pending]: (state) => {
      state.isLoading = true;
    },
    [getCreate.fulfilled]: (state, action) => {
      state.createuser = action.payload;
      state.isLoading = false;
    },
    [getCreate.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

export default createuserSlice;
