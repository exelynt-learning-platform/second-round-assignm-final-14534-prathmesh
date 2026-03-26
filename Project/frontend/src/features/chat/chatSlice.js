import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

// Async API call
export const sendMessage = createAsyncThunk(
  'chat/sendMessage',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { messages } = getState().chat;

      const response = await axios.post(
        `${API_BASE_URL}/chat`,
        { messages }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.error || 'Network Error'
      );
    }
  }
);

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    messages: [],
    loading: false,
    error: null,
  },

  reducers: {
    addUserMessage: (state, action) => {
      state.messages.push({
        role: 'user',
        content: action.payload,
      });
    },

    clearError: (state) => {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(sendMessage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(sendMessage.fulfilled, (state, action) => {
        state.messages.push(action.payload);
        state.loading = false;
      })

      .addCase(sendMessage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { addUserMessage, clearError } = chatSlice.actions;
export default chatSlice.reducer;
