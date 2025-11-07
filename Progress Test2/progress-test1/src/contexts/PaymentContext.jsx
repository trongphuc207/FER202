import React, { createContext, useContext, useReducer, useEffect } from 'react';
import * as api from '../services/api';
import { useAuth } from './AuthContext';

const PaymentContext = createContext();

const initialPaymentState = {
    payments: [],
    currentPayment: null,
};

const paymentReducer = (state, action) => {
    switch (action.type) {
        case 'SET_PAYMENTS':
            return { ...state, payments: action.payload };
        case 'SET_CURRENT_PAYMENT':
            return { ...state, currentPayment: action.payload };
        case 'ADD_PAYMENT':
            return { ...state, payments: [...state.payments, action.payload] };
        case 'UPDATE_PAYMENT':
            return { 
                ...state, 
                payments: state.payments.map(p => 
                    p.id === action.payload.id ? action.payload : p
                )
            };
        case 'DELETE_PAYMENT':
            return { 
                ...state, 
                payments: state.payments.filter(p => p.id !== action.payload)
            };
        default:
            return state;
    }
};

export const PaymentProvider = ({ children }) => {
    const [state, dispatch] = useReducer(paymentReducer, initialPaymentState);
    const { user } = useAuth();

    const fetchPayments = async () => {
        const payments = await api.getPayments();
        const filteredPayments = user 
            ? payments.filter(p => p.userId === user.id)
            : payments;
        dispatch({ type: 'SET_PAYMENTS', payload: filteredPayments });
    };

    const fetchPaymentById = async (id) => {
        const payment = await api.getPaymentById(id);
        dispatch({ type: 'SET_CURRENT_PAYMENT', payload: payment });
    };

    const createPayment = async (paymentData) => {
        const dataToSend = user 
            ? { ...paymentData, userId: user.id }
            : paymentData;
        const newPayment = await api.createPayment(dataToSend);
        dispatch({ type: 'ADD_PAYMENT', payload: newPayment });
    };

    const updatePayment = async (id, paymentData) => {
        const updatedPayment = await api.updatePayment(id, paymentData);
        dispatch({ type: 'UPDATE_PAYMENT', payload: updatedPayment });
    };

    const deletePayment = async (id) => {
        await api.deletePayment(id);
        dispatch({ type: 'DELETE_PAYMENT', payload: id });
    };

    useEffect(() => {
        if (user) {
            fetchPayments();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    const contextValue = {
        payments: state.payments,
        currentPayment: state.currentPayment,
        fetchPayments,
        fetchPaymentById,
        createPayment,
        updatePayment,
        deletePayment,
    };

    return (
        <PaymentContext.Provider value={contextValue}>
            {children}
        </PaymentContext.Provider>
    );
};

export const usePayment = () => useContext(PaymentContext);

