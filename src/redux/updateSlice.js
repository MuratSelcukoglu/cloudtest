import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getUpdate = createAsyncThunk("update/getUpdate", async (data) => {
  try {
    const response = await fetch(
      `https://gorest.co.in/public/v2/users/${data.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept:"application/json",
          Authorization: data.token,
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          status: data.status,
          gender: data.gender ,
        }),
      }
    );
    const userupdateResponse = await response.json();
    return userupdateResponse;
  } catch (error) {
    console.log("user update " + error);
  }
});

export const updateSlice = createSlice({
  name: "userUpdate",
  initialState: {
    updateuser: [],
    isLoading: false,
  },
  extraReducers: {
    [getUpdate.pending]: (state) => {
      state.isLoading = true;
    },
    [getUpdate.fulfilled]: (state, action) => {
      state.updateuser = action.payload;
      state.isLoading = false;
    },
    [getUpdate.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

export default updateSlice;
