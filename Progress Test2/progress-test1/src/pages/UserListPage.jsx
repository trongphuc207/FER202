import React, { useReducer, useEffect, useMemo } from 'react';
import { Container, Card } from 'react-bootstrap';
import NavigationHeader from '../components/NavigationHeader';
import UserFilter from '../components/UserFilter';
import UserTable from '../components/UserTable';
import ConfirmModal from '../components/ConfirmModal';
import * as api from '../services/api';

// Initial state
const initialState = {
    users: [],
    loading: true,
    error: null,
    searchTerm: '',
    roleFilter: '',
    statusFilter: '',
    sortBy: 'id_asc',
    showDetailsModal: false,
    selectedUser: null,
};

// Reducer function
const userListReducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_START':
            return { ...state, loading: true, error: null };
        case 'FETCH_SUCCESS':
            return { ...state, loading: false, users: action.payload, error: null };
        case 'FETCH_FAILURE':
            return { ...state, loading: false, error: action.payload };
        case 'SET_SEARCH_TERM':
            return { ...state, searchTerm: action.payload };
        case 'SET_ROLE_FILTER':
            return { ...state, roleFilter: action.payload };
        case 'SET_STATUS_FILTER':
            return { ...state, statusFilter: action.payload };
        case 'SET_SORT_BY':
            return { ...state, sortBy: action.payload };
        case 'SHOW_DETAILS_MODAL':
            return { ...state, showDetailsModal: true, selectedUser: action.payload };
        case 'HIDE_DETAILS_MODAL':
            return { ...state, showDetailsModal: false, selectedUser: null };
        case 'SET_ERROR':
            return { ...state, error: action.payload };
        case 'UPDATE_USER':
            return {
                ...state,
                users: state.users.map((user) =>
                    user.id === action.payload.id ? action.payload : user
                ),
            };
        default:
            return state;
    }
};

const UserListPage = () => {
    const [state, dispatch] = useReducer(userListReducer, initialState);

    // Fetch users on component mount
    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            dispatch({ type: 'FETCH_START' });
            const data = await api.getUsers();
            dispatch({ type: 'FETCH_SUCCESS', payload: data });
        } catch (err) {
            dispatch({ type: 'FETCH_FAILURE', payload: 'Failed to load users' });
            console.error('Error fetching users:', err);
        }
    };

    // Filter and sort users
    const filteredAndSortedUsers = useMemo(() => {
        let filtered = [...state.users];

        // Search filter
        if (state.searchTerm) {
            const searchLower = state.searchTerm.toLowerCase();
            filtered = filtered.filter(
                (user) =>
                    user.username.toLowerCase().includes(searchLower) ||
                    user.fullName.toLowerCase().includes(searchLower)
            );
        }

        // Role filter
        if (state.roleFilter) {
            filtered = filtered.filter((user) => user.role === state.roleFilter);
        }

        // Status filter
        if (state.statusFilter) {
            filtered = filtered.filter((user) => user.status === state.statusFilter);
        }

        // Sort
        filtered.sort((a, b) => {
            switch (state.sortBy) {
                case 'id_asc':
                    return parseInt(a.id) - parseInt(b.id);
                case 'id_desc':
                    return parseInt(b.id) - parseInt(a.id);
                case 'username_asc':
                    return a.username.localeCompare(b.username);
                case 'username_desc':
                    return b.username.localeCompare(a.username);
                case 'fullName_asc':
                    return a.fullName.localeCompare(b.fullName);
                case 'fullName_desc':
                    return b.fullName.localeCompare(a.fullName);
                default:
                    return 0;
            }
        });

        return filtered;
    }, [state.users, state.searchTerm, state.roleFilter, state.statusFilter, state.sortBy]);

    const handleViewDetails = async (userId) => {
        try {
            const user = await api.getUserById(userId);
            dispatch({ type: 'SHOW_DETAILS_MODAL', payload: user });
        } catch (err) {
            dispatch({ type: 'SET_ERROR', payload: 'Failed to load user details' });
            console.error('Error fetching user:', err);
        }
    };

    const handleBanAccount = async (userId) => {
        try {
            const user = state.users.find((u) => u.id === userId);
            if (!user) return;

            const updatedUser = {
                ...user,
                status: 'blocked',
            };

            await api.updateUser(userId, updatedUser);
            // Update user in state
            dispatch({ type: 'UPDATE_USER', payload: updatedUser });
        } catch (err) {
            dispatch({ type: 'SET_ERROR', payload: 'Failed to ban account' });
            console.error('Error updating user:', err);
        }
    };

    const handleCloseDetailsModal = () => {
        dispatch({ type: 'HIDE_DETAILS_MODAL' });
    };

    if (state.loading) {
        return (
            <>
                <NavigationHeader />
                <Container className="my-4">
                    <div>Loading...</div>
                </Container>
            </>
        );
    }

    return (
        <>
            <NavigationHeader />
            <Container className="my-4">
                <UserFilter
                    searchTerm={state.searchTerm}
                    setSearchTerm={(value) => dispatch({ type: 'SET_SEARCH_TERM', payload: value })}
                    roleFilter={state.roleFilter}
                    setRoleFilter={(value) => dispatch({ type: 'SET_ROLE_FILTER', payload: value })}
                    statusFilter={state.statusFilter}
                    setStatusFilter={(value) => dispatch({ type: 'SET_STATUS_FILTER', payload: value })}
                    sortBy={state.sortBy}
                    setSortBy={(value) => dispatch({ type: 'SET_SORT_BY', payload: value })}
                />
                
                <Card>
                    <Card.Header as="h5">Danh Sách Users</Card.Header>
                    <Card.Body>
                        {state.error && <div className="alert alert-danger">{state.error}</div>}
                        <UserTable
                            users={filteredAndSortedUsers}
                            onViewDetails={handleViewDetails}
                            onBanAccount={handleBanAccount}
                        />
                    </Card.Body>
                </Card>
            </Container>

            {/* User Details Modal */}
            {state.selectedUser && (
                <ConfirmModal
                    show={state.showDetailsModal}
                    title="User Details"
                    message={
                        <div>
                            <p><strong>ID:</strong> {state.selectedUser.id}</p>
                            <p><strong>Username:</strong> {state.selectedUser.username}</p>
                            <p><strong>Full Name:</strong> {state.selectedUser.fullName}</p>
                            <p><strong>Role:</strong> {state.selectedUser.role}</p>
                            <p><strong>Status:</strong> {state.selectedUser.status}</p>
                            <p>
                                <strong>Avatar:</strong>{' '}
                                <img 
                                    src={state.selectedUser.avatar || '/images/users/default.png'} 
                                    alt="Avatar" 
                                    style={{ width: '50px', height: '50px', borderRadius: '50%' }}
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = '/images/users/default.png';
                                    }}
                                />
                            </p>
                        </div>
                    }
                    onHide={handleCloseDetailsModal}
                />
            )}
        </>
    );
};

export default UserListPage;

