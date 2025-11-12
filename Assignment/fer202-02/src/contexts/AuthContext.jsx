import React, { createContext, useContext, useReducer } from 'react';
import * as api from '../services/api';


const AuthContext = createContext();


const initialAuthState = {
    isAuthenticated: false,
    user: null,
    isLoading: false,
    error: null,
};

const authReducer = (state, action) => {
    switch (action.type) { 
        case 'LOGIN_START':
            return { ...state, isLoading: true, error: null };
        case 'LOGIN_SUCCESS':
            localStorage.setItem('user', JSON.stringify(action.payload));
            return { ...state, isLoading: false, isAuthenticated: true, user: action.payload, error: null };
        case 'LOGIN_FAILURE':
            return { ...state, isLoading: false, error: action.payload };
        case 'LOGOUT':
            localStorage.removeItem('user');
            return { ...initialAuthState, isAuthenticated: false, user: null };
        case 'CLEAR_ERROR':
            return { ...state, error: null };
        default:
            return state;
    }
};

export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initialAuthState);

    const clearError = () => {
        dispatch({ type: 'CLEAR_ERROR' });
    };

    const login = async ({ usernameOrEmail, password }) => {
        dispatch({ type: 'LOGIN_START' });
        
        try {
            const accounts = await api.getUsers(); 

            const user = accounts.find(
                (acc) =>
                    (acc.username === usernameOrEmail || (acc.email && acc.email === usernameOrEmail)) &&
                    acc.password === password
            );

            if (user) { 

                
                dispatch({ type: 'LOGIN_SUCCESS', payload: user });

                return { success: true, user };
            } else { 

                const errorMessage = 'Invalid username/email or password!';
                dispatch({ type: 'LOGIN_FAILURE', payload: errorMessage });
                return { success: false, error: errorMessage };
            }
        } catch (error) {
 
            const errorMessage = error.message || 'Login failed due to a network error.';
            dispatch({ type: 'LOGIN_FAILURE', payload: errorMessage });
            return { success: false, error: errorMessage };
        }
    };

    const logout = () => {
        dispatch({ type: 'LOGOUT' });
    };


    const contextValue = {
    
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        loading: state.isLoading,
        error: state.error,
        
 
        login,
        logout,
        clearError, 
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};


export const useAuth = () => useContext(AuthContext);
