// src/contexts/AuthContext.jsx
import React, { createContext, useReducer, useContext, useEffect } from 'react';
import movieApi from '../api/movieAPI';


const AuthContext = createContext();


const initialState = { 
  user: null,
  loading: false,
  error: null,
  isAuthenticated: false
};


function authReducer(state, action) {
  switch (action.type) {
    case 'LOGIN_START':
      return { 
        ...state, 
        loading: true, 
        error: null 
      };
    case 'LOGIN_SUCCESS':
      return { 
        ...state, 
        user: action.payload, 
        loading: false, 
        error: null,
        isAuthenticated: true
      };
    case 'LOGIN_FAILURE':
      return { 
        ...state, 
        user: null, 
        loading: false, 
        error: action.payload,
        isAuthenticated: false
      };
    case 'LOGOUT':
      return { 
        ...state, 
        user: null, 
        loading: false, 
        error: null,
        isAuthenticated: false
      };
    case 'CLEAR_ERROR':
      return { 
        ...state, 
        error: null 
      };
    case 'LOAD_USER':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: !!action.payload,
        loading: false
      };
    default: 
      return state;
  }
}


export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState);


  useEffect(() => {
    dispatch({ type: 'LOGIN_START' });
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        dispatch({ type: 'LOAD_USER', payload: user });
      } catch (error) {
        console.error('Error parsing stored user:', error);
        localStorage.removeItem('user');
        dispatch({ type: 'LOGIN_FAILURE', payload: null });
      }
    } else {
      dispatch({ type: 'LOGIN_FAILURE', payload: null });
    }
  }, []);

  
  async function login(identifier, password) {

    dispatch({ type: 'LOGIN_START' });

    try {
      const response = await movieApi.get('/accounts');
      const accounts = response.data;

      const isEmail = identifier.includes('@');
      
   
      const account = accounts.find(acc => {
        if (isEmail) {
          return acc.email === identifier && acc.password === password;
        } else {
          return acc.username === identifier && acc.password === password;
        }
      });

      if (!account) {
       
        dispatch({ 
          type: 'LOGIN_FAILURE', 
          payload: 'Tên đăng nhập hoặc mật khẩu không đúng' 
        });
        return { ok: false, message: 'Tên đăng nhập hoặc mật khẩu không đúng' };
      }

      // Kiểm tra role - chỉ cho phép admin đăng nhập
      if (account.role !== 'admin') {
        dispatch({ 
          type: 'LOGIN_FAILURE', 
          payload: 'Access denied. Only admin users can login' 
        });
        return { ok: false, message: 'Access denied. Only admin users can login' };
      }

 
      const { password: _, ...userWithoutPassword } = account;
      dispatch({ type: 'LOGIN_SUCCESS', payload: userWithoutPassword });
      localStorage.setItem('user', JSON.stringify(userWithoutPassword));
      return { ok: true, account: userWithoutPassword };
    } catch (error) {
      console.error('Login error:', error);
      dispatch({ 
        type: 'LOGIN_FAILURE', 
        payload: 'Lỗi kết nối đến server' 
      });
      return { ok: false, message: 'Lỗi kết nối đến server' };
    }
  }


  function logout() { 
    dispatch({ type: 'LOGOUT' });
    localStorage.removeItem('user');
  }


  function clearError() {
    dispatch({ type: 'CLEAR_ERROR' });
  }

 
  function isAuthenticated() {
    return state.isAuthenticated;
  }


  function isAdmin() {
    return state.user?.role === 'admin';
  }

  const contextValue = {
    user: state.user,
    loading: state.loading,
    error: state.error,
    isAuthenticated,
    isAdmin,
    login,
    logout,
    clearError
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}


export function useAuth() { 
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export default AuthContext;


