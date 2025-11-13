import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../services/api';

export const fetchPayments = createAsyncThunk(
    'payments/fetchPayments',
    async (userId, { rejectWithValue }) => {
        try {
            const data = await api.getPayments();
            if (userId) {
                const normalizedUserId = String(userId);
                return data.filter((payment) => String(payment.userId) === normalizedUserId);
            }
            return data;
        } catch (error) {
            return rejectWithValue(error.message || 'Failed to fetch payments');
        }
    }
);

export const fetchPaymentById = createAsyncThunk(
    'payments/fetchPaymentById',
    async (paymentId, { rejectWithValue }) => {
        try {
            const data = await api.getPaymentById(paymentId);
            return data;
        } catch (error) {
            return rejectWithValue(error.message || 'Failed to fetch payment');
        }
    }
);

export const createPayment = createAsyncThunk(
    'payments/createPayment',
    async (paymentData, { rejectWithValue }) => {
        try {
            const data = await api.createPayment(paymentData);
            return data;
        } catch (error) {
            return rejectWithValue(error.message || 'Failed to create payment');
        }
    }
);

export const updatePayment = createAsyncThunk(
    'payments/updatePayment',
    async ({ id, paymentData }, { rejectWithValue }) => {
        try {
            const data = await api.updatePayment(id, paymentData);
            return data;
        } catch (error) {
            return rejectWithValue(error.message || 'Failed to update payment');
        }
    }
);

export const deletePayment = createAsyncThunk(
    'payments/deletePayment',
    async (id, { rejectWithValue }) => {
        try {
            await api.deletePayment(id);
            return id;
        } catch (error) {
            return rejectWithValue(error.message || 'Failed to delete payment');
        }
    }
);

const initialState = {
    items: [],
    current: null,
    status: 'idle',
    error: null,
    actionStatus: 'idle',
    actionError: null,
};

const paymentsSlice = createSlice({
    name: 'payments',
    initialState,
    reducers: {
        clearCurrentPayment(state) {
            state.current = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPayments.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchPayments.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload;
            })
            .addCase(fetchPayments.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload || action.error.message;
            })
            .addCase(fetchPaymentById.pending, (state) => {
                state.actionStatus = 'loading';
                state.actionError = null;
            })
            .addCase(fetchPaymentById.fulfilled, (state, action) => {
                state.actionStatus = 'succeeded';
                state.current = action.payload;
            })
            .addCase(fetchPaymentById.rejected, (state, action) => {
                state.actionStatus = 'failed';
                state.actionError = action.payload || action.error.message;
            })
            .addCase(createPayment.pending, (state) => {
                state.actionStatus = 'loading';
                state.actionError = null;
            })
            .addCase(createPayment.fulfilled, (state, action) => {
                state.actionStatus = 'succeeded';
                state.items.push(action.payload);
            })
            .addCase(createPayment.rejected, (state, action) => {
                state.actionStatus = 'failed';
                state.actionError = action.payload || action.error.message;
            })
            .addCase(updatePayment.pending, (state) => {
                state.actionStatus = 'loading';
                state.actionError = null;
            })
            .addCase(updatePayment.fulfilled, (state, action) => {
                state.actionStatus = 'succeeded';
                const updated = action.payload;
                state.items = state.items.map((payment) =>
                    payment.id === updated.id ? updated : payment
                );
                state.current = updated;
            })
            .addCase(updatePayment.rejected, (state, action) => {
                state.actionStatus = 'failed';
                state.actionError = action.payload || action.error.message;
            })
            .addCase(deletePayment.pending, (state) => {
                state.actionStatus = 'loading';
                state.actionError = null;
            })
            .addCase(deletePayment.fulfilled, (state, action) => {
                state.actionStatus = 'succeeded';
                state.items = state.items.filter((payment) => payment.id !== action.payload);
            })
            .addCase(deletePayment.rejected, (state, action) => {
                state.actionStatus = 'failed';
                state.actionError = action.payload || action.error.message;
            });
    },
});

export const { clearCurrentPayment } = paymentsSlice.actions;

export const selectPayments = (state) => state.payments.items;
export const selectPaymentsStatus = (state) => state.payments.status;
export const selectPaymentsError = (state) => state.payments.error;
export const selectCurrentPayment = (state) => state.payments.current;
export const selectPaymentsActionStatus = (state) => state.payments.actionStatus;
export const selectPaymentsActionError = (state) => state.payments.actionError;

export default paymentsSlice.reducer;


