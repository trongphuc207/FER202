//AppRoutes.js định nghĩa các route cho ứng dụng sử dụng React Router
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx'; // Import useAuth
import LoginPage from '../pages/LoginPage';
import DashboardPage from '../pages/DashboardPage';
import AddPaymentPage from '../pages/AddPaymentPage';
import EditPaymentPage from '../pages/EditPaymentPage'; 


const PrivateRoute = ({ children }) => {
 
    const { isAuthenticated } = useAuth(); 
    

    return isAuthenticated ? children : <Navigate to="/login" />;
};

const AppRoutes = () => {
    return (
        <Router>
            <Routes>

                <Route path="/" element={<Navigate to="/home" replace />} />
                

                <Route path="/login" element={<LoginPage />} />
                

                <Route 
                    path="/home" 
                    element={
                        <PrivateRoute>

                            <DashboardPage /> 
                        </PrivateRoute>
                    } 
                />
                

                <Route 
                    path="/payments/add" 
                    element={
                        <PrivateRoute>
                            <AddPaymentPage />
                        </PrivateRoute>
                    } 
                />
            
                
                {/* 6. Route bảo vệ cho trang chỉnh sửa thanh toán */}
                <Route 
                    path="/payments/:paymentId/edit" 
                    element={
                        <PrivateRoute>
                            <EditPaymentPage />
                        </PrivateRoute>
                    } 
                />
                
                {/* 7. Xử lý tất cả các đường dẫn không xác định: Chuyển hướng đến /home */}
                <Route path="*" element={<Navigate to="/home" replace />} />
            </Routes>
        </Router>
    );
};

export default AppRoutes;
