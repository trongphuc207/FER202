import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import { AuthProvider } from './contexts/AuthContext.jsx';
import AppRoutes from './routes/AppRoutes';
import store from './store';

function App() {
  return (
    // 1. Đặt AuthProvider ở cấp cao nhất trong ứng dụng để cung cấp Context cho toàn bộ ứng dụng
    <AuthProvider>
      <Provider store={store}>
        <div className="App">
          {/* Sử dụng AppRoutes để quản lý các route trong ứng dụng */}
          <AppRoutes />
        </div>
      </Provider>
    </AuthProvider>
  );
}

export default App;
