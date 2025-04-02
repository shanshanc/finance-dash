// src/components/Dashboard.jsx
import React from 'react';

const Dashboard = ({ children }) => {
    return (
      <div className="dashboard">
        <h1 className="text-primary py-8 text-4xl font-bold">Financial Dashboard</h1>
        <div className="container w-full my-0 mx-auto rounded-lg mb-7 shadow-[0_2px_10px_rgba(0,0,0,0.1)]">
            {children}
        </div>
      </div>
    );
};

export default Dashboard;