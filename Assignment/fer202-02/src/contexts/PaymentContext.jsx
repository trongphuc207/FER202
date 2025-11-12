import React, { createContext, useContext, useReducer, useEffect, useMemo } from 'react';
import * as api from '../services/api';
import { useAuth } from './AuthContext';

const PaymentContext = createContext();

const CATEGORY_OPTIONS = ['Food', 'Utilities', 'Entertainment', 'Shopping'];

const initialPaymentState = {
    payments: [],
    currentPayment: null,
    filterCategory: '',
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
        case 'SET_FILTER_CATEGORY':
            return {
                ...state,
                filterCategory: action.payload,
            };
        case 'RESET_STATE':
            return { ...initialPaymentState };
        default:
            return state;
    }
};

export const PaymentProvider = ({ children }) => {
    const [state, dispatch] = useReducer(paymentReducer, initialPaymentState);
    const { user } = useAuth();

    const normalizePayment = (payment) => ({
        ...payment,
        amount: Number(payment.amount) || 0,
    });

    const fetchPayments = async () => {
        const payments = await api.getPayments();
        const filteredPayments = user 
            ? payments.filter(p => p.userId === user.id)
            : payments;
        dispatch({ type: 'SET_PAYMENTS', payload: filteredPayments.map(normalizePayment) });
    };

    const fetchPaymentById = async (id) => {
        const payment = await api.getPaymentById(id);
        dispatch({ type: 'SET_CURRENT_PAYMENT', payload: normalizePayment(payment) });
    };

    const createPayment = async (paymentData) => {
        const dataToSend = user 
            ? { ...paymentData, userId: user.id }
            : paymentData;
        const newPayment = await api.createPayment(dataToSend);
        dispatch({ type: 'ADD_PAYMENT', payload: normalizePayment(newPayment) });
    };

    const updatePayment = async (id, paymentData) => {
        const updatedPayment = await api.updatePayment(id, paymentData);
        dispatch({ type: 'UPDATE_PAYMENT', payload: normalizePayment(updatedPayment) });
    };

    const deletePayment = async (id) => {
        await api.deletePayment(id);
        dispatch({ type: 'DELETE_PAYMENT', payload: id });
    };

    useEffect(() => {
        if (user) {
            fetchPayments();
        } else {
            dispatch({ type: 'RESET_STATE' });
        }
   
    }, [user]);

    const setFilterCategory = (category) => {
        dispatch({ type: 'SET_FILTER_CATEGORY', payload: category });
    };

    const payments = state.payments;
    const filteredPayments = useMemo(() => {
        if (!state.filterCategory.trim()) {
            return payments;
        }
        const keyword = state.filterCategory.trim().toLowerCase();
        return payments.filter((payment) =>
            payment.category?.toLowerCase().includes(keyword)
        );
    }, [payments, state.filterCategory]);

    const totalExpense = useMemo(() => {
        return filteredPayments.reduce((sum, payment) => sum + (Number(payment.amount) || 0), 0);
    }, [filteredPayments]);

    const categoryOptions = CATEGORY_OPTIONS;

    const contextValue = {
        payments,
        filteredPayments,
        filterCategory: state.filterCategory,
        totalExpense,
        categoryOptions,
        currentPayment: state.currentPayment,
        fetchPayments,
        fetchPaymentById,
        createPayment,
        updatePayment,
        deletePayment,
        setFilterCategory,
    };

    return (
        <PaymentContext.Provider value={contextValue}>
            {children}
        </PaymentContext.Provider>
    );
};

export const usePayment = () => useContext(PaymentContext);

