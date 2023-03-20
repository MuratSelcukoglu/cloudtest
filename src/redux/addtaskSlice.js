import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getAddtask = createAsyncThunk("addtask/getAddtask", async (data) => {
  try {
    const response = await fetch(
      `https://gorest.co.in/public/v2/users/${data.id}/todos`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: data.token,
        },
        body: JSON.stringify({
            user: data.user,
            title: data.title,
          status: data.status,
          "due_on": data.date,
        }),
      }
    );
    const addtaskResponse = await response.json();
    return addtaskResponse;
  } catch (error) {
    console.log("add task  " + error);
  }
});

export const addtaskSlice = createSlice({
  name: "addTask",
  initialState: {
    addtask: [],
    isLoading: false,
  },
  extraReducers: {
    [getAddtask.pending]: (state) => {
      state.isLoading = true;
    },
    [getAddtask.fulfilled]: (state, action) => {
      state.addtask = action.payload;
      state.isLoading = false;
    },
    [getAddtask.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

export default addtaskSlice;
