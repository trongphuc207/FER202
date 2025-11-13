import React, { useReducer, useEffect, useMemo, useState } from 'react';
import { Container, Card } from 'react-bootstrap';
import NavigationHeader from '../components/NavigationHeader';
import UserFilter from '../components/UserFilter';
import UserTable from '../components/UserTable';
import ConfirmModal from '../components/ConfirmModal';
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchUsers,
    fetchUserById,
    updateUser,
    clearSelectedUser,
    selectUsers,
    selectUsersStatus,
    selectUsersError,
    selectSelectedUser,
    selectSelectedUserStatus,
    selectSelectedUserError,
    selectUsersUpdateStatus,
    selectUsersUpdateError,
} from '../store/usersSlice';
import { useAuth } from '../contexts/AuthContext';

const filterInitialState = {
    searchTerm: '',
    roleFilter: '',
    statusFilter: '',
    sortBy: 'id_asc',
};

const filterReducer = (state, action) => {
    switch (action.type) {
        case 'SET_SEARCH_TERM':
            return { ...state, searchTerm: action.payload };
        case 'SET_ROLE_FILTER':
            return { ...state, roleFilter: action.payload };
        case 'SET_STATUS_FILTER':
            return { ...state, statusFilter: action.payload };
        case 'SET_SORT_BY':
            return { ...state, sortBy: action.payload };
        default:
            return state;
    }
};

const UserListPage = () => {
    const dispatch = useDispatch();
    const [filterState, filterDispatch] = useReducer(filterReducer, filterInitialState);
    const [showDetailsModal, setShowDetailsModal] = useState(false);

    const { user: currentUser } = useAuth();

    const users = useSelector(selectUsers);
    const usersStatus = useSelector(selectUsersStatus);
    const usersError = useSelector(selectUsersError);
    const selectedUser = useSelector(selectSelectedUser);
    const selectedUserStatus = useSelector(selectSelectedUserStatus);
    const selectedUserError = useSelector(selectSelectedUserError);
    const updateStatus = useSelector(selectUsersUpdateStatus);
    const updateError = useSelector(selectUsersUpdateError);

    // Fetch users on component mount
    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    // Filter and sort users
    const filteredAndSortedUsers = useMemo(() => {
        let filtered = [...users];

        // Search filter
        if (filterState.searchTerm) {
            const searchLower = filterState.searchTerm.toLowerCase();
            filtered = filtered.filter(
                (user) =>
                    user.username.toLowerCase().includes(searchLower) ||
                    user.fullName.toLowerCase().includes(searchLower)
            );
        }

        // Role filter
        if (filterState.roleFilter) {
            filtered = filtered.filter((user) => user.role === filterState.roleFilter);
        }

        // Status filter
        if (filterState.statusFilter) {
            filtered = filtered.filter((user) => user.status === filterState.statusFilter);
        }

        // Sort
        filtered.sort((a, b) => {
            switch (filterState.sortBy) {
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
    }, [users, filterState]);

    const handleViewDetails = async (userId) => {
        try {
            await dispatch(fetchUserById(userId)).unwrap();
            setShowDetailsModal(true);
        } catch (err) {
            console.error('Error fetching user:', err);
            setShowDetailsModal(false);
        }
    };

    const handleBanAccount = async (userId) => {
        const user = users.find((u) => u.id === userId);
        if (!user || user.id === currentUser?.id || user.status === 'blocked' || user.status === 'locked') {
            return;
        }

        const updatedUser = {
            ...user,
            status: 'blocked',
        };

        try {
            await dispatch(updateUser({ id: userId, userData: updatedUser })).unwrap();
        } catch (err) {
            console.error('Error updating user:', err);
        }
    };

    const handleUnbanAccount = async (userId) => {
        const user = users.find((u) => u.id === userId);
        if (!user || user.id === currentUser?.id || user.status === 'active') {
            return;
        }

        const updatedUser = {
            ...user,
            status: 'active',
        };

        try {
            await dispatch(updateUser({ id: userId, userData: updatedUser })).unwrap();
        } catch (err) {
            console.error('Error updating user:', err);
        }
    };

    const handleCloseDetailsModal = () => {
        setShowDetailsModal(false);
        dispatch(clearSelectedUser());
    };

    if (usersStatus === 'loading') {
        return (
            <>
                <NavigationHeader />
                <Container className="my-4">
                    <div>Đang tải danh sách người dùng...</div>
                </Container>
            </>
        );
    }

    return (
        <>
            <NavigationHeader />
            <Container className="my-4">
                <UserFilter
                    searchTerm={filterState.searchTerm}
                    setSearchTerm={(value) => filterDispatch({ type: 'SET_SEARCH_TERM', payload: value })}
                    roleFilter={filterState.roleFilter}
                    setRoleFilter={(value) => filterDispatch({ type: 'SET_ROLE_FILTER', payload: value })}
                    statusFilter={filterState.statusFilter}
                    setStatusFilter={(value) => filterDispatch({ type: 'SET_STATUS_FILTER', payload: value })}
                    sortBy={filterState.sortBy}
                    setSortBy={(value) => filterDispatch({ type: 'SET_SORT_BY', payload: value })}
                />
                
                <Card>
                    <Card.Header as="h5">Danh Sách Users</Card.Header>
                    <Card.Body>
                        {(usersStatus === 'failed' || usersError) && (
                            <div className="alert alert-danger">
                                {usersError || 'Không thể tải danh sách người dùng.'}
                            </div>
                        )}
                        {updateError && (
                            <div className="alert alert-danger">
                                {updateError}
                            </div>
                        )}
                        <UserTable
                            users={filteredAndSortedUsers}
                            onViewDetails={handleViewDetails}
                            onBanAccount={handleBanAccount}
                            onUnbanAccount={handleUnbanAccount}
                            isUpdating={updateStatus === 'loading'}
                            currentUserId={currentUser?.id}
                        />
                    </Card.Body>
                </Card>
            </Container>

            {/* User Details Modal */}
            {selectedUser && (
                <ConfirmModal
                    show={showDetailsModal}
                    title="User Details"
                    message={
                        selectedUserStatus === 'loading' ? (
                            <div>Đang tải thông tin người dùng...</div>
                        ) : selectedUserError ? (
                            <div className="text-danger">{selectedUserError}</div>
                        ) : (
                            <div>
                                <p><strong>ID:</strong> {selectedUser.id}</p>
                                <p><strong>Username:</strong> {selectedUser.username}</p>
                                <p><strong>Full Name:</strong> {selectedUser.fullName}</p>
                                <p><strong>Role:</strong> {selectedUser.role}</p>
                                <p><strong>Status:</strong> {selectedUser.status}</p>
                                <p>
                                    <strong>Avatar:</strong>{' '}
                                    <img 
                                        src={selectedUser.avatar || '/images/users/default.png'} 
                                        alt="Avatar" 
                                        style={{ width: '50px', height: '50px', borderRadius: '50%' }}
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = '/images/users/default.png';
                                        }}
                                    />
                                </p>
                            </div>
                        )
                    }
                    onHide={handleCloseDetailsModal}
                />
            )}
        </>
    );
};

export default UserListPage;

