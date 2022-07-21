import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AppWrapper } from './components/userContext.js';
import { Layout } from './components/Layout';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AppWrapper>
    <Layout>
      <App />
    </Layout>
  </AppWrapper>
);