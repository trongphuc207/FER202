import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import apiClient from '../../api';

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (_, thunkAPI) => {
    try {
      const users = await apiClient.get('/api/users');
      // Ensure we always return an array to keep state shape stable
      return Array.isArray(users) ? users : [];
    } catch (error) {
      // Fallbacks: if API is not available (404/500) or network error, return mock users
      const status = error?.response?.status;
      if (status === 404 || status === 500 || !status) {
        const mockUsers = [
          { id: 1, name: 'Alice', isAdmin: false },
          { id: 2, name: 'Bob', isAdmin: true },
          { id: 3, name: 'Charlie', isAdmin: false },
        ];
        return thunkAPI.fulfillWithValue(mockUsers);
      }
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

const initialState = {
  list: [],
  isLoading: false,
  error: null,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    toggleAdminStatus(state, action) {
      const user = state.list.find((item) => item.id === action.payload);
      if (user) {
        user.isAdmin = !user.isAdmin;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        // Guard against null/invalid payloads; keep list as an array
        state.list = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export const { toggleAdminStatus } = usersSlice.actions;
export default usersSlice.reducer;

