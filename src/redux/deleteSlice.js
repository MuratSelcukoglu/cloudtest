import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getDelete = createAsyncThunk("delete/getDelete", async (data) => {
 
  try {
    await fetch(
      `https://gorest.co.in/public/v2/users/${data.id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Accept:"application/json",
          Authorization: data.token,
        },
      }
    );

    return true;
  } catch (error) {
    console.log("user delete " + error);
  }
});

export const deleteSlice = createSlice({
  name: "userDelete",
  initialState: {
    deleteuser: [],
    isLoading: false,
  },
  extraReducers: {
    [getDelete.pending]: (state) => {
      state.isLoading = true;
    },
    [getDelete.fulfilled]: (state, action) => {
      state.deleteuser = action.payload;
      state.isLoading = false;
    },
    [getDelete.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

export default deleteSlice;
