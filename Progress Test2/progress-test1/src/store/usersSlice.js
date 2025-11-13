import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../services/api';

export const fetchUsers = createAsyncThunk(
    'users/fetchUsers',
    async (_, { rejectWithValue }) => {
        try {
            const data = await api.getUsers();
            return data;
        } catch (error) {
            return rejectWithValue(error.message || 'Failed to fetch users');
        }
    }
);

export const fetchUserById = createAsyncThunk(
    'users/fetchUserById',
    async (id, { rejectWithValue }) => {
        try {
            const data = await api.getUserById(id);
            return data;
        } catch (error) {
            return rejectWithValue(error.message || 'Failed to fetch user');
        }
    }
);

export const updateUser = createAsyncThunk(
    'users/updateUser',
    async ({ id, userData }, { rejectWithValue }) => {
        try {
            const data = await api.updateUser(id, userData);
            return data;
        } catch (error) {
            return rejectWithValue(error.message || 'Failed to update user');
        }
    }
);

const initialState = {
    items: [],
    status: 'idle',
    error: null,
    selectedUser: null,
    selectedStatus: 'idle',
    selectedError: null,
    updateStatus: 'idle',
    updateError: null,
};

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        clearSelectedUser(state) {
            state.selectedUser = null;
            state.selectedStatus = 'idle';
            state.selectedError = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload || action.error.message;
            })
            .addCase(fetchUserById.pending, (state) => {
                state.selectedStatus = 'loading';
                state.selectedError = null;
            })
            .addCase(fetchUserById.fulfilled, (state, action) => {
                state.selectedStatus = 'succeeded';
                state.selectedUser = action.payload;
                state.selectedError = null;
            })
            .addCase(fetchUserById.rejected, (state, action) => {
                state.selectedStatus = 'failed';
                state.selectedError = action.payload || action.error.message;
            })
            .addCase(updateUser.pending, (state) => {
                state.updateStatus = 'loading';
                state.updateError = null;
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.updateStatus = 'succeeded';
                const updatedUser = action.payload;
                state.items = state.items.map((user) =>
                    user.id === updatedUser.id ? updatedUser : user
                );
                if (state.selectedUser && state.selectedUser.id === updatedUser.id) {
                    state.selectedUser = updatedUser;
                }
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.updateStatus = 'failed';
                state.updateError = action.payload || action.error.message;
            });
    },
});

export const { clearSelectedUser } = usersSlice.actions;

export const selectUsers = (state) => state.users.items;
export const selectUsersStatus = (state) => state.users.status;
export const selectUsersError = (state) => state.users.error;
export const selectSelectedUser = (state) => state.users.selectedUser;
export const selectSelectedUserStatus = (state) => state.users.selectedStatus;
export const selectSelectedUserError = (state) => state.users.selectedError;
export const selectUsersUpdateStatus = (state) => state.users.updateStatus;
export const selectUsersUpdateError = (state) => state.users.updateError;

export default usersSlice.reducer;

