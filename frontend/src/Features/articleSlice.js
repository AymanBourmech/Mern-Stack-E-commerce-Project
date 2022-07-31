import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ArticleService } from "../Services/ArticleService";
export const createArticle = createAsyncThunk(
  "article/createArticle",
  async (article, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await ArticleService.addArticle(article);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const getArticles = createAsyncThunk(
  "article/getArticles",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await ArticleService.fetchArticles();
      return res.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateArticle = createAsyncThunk(
  "article/updateArticle",
  async (art, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await ArticleService.editArticle(art);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const deleteArticle = createAsyncThunk(
  "article/deleteArticle",
  async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      await ArticleService.deleteArticle(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const findArticleByID = createAsyncThunk(
  "article/findArticleByID",
  async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await ArticleService.fetchArticleById(id);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const articleSlice = createSlice({
  name: "article",
  initialState: {
    articles: [],
    article: {},
    isLoading: false,
    success: null,
    error: null,
  },
  reducers: {
    removeSelectedArticle: (state) => {
      state.success = null;
      state.error = null;
    },
  },
  extraReducers: {
    [getArticles.pending]: (state, action) => {
      state.isLoading = true;
      state.error = null;
    },
    [getArticles.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.articles = action.payload;
    },
    [getArticles.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      console.log("impossible de se connecter au serveur");
    },

    [createArticle.pending]: (state, action) => {
      state.isLoading = true;
      state.error = null;
      state.success = null;
    },
    [createArticle.fulfilled]: (state, action) => {
      state.articles.push(action.payload);
      state.isLoading = false;
      state.error = null;
      state.success = action.payload;
    },
    [createArticle.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.success = null;
    },

    [updateArticle.pending]: (state, action) => {
      state.isLoading = true;
      state.error = null;
      state.success = null;
    },
    [updateArticle.fulfilled]: (state, action) => {
      state.articles = state.articles.map((item) =>
        item._id === action.payload._id ? action.payload : item
      );
      state.isLoading = false;
      state.error = null;
      state.success = action.payload;
    },
    [updateArticle.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.success = null;
    },

    [deleteArticle.pending]: (state, action) => {
      state.isLoading = true;
      state.error = null;
    },
    [deleteArticle.fulfilled]: (state, action) => {
      state.articles = state.articles.filter(
        (item) => item._id !== action.payload
      );
      state.isLoading = false;
      state.error = null;
    },
    [deleteArticle.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    [findArticleByID.pending]: (state, action) => {
      state.isLoading = true;
      state.error = null;
    },
    [findArticleByID.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.article = action.payload;
    },
    [findArticleByID.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.success = null;
    },
  },
});
export const { removeSelectedArticle } = articleSlice.actions;
export default articleSlice.reducer;
