import React from 'react';
import { Alert } from 'antd';

const ErrorHandler = ({ error }) => {
  if (!error) return null;
  return (
    <div style={{ padding: '20px' }}>
      <Alert
        message="System Error"
        description={error}
        type="error"
        showIcon
      />
    </div>
  );
};

export default ErrorHandler;
