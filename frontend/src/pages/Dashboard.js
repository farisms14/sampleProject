import React from 'react';
import { useSelector } from 'react-redux';
import { Row, Col, Card, Statistic } from 'antd';
import { RocketOutlined, DollarOutlined, EnvironmentOutlined } from '@ant-design/icons';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);

  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Travel Expenses',
        data: [1200, 1900, 300, 500, 2000, 3000],
        borderColor: '#4f46e5',
        backgroundColor: 'rgba(79, 70, 229, 0.5)',
        tension: 0.4,
      },
    ],
  };

  return (
    <div className="animate-fade-in">
      <h1 style={{ marginBottom: '2rem' }}>Welcome back, {user?.username}!</h1>
      
      <Row gutter={[16, 16]}>
        <Col span={8}>
          <Card className="glass-card stat-card">
            <Statistic 
              title="Active Trips" 
              value={3} 
              prefix={<RocketOutlined />} 
              valueStyle={{ color: '#4f46e5' }}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card className="glass-card stat-card">
            <Statistic 
              title="Total Spent" 
              value={8500} 
              prefix={<DollarOutlined />} 
              suffix="$"
              valueStyle={{ color: '#10b981' }}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card className="glass-card stat-card">
            <Statistic 
              title="Destinations" 
              value={12} 
              prefix={<EnvironmentOutlined />} 
              valueStyle={{ color: '#f43f5e' }}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: '2rem' }}>
        <Col span={24}>
          <Card className="glass-card" title="Expense Analytics">
            <div style={{ height: '300px' }}>
              <Line data={data} options={{ maintainAspectRatio: false, scales: { y: { grid: { color: 'rgba(0,0,0,0.05)' } }, x: { grid: { display: false } } } }} />
            </div>
          </Card>
        </Col>
      </Row>
      
      <div style={{ marginTop: '2rem', padding: '1rem', background: 'rgba(244, 63, 94, 0.1)', borderRadius: '0.5rem', border: '1px solid var(--accent-color)' }}>
        <p style={{ margin: 0, color: 'var(--accent-color)', fontSize: '0.9rem' }}>
          <strong>Note:</strong> Travel costs, routes, and schedules are estimates and may vary due to real-world conditions.
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
