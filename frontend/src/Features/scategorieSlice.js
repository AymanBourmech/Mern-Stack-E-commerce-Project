import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ScategorieService } from "../Services/ScategorieService";
export const createScategorie = createAsyncThunk(
  "scategorie/createScategorie",
  async (scategorie, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await ScategorieService.addScategorie(scategorie);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const getScategories = createAsyncThunk(
  "scategorie/getScategories",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await ScategorieService.fetchScategories();
      return res.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateScategorie = createAsyncThunk(
  "scategorie/updateScategorie",
  async (cat, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await ScategorieService.editScategorie(cat);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const deleteScategorie = createAsyncThunk(
  "scategorie/deleteScategorie",
  async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      await ScategorieService.deleteScategorie(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const findScategorieByID = createAsyncThunk(
  "scategorie/findScategorieByID",
  async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await ScategorieService.fetchScategorieById(id);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const findScategorieByCat = createAsyncThunk(
  "scategorie/findScategorieByCat",
  async (cat, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await ScategorieService.fetchScatByCat(cat);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const scategorieSlice = createSlice({
  name: "scategorie",
  initialState: {
    scategories: [],
    scategorie: {},
    isLoading: false,
    success: null,
    error: null,
  },
  reducers: {
    removeSelectedScategorie: (state) => {
      state.success = null;
      state.error = null;
    },
  },
  extraReducers: {
    [getScategories.pending]: (state, action) => {
      state.isLoading = true;
      state.error = null;
    },
    [getScategories.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.scategories = action.payload;
    },
    [getScategories.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      console.log("impossible de se connecter au serveur");
    },

    [createScategorie.pending]: (state, action) => {
      state.isLoading = true;
      state.error = null;
      state.success = null;
    },
    [createScategorie.fulfilled]: (state, action) => {
      state.scategories.push(action.payload);
      state.isLoading = false;
      state.error = null;
      state.success = action.payload;
    },
    [createScategorie.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.success = null;
    },

    [updateScategorie.pending]: (state, action) => {
      state.isLoading = true;
      state.error = null;
      state.success = null;
    },
    [updateScategorie.fulfilled]: (state, action) => {
      state.scategories = state.scategories.map((item) =>
        item._id === action.payload._id ? action.payload : item
      );
      state.isLoading = false;
      state.error = null;
      state.success = action.payload;
    },
    [updateScategorie.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.success = null;
    },

    [deleteScategorie.pending]: (state, action) => {
      state.isLoading = true;
      state.error = null;
    },
    [deleteScategorie.fulfilled]: (state, action) => {
      state.scategories = state.scategories.filter(
        (item) => item._id !== action.payload
      );
      state.isLoading = false;
      state.error = null;
    },
    [deleteScategorie.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    [findScategorieByID.pending]: (state, action) => {
      state.isLoading = true;
      state.error = null;
    },
    [findScategorieByID.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.scategorie = action.payload;
    },
    [findScategorieByID.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.success = null;
    },

    [findScategorieByCat.pending]: (state, action) => {
      state.isLoading = true;
      state.error = null;
    },
    [findScategorieByCat.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.scategorie = action.payload;
    },
    [findScategorieByCat.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.success = null;
    },
  },
});
export const { removeSelectedScategorie } = scategorieSlice.actions;
export default scategorieSlice.reducer;
