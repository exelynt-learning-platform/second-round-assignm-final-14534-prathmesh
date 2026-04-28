import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { parseApiError } from "../../utils/parseApiError";

export const sendMessage = createAsyncThunk(
  "chat/sendMessage",
  async (messages, { rejectWithValue }) => {
    try {
       if (!Array.isArray(messages) || messages.length === 0) {
        return rejectWithValue("Cannot send empty conversation");
      }

      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/chat`,
        { messages },
        { timeout: 15000 }
      );

      // Expecting: { role: "assistant", content: "..." }
      return response.data.content;
    } catch (error) {
      const parsedError = parseApiError(error);
      console.log(parsedError);
     return rejectWithValue(parsedError);
    }
  }
);