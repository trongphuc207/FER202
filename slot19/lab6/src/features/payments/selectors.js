import { createSelector } from 'reselect';

const selectPaymentsState = (state) => state.payments;

export const selectSuccessfulPayments = createSelector(
  [selectPaymentsState],
  (paymentsState) => paymentsState.list.filter((payment) => payment.status === 'SUCCESS')
);

