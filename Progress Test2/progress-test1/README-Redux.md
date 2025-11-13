# Redux Integration Overview

Tài liệu này giải thích chi tiết cách Redux Toolkit đã được áp dụng trong bài Progress Test 2 để quản lý dữ liệu **Users** và **Payments**, bao gồm cấu trúc store, các slice, async thunk, cũng như cách các component tiêu thụ state.

---

## 1. Cấu trúc tổng quan

```
src/
  store/
    index.js           # cấu hình store
    usersSlice.js      # quản lý state users
    paymentsSlice.js   # quản lý state payments

components/
  UserTable.jsx        # bảng người dùng (dispatch & selector)
  PaymentTable.jsx     # bảng thanh toán (dispatch & selector)

pages/
  UserListPage.jsx     # trang User Management
  Add/Edit/ViewPayment # các trang Payment

App.js                # gắn Provider cho Redux store
```

Store được khởi tạo với hai slice (`users`, `payments`) và được cung cấp cho toàn bộ ứng dụng thông qua `<Provider store={store}>` trong `App.js`.

---

## 2. Cấu hình store (`src/store/index.js`)

```javascript
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
```

- `configureStore` tự động kết hợp reducers, bật Redux DevTools và middleware cần thiết.
- Hai reducer `users` và `payments` được import từ các slice tương ứng.

---

## 3. Payments Slice (`src/store/paymentsSlice.js`)

### 3.1 State ban đầu

```javascript
const initialState = {
    items: [],            // danh sách payments theo user đang đăng nhập
    current: null,        // payment đang xem/sửa chi tiết
    status: 'idle',       // trạng thái fetch list ('idle' | 'loading' | 'succeeded' | 'failed')
    error: null,
    actionStatus: 'idle', // trạng thái các thao tác đơn lẻ (create/update/delete)
    actionError: null,
};
```

### 3.2 Async thunks

- `fetchPayments(userId)` → lấy danh sách, lọc theo `userId` nếu có.
- `fetchPaymentById(paymentId)` → lấy dữ liệu chi tiết khi xem hoặc chỉnh sửa.
- `createPayment(paymentData)` → POST payment mới.
- `updatePayment({ id, paymentData })` → PUT update.
- `deletePayment(id)` → DELETE.

Mỗi thunk dùng `rejectWithValue` để trả lỗi tuỳ chỉnh, giúp UI hiển thị thông báo chính xác.

### 3.3 Xử lý reducer

Sử dụng `builder.addCase` để cập nhật `status`, `error`, `items`, và `current`. Ví dụ:

```javascript
.addCase(fetchPayments.fulfilled, (state, action) => {
    state.status = 'succeeded';
    state.items = action.payload;
})
.addCase(createPayment.fulfilled, (state, action) => {
    state.actionStatus = 'succeeded';
    state.items.push(action.payload);
})
.addCase(deletePayment.fulfilled, (state, action) => {
    state.items = state.items.filter((payment) => payment.id !== action.payload);
});
```

### 3.4 Selectors

```javascript
export const selectPayments = (state) => state.payments.items;
export const selectPaymentsStatus = (state) => state.payments.status;
export const selectPaymentsError = (state) => state.payments.error;
...
```

Selectors giúp component lấy state một cách tường minh, đồng thời tránh truy cập trực tiếp cấu trúc store.

---

## 4. Users Slice (`src/store/usersSlice.js`)

### 4.1 State ban đầu

```javascript
const initialState = {
    items: [],              // danh sách tất cả user
    status: 'idle',
    error: null,
    selectedUser: null,     // user đang xem chi tiết
    selectedStatus: 'idle',
    selectedError: null,
    updateStatus: 'idle',
    updateError: null,
};
```

### 4.2 Async thunks

- `fetchUsers()` → GET toàn bộ users từ JSON Server.
- `fetchUserById(id)` → lấy chi tiết user khi mở modal View Details.
- `updateUser({ id, userData })` → update user (ban/unban…). Lưu ý: không cho phép ban chính tài khoản đang đăng nhập (kiểm tra ở component).

### 4.3 Reducer & Selectors

