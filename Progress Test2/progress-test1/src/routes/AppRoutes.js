//AppRoutes.js định nghĩa các route cho ứng dụng sử dụng React Router
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx'; // Import useAuth
import LoginPage from '../pages/LoginPage';
import DashboardPage from '../pages/DashboardPage';
import AddPaymentPage from '../pages/AddPaymentPage';
import ViewDetailsPage from '../pages/ViewDetailsPage';
import EditPaymentPage from '../pages/EditPaymentPage';
import UserListPage from '../pages/UserListPage';

// Component để bảo vệ các route cần xác thực
const PrivateRoute = ({ children }) => {
    // Lấy trực tiếp isAuthenticated từ useAuth()
    const { isAuthenticated } = useAuth(); 
    
    // Nếu chưa đăng nhập, chuyển hướng đến /login
    return isAuthenticated ? children : <Navigate to="/login" />;
};

// Component để bảo vệ các route chỉ dành cho admin với status active
const AdminRoute = ({ children }) => {
    const { isAuthenticated, user } = useAuth();
    
    // Nếu chưa đăng nhập, chuyển hướng đến /login
    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }
    
    // Kiểm tra role admin và status active
    if (user && user.role === 'admin' && user.status === 'active') {
        return children;
    }
    
    // Nếu không phải admin hoặc status không active, chuyển hướng đến /login với thông báo
    return <Navigate to="/login" />;
};

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                {/* 1. Trang mặc định: Chuyển hướng đến /home nếu đã đăng nhập, ngược lại là /login */}
                <Route path="/" element={<Navigate to="/home" replace />} />
                
                {/* 2. Trang Đăng nhập */}
                <Route path="/login" element={<LoginPage />} />
                
                {/* 3. Định nghĩa route bảo vệ cho Trang Chủ/Dashboard (yêu cầu: /home, chỉ admin active) */}
                <Route 
                    path="/home" 
                    element={
                        <AdminRoute>
                            {/* Component Trang chủ/Dashboard */}
                            <DashboardPage /> 
                        </AdminRoute>
                    } 
                />
                
                {/* 8. Route bảo vệ cho trang User Management (chỉ admin active) */}
                <Route 
                    path="/users" 
                    element={
                        <AdminRoute>
                            <UserListPage />
                        </AdminRoute>
                    } 
                />
                
                {/* 4. Route bảo vệ cho trang thêm thanh toán (chỉ admin active) */}
                <Route 
                    path="/payments/add" 
                    element={
                        <AdminRoute>
                            <AddPaymentPage />
                        </AdminRoute>
                    } 
                />
                
                {/* 5. Route bảo vệ cho trang xem chi tiết thanh toán (chỉ admin active) */}
                <Route 
                    path="/payments/:paymentId" 
                    element={
                        <AdminRoute>
                            <ViewDetailsPage />
                        </AdminRoute>
                    } 
                />
                
                {/* 6. Route bảo vệ cho trang chỉnh sửa thanh toán (chỉ admin active) */}
                <Route 
                    path="/payments/:paymentId/edit" 
                    element={
                        <AdminRoute>
                            <EditPaymentPage />
                        </AdminRoute>
                    } 
                />
                
                {/* 7. Xử lý tất cả các đường dẫn không xác định: Chuyển hướng đến /home */}
                <Route path="*" element={<Navigate to="/home" replace />} />
            </Routes>
        </Router>
    );
};

export default AppRoutes;
