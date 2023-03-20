import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getTodos = createAsyncThunk("todos/getTodos", async (data) => {
  try {
    const response = await fetch(`https://gorest.co.in/public/v2/users/${data.id}/todos`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept:"application/json",
        Authorization: data.token,
      },
    });
    const todoslistResponse = await response.json();
    return todoslistResponse;
  } catch (error) {
    console.log("todo list " + error);
  }
});

export const todosSlice = createSlice({
  name: "todoList",
  initialState: {
    todos: [],
    isLoading: false,
  },
  extraReducers: {
    [getTodos.pending]: (state) => {
      state.isLoading = true;
    },
    [getTodos.fulfilled]: (state, action) => {
      state.todos = action.payload;
      state.isLoading = false;
    },
    [getTodos.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

export default todosSlice;