`extraReducers` cập nhật trạng thái lấy dữ liệu/list, error, cập nhật user trong `items`, và cập nhật `selectedUser`. Các selectors:

```javascript
export const selectUsers = (state) => state.users.items;
export const selectUsersStatus = (state) => state.users.status;
export const selectSelectedUser = (state) => state.users.selectedUser;
...
```

---

## 5. Provider (`src/App.js`)

```javascript
import { Provider } from 'react-redux';
import store from './store';

function App() {
  return (
    <AuthProvider>
      <Provider store={store}>
        <AppRoutes />
      </Provider>
    </AuthProvider>
  );
}
```

- `AuthProvider` vẫn giữ vai trò quản lý thông tin đăng nhập, còn Redux chịu trách nhiệm dữ liệu business (users/payments).

---

## 6. Component sử dụng Redux

### 6.1 PaymentTable (`src/components/PaymentTable.jsx`)

```javascript
const dispatch = useDispatch();
const payments = useSelector(selectPayments);
const status = useSelector(selectPaymentsStatus);
const error = useSelector(selectPaymentsError);

useEffect(() => {
    if (user?.id) {
        dispatch(fetchPayments(user.id));
    }
}, [dispatch, user]);
```

- Lấy danh sách thanh toán khi admin login.
- Hành động Delete sử dụng `dispatch(deletePaymentThunk(id)).unwrap()` để xử lý lỗi.
- Hiển thị tổng tiền (`reduce`) và trạng thái tải (`status === 'loading'`).

### 6.2 Add/Edit/View Payment pages

- `AddPaymentPage` dispatch `createPayment` và disable nút submit khi đang gửi.
- `EditPaymentPage` dispatch `fetchPaymentById` để load dữ liệu, `updatePayment` để lưu.
- `ViewDetailsPage` hiển thị thông tin từ `selectCurrentPayment`.

### 6.3 UserListPage (`src/pages/UserListPage.jsx`)

- Dùng `useSelector` lấy danh sách users và trạng thái loading/error.
- Bộ lọc quản lý bằng `useReducer` cục bộ (`filterReducer`) để xử lý search/filter/sort.
- `handleBanAccount` & `handleUnbanAccount` gọi `updateUser` với trạng thái mới.
- Không cho phép tài khoản hiện tại tự ban/unban chính mình (`user.id === currentUser?.id`).
- `UserTable` nhận props `isUpdating`, `currentUserId`, `onViewDetails`, `onBanAccount`, `onUnbanAccount`.

### 6.4 UserTable (`src/components/UserTable.jsx`)

- Dựa trên `user.status` để hiển thị nút **Ban Account** hoặc **Unban Account** duy nhất.
- Modal xác nhận hiển thị nội dung tương ứng (ban/unban).
- Disable nút khi thao tác đang xử lý hoặc là user hiện tại.

---

## 7. Kết quả đạt được

- **Tách biệt logic**: Redux giữ toàn bộ logic bất đồng bộ & trạng thái cho users/payments, giúp component đơn giản hơn.
- **Quản lý trạng thái rõ ràng**: `status`, `error`, `actionStatus`, `actionError` cho phép UI phản hồi đúng từng tác vụ (loading/error).
- **Dễ mở rộng**: Có thể thêm selectors, thunk mới (ví dụ filter nâng cao, phân trang…) mà không phải sửa nhiều component.
- **Tái sử dụng**: Các trang Add/Edit/View Payment dùng chung slice, tránh duplicate logic gọi API.

---

## 8. Đề xuất mở rộng

- **Persist** Redux state (ví dụ redux-persist) nếu muốn giữ dữ liệu sau refresh.
- **RTK Query** cho phép tối ưu gọi API nếu số lượng endpoint tăng.
- **Middleware logging** (đã có mặc định trong dev) để theo dõi actions dễ dàng hơn khi debug.

---

Với cấu trúc Redux Toolkit hiện tại, ứng dụng đã sẵn sàng xử lý các nghiệp vụ users/payments phức tạp hơn mà vẫn giữ codebase rõ ràng và dễ bảo trì.


