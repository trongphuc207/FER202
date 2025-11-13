import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './usersSlice';
import paymentsReducer from './paymentsSlice';

const store = configureStore({
    reducer: {
        users: usersReducer,
        payments: paymentsReducer,
    },
});

export default store;


