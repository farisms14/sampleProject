import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Table, Button, Modal, Form, Input, Tag, Space, message, Statistic, Empty, Spin } from 'antd';
import { PlusOutlined, UserOutlined, BookOutlined, StarOutlined } from '@ant-design/icons';
import api from '../services/api';

const GuideDashboard = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isPackageModalVisible, setIsPackageModalVisible] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await api.get('/packages');
      setPackages(response.data);
    } catch (error) {
      console.error('Error fetching guide data:', error);
    } finally {
      setLoading(false);
    }
  };

  const packageColumns = [
    { title: 'Package Name', dataIndex: 'packageName', key: 'packageName' },
    { title: 'Price', dataIndex: 'price', key: 'price', render: (val) => `$${val}` },
    { title: 'Action', key: 'action', render: () => <Space><Button type="link">Edit</Button><Button type="link" danger>Delete</Button></Space> },
  ];

  if (loading) return <div style={{ textAlign: 'center', padding: '100px' }}><Spin size="large" /></div>;

  return (
    <div className="animate-fade-in">
      <h1 style={{ marginBottom: '2rem' }}>Travel Guide Dashboard</h1>

      <Row gutter={[16, 16]}>
        <Col span={8}><Card className="glass-card"><Statistic title="My Packages" value={packages.length} prefix={<BookOutlined />} /></Card></Col>
        <Col span={8}><Card className="glass-card"><Statistic title="Bookings" value={0} prefix={<UserOutlined />} /></Card></Col>
        <Col span={8}><Card className="glass-card"><Statistic title="Revenue" value={0} prefix={<StarOutlined />} suffix="$" /></Card></Col>
      </Row>

      <Card className="glass-card" style={{ marginTop: '2rem' }} title={<span style={{ color: '#fff' }}>Manage Packages</span>} extra={<Button type="primary" icon={<PlusOutlined />} onClick={() => setIsPackageModalVisible(true)}>Create Package</Button>}>
        {packages.length > 0 ? <Table columns={packageColumns} dataSource={packages} rowKey="id" /> : <Empty description={<span style={{ color: '#fff' }}>No Data</span>} />}
      </Card>

      <Modal title="Create Travel Package" open={isPackageModalVisible} onCancel={() => setIsPackageModalVisible(false)} footer={null}>
        <Form layout="vertical" onFinish={async (values) => {
          try {
            await api.post('/packages', values);
            message.success('Package created!');
            setIsPackageModalVisible(false);
            fetchData();
          } catch (e) { message.error('Failed to create package'); }
        }}>
          <Form.Item label="Package Name" name="packageName" rules={[{ required: true }]}><Input /></Form.Item>
          <Form.Item label="Description" name="description"><Input.TextArea /></Form.Item>
          <Form.Item label="Price ($)" name="price" rules={[{ required: true }]}><Input type="number" /></Form.Item>
          <Button type="primary" htmlType="submit" block>Publish Package</Button>
        </Form>
      </Modal>
    </div>
  );
};

export default GuideDashboard;
