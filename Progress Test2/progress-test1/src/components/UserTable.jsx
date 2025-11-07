import React, { useState } from 'react';
import { Table, Button, Image, Badge } from 'react-bootstrap';
import ConfirmModal from './ConfirmModal';

const UserTable = ({ users, onViewDetails, onBanAccount }) => {
    const [showBanModal, setShowBanModal] = useState(false);
    const [userToBan, setUserToBan] = useState(null);

    const handleBanClick = (user) => {
        setUserToBan(user);
        setShowBanModal(true);
    };

    const handleConfirmBan = () => {
        if (userToBan) {
            onBanAccount(userToBan.id);
            setShowBanModal(false);
            setUserToBan(null);
        }
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
                                >
                                    View Details
                                </Button>
                                <Button
                                    variant="danger"
                                    size="sm"
                                    onClick={() => handleBanClick(user)}
                                    disabled={user.status === 'blocked' || user.status === 'locked'}
                                >
                                    Ban Account
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <ConfirmModal
                show={showBanModal}
                title="Xác nhận khóa tài khoản"
                message={`Bạn có chắc chắn muốn khóa tài khoản "${userToBan?.username}"?`}
                onConfirm={handleConfirmBan}
                onHide={() => setShowBanModal(false)}
            />
        </>
    );
};

export default UserTable;

