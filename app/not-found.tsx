// pages/404.tsx
import Link from 'next/link';
import React from 'react';
import Layout from './components/layout';

const Custom404 = () => {
  return (
    <Layout>
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <h1 style={{ fontSize: '3rem', color: '#ff0000' }}>404 - Page Not Found</h1>
        <p style={{ fontSize: '1.5rem' }}>Sorry, the page you are looking for does not exist.</p>
        <Link href="/">
            Go back home
        </Link>
      </div>
    </Layout>
  );
};

export default Custom404;