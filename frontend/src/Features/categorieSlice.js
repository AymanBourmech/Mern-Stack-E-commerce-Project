import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { CategorieService } from "../Services/CategorieService";
export const createCategorie = createAsyncThunk(
  "categorie/createCategorie",
  async (categorie, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await CategorieService.addCategorie(categorie);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const getCategories = createAsyncThunk(
  "categorie/getCategories",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await CategorieService.fetchCategories();
      return res.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateCategorie = createAsyncThunk(
  "categorie/updateCategorie",
  async (cat, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await CategorieService.editCategorie(cat);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const deleteCategorie = createAsyncThunk(
  "categorie/deleteCategorie",
  async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      await CategorieService.deleteCategorie(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const findCategorieByID = createAsyncThunk(
  "categorie/findCategorieByID",
  async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await CategorieService.fetchCategorieById(id);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const categorieSlice = createSlice({
  name: "categorie",
  initialState: {
    categories: [],
    categorie: {},
    isLoading: false,
    success: null,
    error: null,
  },
  reducers: {
    removeSelectedCategorie: (state) => {
      state.success = null;
      state.error = null;
    },
  },
  extraReducers: {
    //getCategories
    [getCategories.pending]: (state, action) => {
      state.isLoading = true;
      state.error = null;
    },
    [getCategories.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.categories = action.payload;
    },
    [getCategories.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      console.log("impossible de se connecter au serveur");
    },

    [createCategorie.pending]: (state, action) => {
      state.isLoading = true;
      state.error = null;
      state.success = null;
    },
    [createCategorie.fulfilled]: (state, action) => {
      state.categories.push(action.payload);
      state.isLoading = false;
      state.error = null;
      state.success = action.payload;
    },
    [createCategorie.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.success = null;
    },

    [updateCategorie.pending]: (state, action) => {
      state.isLoading = true;
      state.error = null;
      state.success = null;
    },
    [updateCategorie.fulfilled]: (state, action) => {
      state.categories = state.categories.map((item) =>
        item._id === action.payload._id ? action.payload : item
      );
      state.isLoading = false;
      state.error = null;
      state.success = action.payload;
    },

    [deleteCategorie.pending]: (state, action) => {
      state.isLoading = true;
      state.error = null;
    },
    [deleteCategorie.fulfilled]: (state, action) => {
      state.categories = state.categories.filter(
        (item) => item._id !== action.payload
      );
      state.isLoading = false;
      state.error = null;
    },
    [deleteCategorie.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    [findCategorieByID.pending]: (state, action) => {
      state.isLoading = true;
      state.error = null;
    },
    [findCategorieByID.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.categorie = action.payload;
    },
  },
});
export const { removeSelectedCategorie } = categorieSlice.actions;
export default categorieSlice.reducer;
