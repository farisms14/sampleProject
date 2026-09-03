import React, { useState, useEffect } from 'react';
import { Table, Row, Col, Card, Statistic, Button, Tabs, Modal, Form, Input, message, Tag, Space, Empty, Spin, Popconfirm } from 'antd';
import { UserOutlined, GlobalOutlined, BarChartOutlined, PlusOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import api from '../services/api';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('1');
  const [users, setUsers] = useState([]);
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDestModalVisible, setIsDestModalVisible] = useState(false);
  const [isUserModalVisible, setIsUserModalVisible] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [form] = Form.useForm();
  const [userForm] = Form.useForm();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [usersRes, destsRes] = await Promise.all([
        api.get('/users'),
        api.get('/destinations')
      ]);
      setUsers(usersRes.data);
      setDestinations(destsRes.data);
    } catch (error) {
      console.error('Error fetching admin data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      await api.delete(`/users/${id}`);
      message.success('User deleted successfully');
      fetchData();
    } catch (e) { message.error('Failed to delete user'); }
  };

  const handleDeleteDest = async (id) => {
    try {
      await api.delete(`/destinations/${id}`);
      message.success('Destination deleted successfully');
      fetchData();
    } catch (e) { message.error('Failed to delete destination'); }
  };

  const showEditDest = (record) => {
    setEditingItem(record);
    form.setFieldsValue(record);
    setIsDestModalVisible(true);
  };

  const showEditUser = (record) => {
    setEditingItem(record);
    userForm.setFieldsValue(record);
    setIsUserModalVisible(true);
  };

  const userColumns = [
    { title: 'Username', dataIndex: 'username', key: 'username' },
    { title: 'Full Name', dataIndex: 'fullName', key: 'fullName' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { title: 'Role', dataIndex: 'role', key: 'role', render: (role) => <Tag color="blue">{role}</Tag> },
    { title: 'Action', key: 'action', render: (text, record) => (
      <Space>
        <Button icon={<EditOutlined />} type="text" onClick={() => showEditUser(record)} />
        <Popconfirm title="Delete user?" onConfirm={() => handleDeleteUser(record.id)} okText="Yes" cancelText="No">
          <Button icon={<DeleteOutlined />} type="text" danger />
        </Popconfirm>
      </Space>
    )},
  ];

  const destColumns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'City', dataIndex: 'city', key: 'city' },
    { title: 'Country', dataIndex: 'country', key: 'country' },
    { title: 'Est. Cost', dataIndex: 'estimatedCost', key: 'estimatedCost', render: (val) => `$${val}` },
    { title: 'Action', key: 'action', render: (text, record) => (
      <Space>
        <Button icon={<EditOutlined />} type="text" onClick={() => showEditDest(record)} />
        <Popconfirm title="Delete destination?" onConfirm={() => handleDeleteDest(record.id)} okText="Yes" cancelText="No">
          <Button icon={<DeleteOutlined />} type="text" danger />
        </Popconfirm>
      </Space>
    )},
  ];

  if (loading) return <div style={{ textAlign: 'center', padding: '100px' }}><Spin size="large" /></div>;

  return (
    <div className="animate-fade-in">
      <h1 style={{ marginBottom: '2rem' }}>Admin Management Panel</h1>

      <Row gutter={[16, 16]}>
        <Col span={8}><Card className="glass-card"><Statistic title="System Users" value={users.length || 0} prefix={<UserOutlined />} /></Card></Col>
        <Col span={8}><Card className="glass-card"><Statistic title="Active Destinations" value={destinations.length || 0} prefix={<GlobalOutlined />} /></Card></Col>
        <Col span={8}><Card className="glass-card"><Statistic title="Platform Revenue" value={0} prefix={<BarChartOutlined />} suffix="$" /></Card></Col>
      </Row>

      <Card className="glass-card" style={{ marginTop: '2rem' }}>
        <Tabs defaultActiveKey="1" items={[
          {
            key: '1',
            label: 'Manage Users',
            children: users.length > 0 ? <Table columns={userColumns} dataSource={users} rowKey="id" /> : <Empty description="No Data" />,
          },
          {
            key: '2',
            label: 'Manage Destinations',
            children: (
              <div>
                <Button type="primary" icon={<PlusOutlined />} onClick={() => { setEditingItem(null); form.resetFields(); setIsDestModalVisible(true); }} style={{ marginBottom: '1rem' }}>Add Destination</Button>
                {destinations.length > 0 ? <Table columns={destColumns} dataSource={destinations} rowKey="id" /> : <Empty description="No Data" />}
              </div>
            ),
          },
          {
            key: '3',
            label: 'Analytics',
            children: <Empty description="No Data" />,
          }
        ]} />
      </Card>

      {/* Destination Modal */}
      <Modal title={editingItem ? "Edit Destination" : "Add New Destination"} open={isDestModalVisible} onCancel={() => setIsDestModalVisible(false)} footer={null}>
        <Form form={form} layout="vertical" onFinish={async (values) => {
          try {
            if (editingItem) {
              await api.put(`/destinations/${editingItem.id}`, values);
              message.success('Destination updated!');
            } else {
              await api.post('/destinations', values);
              message.success('Destination added!');
            }
            setIsDestModalVisible(false);
            fetchData();
          } catch (e) { message.error('Action failed'); }
        }}>
          <Form.Item label="Name" name="name" rules={[{ required: true }]}><Input /></Form.Item>
          <Form.Item label="City" name="city" rules={[{ required: true }]}><Input /></Form.Item>
          <Form.Item label="Country" name="country" rules={[{ required: true }]}><Input /></Form.Item>
          <Form.Item label="Estimated Cost" name="estimatedCost" rules={[{ required: true }]}><Input type="number" /></Form.Item>
          <Button type="primary" htmlType="submit" block>{editingItem ? "Update" : "Save"}</Button>
        </Form>
      </Modal>

      {/* User Modal */}
      <Modal title="Edit User" open={isUserModalVisible} onCancel={() => setIsUserModalVisible(false)} footer={null}>
        <Form form={userForm} layout="vertical" onFinish={async (values) => {
          try {
            await api.put(`/users/${editingItem.id}`, values);
            message.success('User updated!');
            setIsUserModalVisible(false);
            fetchData();
          } catch (e) { message.error('Failed to update user'); }
        }}>
          <Form.Item label="Full Name" name="fullName" rules={[{ required: true }]}><Input /></Form.Item>
          <Form.Item label="Email" name="email" rules={[{ required: true, type: 'email' }]}><Input /></Form.Item>
          <Form.Item label="Phone" name="phone"><Input /></Form.Item>
          <Button type="primary" htmlType="submit" block>Update User</Button>
        </Form>
      </Modal>
    </div>
  );
};

export default AdminDashboard;
