import React, { useState } from 'react';
import { Table, Card, Button, Modal, Form, Input, Select, Tag, Space } from 'antd';
import { PlusOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';

const ExpenseTracker = () => {
  const [expenses, setExpenses] = useState([
    { id: 1, category: 'Food', amount: 150, date: '2024-05-01', trip: 'Paris Trip' },
    { id: 2, category: 'Transport', amount: 300, date: '2024-05-02', trip: 'Paris Trip' },
  ]);

  const columns = [
    { title: 'Date', dataIndex: 'date', key: 'date' },
    { title: 'Category', dataIndex: 'category', key: 'category', 
      render: (text) => <Tag color="blue">{text}</Tag> 
    },
    { title: 'Amount ($)', dataIndex: 'amount', key: 'amount' },
    { title: 'Trip', dataIndex: 'trip', key: 'trip' },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button icon={<EditOutlined />} type="text" />
          <Button icon={<DeleteOutlined />} type="text" danger />
        </Space>
      ),
    },
  ];

  return (
    <div className="animate-fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
        <h1>Expense Tracker</h1>
        <Button type="primary" icon={<PlusOutlined />}>Log Expense</Button>
      </div>

      <Card className="glass-card">
        <Table 
          columns={columns} 
          dataSource={expenses} 
          rowKey="id"
          style={{ background: 'transparent' }}
          className="custom-table"
        />
      </Card>

      <div style={{ marginTop: '2rem' }}>
        <Card className="glass-card" style={{ background: 'rgba(16, 185, 129, 0.1)', border: '1px solid #10b981' }}>
          <h3>Budget Summary</h3>
          <p style={{ margin: 0 }}>Planned: $2000 | Spent: $450 | Remaining: $1550</p>
        </Card>
      </div>
    </div>
  );
};

export default ExpenseTracker;
