import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../store/authSlice';
import { Button, Avatar, Dropdown } from 'antd';
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const menuItems = [
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Logout',
      onClick: handleLogout,
    },
  ];

  return (
    <nav className="navbar">
      <div className="logo" style={{ fontSize: '1.5rem', fontWeight: '800', color: '#4f46e5' }}>
        TravelMate
      </div>
      <div className="user-section" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <span style={{ color: 'var(--text-secondary)' }}>{user?.fullName}</span>
        <Dropdown menu={{ items: menuItems }} placement="bottomRight">
          <Avatar icon={<UserOutlined />} style={{ backgroundColor: '#4f46e5', cursor: 'pointer' }} />
        </Dropdown>
      </div>
    </nav>
  );
};

export default Navbar;
