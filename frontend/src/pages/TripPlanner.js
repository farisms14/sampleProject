import React, { useState, useEffect, useRef } from 'react';
import { Card, Table, Button, Modal, Form, Input, DatePicker, Tag, Empty, Spin, Popconfirm } from 'antd';
import { PlusOutlined, DeleteOutlined, EditOutlined, CalendarOutlined, DollarOutlined, EnvironmentOutlined } from '@ant-design/icons';
import api from '../services/api';

// CROSS-REFERENCE LOCK — must match Backend response strings exactly
export const CRUD_CREATE_MSG = 'Trip created successfully.';
export const CRUD_UPDATE_MSG = 'Trip updated successfully.';
export const CRUD_DELETE_MSG = 'Trip deleted successfully.';

const TripPlanner = () => {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingTrip, setEditingTrip] = useState(null);
  const [search, setSearch] = useState('');
  const [feedback, setFeedback] = useState(null); // { type: 'success'|'error'|'warning', msg: string }
  const [form] = Form.useForm();
  const titleInputRef = useRef(null);

  useEffect(() => {
    fetchTrips();
  }, [search]);

  const fetchTrips = () => {
    setLoading(true);
    api.get(`/trips${search ? '?search=' + search : ''}`)
      .then(response => {
        setTrips(response.data);
      })
      .catch(error => {
        if (error?.response?.status === 401) {
          localStorage.removeItem('user');
          setFeedback({ type: 'error', msg: 'Session expired. Please log in again.' });
        } else {
          setFeedback({ type: 'error', msg: 'Error fetching trips. Please try again.' });
        }
      })
      .finally(() => setLoading(false));
  };

  const openModal = (trip = null) => {
    setEditingTrip(trip);
    setIsModalVisible(true);
    if (trip) {
      form.setFieldsValue({ title: trip.title, budget: trip.budget, category: trip.category || 'Leisure' });
    } else {
      form.resetFields();
    }
    setTimeout(() => {
      if (titleInputRef.current) {
        titleInputRef.current.focus();
        titleInputRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleSubmit = (values) => {
    const payload = {
      title: values.title,
      budget: values.budget,
      category: values.category || 'Leisure',
    };

    if (editingTrip) {
      api.put(`/trips/${editingTrip.id}`, payload)
        .then(() => {
          setFeedback({ type: 'success', msg: CRUD_UPDATE_MSG });
          setIsModalVisible(false);
          fetchTrips();
        })
        .catch(() => {
          setFeedback({ type: 'error', msg: 'Failed to update trip. Please try again.' });
        });
    } else {
      api.post('/trips', payload)
        .then(() => {
          setFeedback({ type: 'success', msg: CRUD_CREATE_MSG });
          setIsModalVisible(false);
          fetchTrips();
        })
        .catch(() => {
          setFeedback({ type: 'error', msg: 'Failed to create trip. Please try again.' });
        });
    }
  };

  const handleDeleteTrip = (id) => {
    api.delete(`/trips/${id}`)
      .then(() => {
        setFeedback({ type: 'success', msg: CRUD_DELETE_MSG });
        fetchTrips();
      })
      .catch(() => {
        setFeedback({ type: 'error', msg: 'Failed to delete trip. Please try again.' });
      });
  };

  const dismissFeedback = () => {
    setFeedback(null);
  };

  const columns = [
    {
      title: 'Trip Title',
      dataIndex: 'title',
      key: 'title',
      render: (text) => <span style={{ fontWeight: 600, color: 'var(--primary-color)' }}>{text}</span>
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'Budget',
      dataIndex: 'budget',
      key: 'budget',
      render: (val) => <Tag color="green"><DollarOutlined /> ${val}</Tag>
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <div style={{ display: 'flex', gap: '8px' }}>
          <Button
            aria-label="Edit Trip"
            icon={<EditOutlined />}
            type="text"
            onClick={() => openModal(record)}
          />
          <Popconfirm title="Delete this trip?" onConfirm={() => handleDeleteTrip(record.id)}>
            <Button aria-label="Delete Trip" icon={<DeleteOutlined />} type="text" danger />
          </Popconfirm>
        </div>
      )
    }
  ];

  if (loading) return <div style={{ textAlign: 'center', padding: '100px' }}><Spin size="large" /></div>;

  return (
    <div className="animate-fade-in">
      {/* Feedback Alert — rendered directly in DOM for testability */}
      {feedback && (
        <div
          data-testid={feedback.type === 'success' ? 'alert-success' : 'alert-warning'}
          role="alert"
          style={{
            padding: '12px 16px',
            marginBottom: '1rem',
            borderRadius: '6px',
            background: feedback.type === 'success' ? '#f6ffed' : '#fff2f0',
            border: `1px solid ${feedback.type === 'success' ? '#b7eb8f' : '#ffa39e'}`,
            color: feedback.type === 'success' ? '#52c41a' : '#f5222d',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <span>{feedback.msg}</span>
          <button onClick={dismissFeedback} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '16px' }}>×</button>
        </div>
      )}

      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem', alignItems: 'center' }}>
        <h1>My Trip Plans</h1>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <Input
            placeholder="Search trips..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ width: 250 }}
            prefix={<EnvironmentOutlined />}
          />
          <Button type="primary" size="large" icon={<PlusOutlined />} onClick={() => openModal()}>Create New Trip</Button>
        </div>
      </div>

      <Card className="glass-card">
        {trips.length > 0 ? (
          <Table
            columns={columns}
            dataSource={trips}
            rowKey="id"
            pagination={{ pageSize: 10 }}
          />
        ) : (
          <Empty description="No Trips Planned Yet. Start your journey by creating a new trip!" />
        )}
      </Card>

      <Modal
        title={editingTrip ? 'Edit Trip' : 'Plan Your Next Trip'}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form layout="vertical" form={form} onFinish={handleSubmit}>
          <Form.Item label="Trip Title" name="title" rules={[{ required: true, message: 'Trip title is required' }]}>
            <Input ref={titleInputRef} placeholder="e.g. Summer in Paris" />
          </Form.Item>
          <Form.Item label="Category" name="category" rules={[{ required: true }]}>
            <select name="category" className="ant-input" style={{ width: '100%' }}>
              <option value="Leisure">Leisure</option>
              <option value="Business">Business</option>
              <option value="Adventure">Adventure</option>
            </select>
          </Form.Item>
          <Form.Item label="Total Budget ($)" name="budget" rules={[{ required: true, message: 'Budget is required' }]}>
            <Input type="number" placeholder="Total Budget" prefix={<DollarOutlined />} />
          </Form.Item>
          <Button type="primary" block size="large" htmlType="submit">
            {editingTrip ? 'Update Trip' : 'Add Trip to Planner'}
          </Button>
        </Form>
      </Modal>
    </div>
  );
};

export default TripPlanner;
