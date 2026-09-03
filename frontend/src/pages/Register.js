import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Form, Input, Button, Card, Select, message } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons';

const { Option } = Select;

const Register = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      await axios.post('http://localhost:8080/api/auth/register', values);
      message.success('Registration successful! Please login.');
      navigate('/login');
    } catch (error) {
      message.error(error.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: '#87CEEB' }}>
      <Card className="glass-card" style={{ width: 450 }}>
        <h2 style={{ textAlign: 'center', marginBottom: '1.5rem', color: 'var(--primary-color)' }}>Join TravelMate</h2>
        <Form name="register" onFinish={onFinish} layout="vertical">
          <Form.Item name="fullName" rules={[{ required: true, message: 'Please input your Full Name!' }]}>
            <Input placeholder="Full Name" size="large" />
          </Form.Item>
          <Form.Item name="username" rules={[{ required: true, message: 'Please input your Username!' }]}>
            <Input prefix={<UserOutlined />} placeholder="Username" size="large" />
          </Form.Item>
          <Form.Item name="email" rules={[{ required: true, type: 'email', message: 'Please input a valid Email!' }]}>
            <Input prefix={<MailOutlined />} placeholder="Email" size="large" />
          </Form.Item>
          <Form.Item name="phone">
            <Input prefix={<PhoneOutlined />} placeholder="Phone Number" size="large" />
          </Form.Item>
          <Form.Item name="password" rules={[{ required: true, min: 6, message: 'Password must be at least 6 characters!' }]}>
            <Input.Password prefix={<LockOutlined />} placeholder="Password" size="large" />
          </Form.Item>
          <Form.Item name="role" label="I am a..." rules={[{ required: true }]}>
            <Select placeholder="Select your role" size="large">
              <Option value="ROLE_TRAVELER">Traveler</Option>
              <Option value="ROLE_GUIDE">Travel Guide</Option>
              <Option value="ROLE_ADMIN">Administrator</Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block size="large">
              Register
            </Button>
          </Form.Item>
          <div style={{ textAlign: 'center' }}>
            <a href="/login" style={{ color: '#94a3b8' }}>Already have an account? Login</a>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default Register;
