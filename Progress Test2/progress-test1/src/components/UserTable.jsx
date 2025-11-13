import React, { useState } from 'react';
import { Table, Button, Image, Badge } from 'react-bootstrap';
import ConfirmModal from './ConfirmModal';

const UserTable = ({ users, onViewDetails, onBanAccount, onUnbanAccount, isUpdating = false, currentUserId }) => {
    const [actionModal, setActionModal] = useState({
        show: false,
        action: 'ban',
        user: null,
    });

    const openActionModal = (user, action) => {
        setActionModal({
            show: true,
            action,
            user,
        });
    };

    const handleConfirmBan = () => {
        if (!actionModal.user) return;
        if (actionModal.action === 'ban') {
            onBanAccount(actionModal.user.id);
        } else {
            onUnbanAccount(actionModal.user.id);
        }
        setActionModal({ show: false, action: 'ban', user: null });
    };

    const getStatusBadgeVariant = (status) => {
        switch (status) {
            case 'active':
                return 'success';
            case 'blocked':
                return 'danger';
            case 'locked':
                return 'warning';
            default:
                return 'secondary';
        }
    };

    const getRoleBadgeVariant = (role) => {
        return role === 'admin' ? 'primary' : 'info';
    };

    if (users.length === 0) {
        return <div>Chưa có user nào</div>;
    }

    return (
        <>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Avatar</th>
                        <th>Username</th>
                        <th>Full Name</th>
                        <th>Role</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>
                                <Image 
                                    src={user.avatar || '/images/users/default.png'} 
                                    roundedCircle 
                                    width="40" 
                                    height="40"
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = '/images/users/default.png';
                                    }}
                                />
                            </td>
                            <td>{user.username}</td>
                            <td>{user.fullName}</td>
                            <td>
                                <Badge bg={getRoleBadgeVariant(user.role)}>
                                    {user.role}
                                </Badge>
                            </td>
                            <td>
                                <Badge bg={getStatusBadgeVariant(user.status)}>
                                    {user.status}
                                </Badge>
                            </td>
                            <td>
                                <Button
                                    variant="info"
                                    size="sm"
                                    className="me-2"
                                    onClick={() => onViewDetails(user.id)}
                                    disabled={isUpdating}
                                >
                                    View Details
                                </Button>
                                <Button
                                    variant={['blocked', 'locked'].includes(user.status) ? 'success' : 'danger'}
                                    size="sm"
                                    onClick={() =>
                                        openActionModal(
                                            user,
                                            ['blocked', 'locked'].includes(user.status) ? 'unban' : 'ban'
                                        )
                                    }
                                    disabled={isUpdating || user.id === currentUserId}
                                >
                                    {['blocked', 'locked'].includes(user.status) ? 'Unban Account' : 'Ban Account'}
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <ConfirmModal
                show={actionModal.show}
                title={actionModal.action === 'ban' ? 'Xác nhận khóa tài khoản' : 'Mở khóa tài khoản'}
                message={
                    actionModal.action === 'ban'
                        ? `Bạn có chắc chắn muốn khóa tài khoản "${actionModal.user?.username}"?`
                        : `Bạn có chắc chắn muốn mở khóa tài khoản "${actionModal.user?.username}"?`
                }
                onConfirm={handleConfirmBan}
                onHide={() => setActionModal({ show: false, action: 'ban', user: null })}
            />
        </>
    );
};

export default UserTable;

