// import { createSlice } from "@reduxjs/toolkit";
// import { sendMessage } from "./chatThunks";

// const chatSlice = createSlice({
//   name: "chat",
//   initialState: {
//     messages: [],
//     loading: false,
//     error: null,
//   },
//   reducers: {
//     addUserMessage: (state, action) => {
//       state.messages.push({
//         role: "user",
//         content: action.payload,
//       });
//     },
//     clearError: (state) => {
//       state.error = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(sendMessage.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(sendMessage.fulfilled, (state, action) => {
//         state.loading = false;
//         state.messages.push(action.payload.ai);
//       })
//       .addCase(sendMessage.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   },
// });

// export const { addUserMessage, clearError } = chatSlice.actions;
// export default chatSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import { sendMessage } from "./chatThunks";

const initialState = {
  messages: [],   
  loading: false,
  error: null,
  lastMessages: null,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    addUserMessage: (state, action) => {
      state.messages.push({
        role: "user",
        content: action.payload,
      });
    },

    clearError: (state) => {
      state.error = null;
    },
    
    setLastMessages: (state, action) => {
      state.lastMessages = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(sendMessage.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.loading = false;

        state.messages.push({
          role: "assistant",
          content: action.payload,
        });
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export const { addUserMessage, clearError, setLastMessages } = chatSlice.actions;
export default chatSlice.reducer;