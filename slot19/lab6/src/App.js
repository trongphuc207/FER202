import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, toggleAdminStatus } from './features/users/usersSlice';
import { createPayment } from './features/payments/paymentsSlice';
import refundPayment from './features/payments/refundThunk';
import { selectSuccessfulPayments } from './features/payments/selectors';
import './App.css';

function App() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.list);
  const usersLoading = useSelector((state) => state.users.isLoading);
  const usersError = useSelector((state) => state.users.error);

  const payments = useSelector((state) => state.payments.list);
  const paymentsLoading = useSelector((state) => state.payments.isLoading);
  const paymentsError = useSelector((state) => state.payments.error);

  const successfulPayments = useSelector(selectSuccessfulPayments);

  const [newPayment, setNewPayment] = useState({
    amount: '',
    method: '',
    status: 'SUCCESS',
  });

  const [refund, setRefund] = useState({
    transactionId: '',
    amount: '',
  });

  const handleFetchUsers = () => {
    dispatch(fetchUsers());
  };

  const handleToggleAdmin = (userId) => {
    dispatch(toggleAdminStatus(userId));
  };

  const handleCreatePayment = (event) => {
    event.preventDefault();
    if (!newPayment.amount) return;

    dispatch(
      createPayment({
        amount: Number(newPayment.amount),
        method: newPayment.method || 'cash',
        status: newPayment.status,
      })
    );
  };

  const handleRefund = (event) => {
    event.preventDefault();
    if (!refund.transactionId || !refund.amount) return;

    dispatch(
      refundPayment({
        transactionId: refund.transactionId,
        amount: Number(refund.amount),
      })
    );
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Lab 6: Redux Toolkit Demo</h1>

        <section className="card">
          <h2>Users</h2>
          <button type="button" onClick={handleFetchUsers} disabled={usersLoading}>
            {usersLoading ? 'Loading...' : 'Fetch Users'}
          </button>
          {usersError && <p className="error">Error: {usersError}</p>}
          <ul>
            {(users || []).map((user) => (
              <li key={user.id}>
                <strong>{user.name}</strong> — Admin: {user.isAdmin ? 'Yes' : 'No'}
                <button type="button" onClick={() => handleToggleAdmin(user.id)}>
                  Toggle Admin
                </button>
              </li>
            ))}
          </ul>
        </section>

        <section className="card">
          <h2>Create Payment</h2>
          <form onSubmit={handleCreatePayment} className="form">
            <label>
              Amount
              <input
                type="number"
                value={newPayment.amount}
                onChange={(event) =>
                  setNewPayment((prev) => ({ ...prev, amount: event.target.value }))
                }
              />
            </label>
            <label>
              Method
              <input
                type="text"
                value={newPayment.method}
                onChange={(event) =>
                  setNewPayment((prev) => ({ ...prev, method: event.target.value }))
                }
              />
            </label>
            <label>
              Status
              <select
                value={newPayment.status}
                onChange={(event) =>
                  setNewPayment((prev) => ({ ...prev, status: event.target.value }))
                }
              >
                <option value="SUCCESS">SUCCESS</option>
                <option value="PENDING">PENDING</option>
                <option value="FAILED">FAILED</option>
              </select>
            </label>
            <button type="submit" disabled={paymentsLoading}>
              {paymentsLoading ? 'Saving...' : 'Create Payment'}
            </button>
          </form>
          {paymentsError && <p className="error">Error: {paymentsError}</p>}
        </section>

        <section className="card">
          <h2>Refund Payment</h2>
          <form onSubmit={handleRefund} className="form">
            <label>
              Transaction ID
              <input
                type="text"
                value={refund.transactionId}
                onChange={(event) =>
                  setRefund((prev) => ({ ...prev, transactionId: event.target.value }))
                }
              />
            </label>
            <label>
              Amount
              <input
                type="number"
                value={refund.amount}
                onChange={(event) =>
                  setRefund((prev) => ({ ...prev, amount: event.target.value }))
                }
              />
            </label>
            <button type="submit" disabled={paymentsLoading}>
              {paymentsLoading ? 'Processing...' : 'Refund'}
            </button>
          </form>
        </section>

        <section className="card">
          <h2>All Payments</h2>
          <ul>
            {payments.map((payment, index) => (
              <li key={`${payment.id || index}`}>
                #{payment.id || index + 1} — {payment.method} — {payment.amount} —{' '}
                {payment.status}
              </li>
            ))}
          </ul>
        </section>

        <section className="card">
          <h2>Successful Payments (Selector)</h2>
          <ul>
            {successfulPayments.map((payment, index) => (
              <li key={`${payment.id || index}`}>
                #{payment.id || index + 1} — {payment.method} — {payment.amount}
              </li>
            ))}
          </ul>
        </section>
      </header>
    </div>
  );
}

export default App;
