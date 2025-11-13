import { configureStore } from '@reduxjs/toolkit';
import usersReducer from '../features/users/usersSlice';
import paymentsReducer from '../features/payments/paymentsSlice';

const store = configureStore({
  reducer: {
    users: usersReducer,
    payments: paymentsReducer,
  },
});

export default store;

