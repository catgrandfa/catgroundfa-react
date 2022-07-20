import { PageContainer } from '@ant-design/pro-layout';
import React from 'react';

const Welcome: React.FC = () => {
  return (
    <PageContainer>
      <div style={{ textAlign: 'center', height: '100%' }}>
        <img
          className="home-page-logo"
          style={{ width: '40%', top: '30%', marginBottom: '30px' }}
        />
        <h1>您好，欢迎使用</h1>
      </div>
    </PageContainer>
  );
};

export default Welcome;
