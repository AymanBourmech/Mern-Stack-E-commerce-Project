import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AuthService } from "../Services/AuthService";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);
export const register = createAsyncThunk(
  "auth/register",
  async (user, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await AuthService.register(user);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const login = createAsyncThunk("auth/login", async (user, thunkAPI) => {
  try {
    const res = await AuthService.login(user);
    return res.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    thunkAPI.dispatch(message);
    return thunkAPI.rejectWithValue();
  }
});
export const loginClient = createAsyncThunk(
  "auth/loginClient",
  async (user, thunkAPI) => {
    try {
      const res = await AuthService.loginClient(user);
      return res.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(message);
      return thunkAPI.rejectWithValue();
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  localStorage.removeItem("CC_Token");
  localStorage.removeItem("client");
});
export const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isLoading: false,
    isLoggedIn: false,
    isLoggedInClient: false,
    isSuccess: false,
    isError: false,
    status: null,
    errorMessage: "",
  },
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.errorMessage = "";
    },
  },
  extraReducers: {
    [register.pending]: (state, action) => {
      state.isLoading = true;
      state.status = null;
    },
    [register.fulfilled]: (state, action) => {
      state.user = action.payload;
      state.isLoading = false;
      state.status = null;
      state.isSuccess = true;
    },
    [register.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.status = action.payload;
      state.user = null;
    },
    [login.fulfilled]: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload.user;
      localStorage.setItem(
        "CC_Token",
        JSON.stringify(action.payload.accessToken)
      );
      MySwal.fire({
        icon: "success",
        title: "Connection was successful",
      });
    },
    [login.rejected]: (state, action) => {
      state.isLoggedIn = false;
      state.user = null;
      MySwal.fire({
        icon: "error",
        title: "Connection was refused",
      });
    },
    [logout.fulfilled]: (state, action) => {
      state.isLoggedIn = false;
      state.isLoggedInClient = false;
      state.user = null;
    },
    [loginClient.fulfilled]: (state, action) => {
      state.isLoggedInClient = true;
      state.user = action.payload;
      localStorage.setItem("client", JSON.stringify(action.payload));
      console.log(localStorage.getItem("client"));
      console.log(state.isLoggedInClient);
    },
    [loginClient.rejected]: (state, action) => {
      state.isLoggedInClient = false;
      state.user = null;
    },
  },
});
export const { reset } = authSlice.actions;
export default authSlice.reducer;
