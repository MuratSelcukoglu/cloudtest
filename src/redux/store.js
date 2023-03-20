import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./loginSlice";
import usersSlice from "./usersSlice";
import updateSlice from "./updateSlice";
import deleteSlice from "./deleteSlice";
import createuserSlice from "./createuserSlice";
import todosSlice from "./todosSlice";
import addtaskSlice from "./addtaskSlice";

export const store = configureStore({
  reducer: {
    auth: loginSlice.reducer,
    userList: usersSlice.reducer,
    updateuser: updateSlice.reducer,
    deleteuser: deleteSlice.reducer,
    createuser: createuserSlice.reducer,
    todos: todosSlice.reducer,
    addtodo: addtaskSlice.reducer,
  },
});
