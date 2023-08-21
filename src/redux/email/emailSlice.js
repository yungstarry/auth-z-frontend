import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import emailService from "./emailService";
import { toast } from "react-toastify";

const initialState = {
  sendingEmail: false,
  emailSent: false,
  msg: "",
};

// send automated email
export const sendAutomatedEmail = createAsyncThunk(
  "email/sendautomatedemail",

  async (emailData, thunkAPI) => {
    try {
      return await emailService.sendAutomatedEmail(emailData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

const emailSlice = createSlice({
  name: "email",
  initialState,
  reducers: {
    EMAIL_RESET(state) {
      state.sendingEmail = false;
      state.emailSent = false;
      state.msg = "";
    },
  },
  extraReducers: (builder) => {
    builder
      //change password
      .addCase(sendAutomatedEmail.pending, (state, action) => {
        state.sendingEmail = true;
      })
      .addCase(sendAutomatedEmail.fulfilled, (state, action) => {
        state.sendingEmail = false;
        state.emailSent = true;
        state.msg = action.payload;
        toast.success(action.payload);
      })
      .addCase(sendAutomatedEmail.rejected, (state, action) => {
        state.sendingEmail = false;
        state.emailSent = false;
        state.msg = action.payload;
        toast.error(action.payload);
      });
  },
});

export const { EMAIL_RESET } = emailSlice.actions;

export default emailSlice.reducer;
