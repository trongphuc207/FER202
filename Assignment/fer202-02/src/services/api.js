
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:3001',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getUsers = async () => {
    try {
        const response = await API.get('/users');
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch users');
    }
};


export const getPayments = async () => {
    try {
        const response = await API.get('/expenses');
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch payments');
    }
};

export const getPaymentById = async (id) => {
    try {
        const response = await API.get(`/expenses/${id}`);
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch payment');
    }
};

export const createPayment = async (paymentData) => {
    try {
        const response = await API.post('/expenses', paymentData);
        return response.data;
    } catch (error) {
        throw new Error('Failed to create payment');
    }
};

export const updatePayment = async (id, paymentData) => {
    try {
        const response = await API.put(`/expenses/${id}`, paymentData);
        return response.data;
    } catch (error) {
        throw new Error('Failed to update payment');
    }
};

export const deletePayment = async (id) => {
    try {
        await API.delete(`/expenses/${id}`);
        return true;
    } catch (error) {
        throw new Error('Failed to delete payment');
    }
};
