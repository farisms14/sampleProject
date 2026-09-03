import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Button, Tag, Rate, Empty, Spin } from 'antd';
import { ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';
import api from '../services/api';

const TravelPackages = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      const response = await api.get('/packages');
      setPackages(response.data);
    } catch (error) {
      console.error('Error fetching packages:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div style={{ textAlign: 'center', padding: '100px' }}><Spin size="large" /></div>;

  return (
    <div className="animate-fade-in">
      <h1 style={{ marginBottom: '2rem' }}>Exclusive Travel Packages</h1>
      {packages.length > 0 ? (
        <Row gutter={[24, 24]}>
          {packages.map(pkg => (
            <Col span={8} key={pkg.id}>
              <Card 
                className="glass-card"
                hoverable
                cover={<div style={{ height: 200, background: 'linear-gradient(45deg, #4f46e5, #818cf8)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '1.5rem', fontWeight: 800 }}>{pkg.packageName}</div>}
                actions={[<Button type="primary" icon={<ShoppingCartOutlined />}>Book Now</Button>]}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <span style={{ fontSize: '1.25rem', fontWeight: 700, color: '#10b981' }}>${pkg.price}</span>
                  <Tag color="purple">Package</Tag>
                </div>
                <p className="text-secondary">{pkg.description}</p>
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        <Empty description={<span style={{ color: '#fff' }}>No Data</span>} />
      )}
    </div>
  );
};

export default TravelPackages;
