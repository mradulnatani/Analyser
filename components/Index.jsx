"use client";
import { useState, useEffect } from 'react';
import "./index.css";

const fetchUserData = async () => {
  const response = await fetch('/api/hi');
  return response.json();
};

export default function Home() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchUserData();
      setUserData(data);
    };

    loadData();
  }, []);

  return (
    <div className="dashboard">
      <h1 className="dashboard-title">Next Maintenance Predictor</h1>
     
      {userData ? (
        <div className="dashboard-grid">
          {userData.map((item, index) => (
            <div key={index} className="dashboard-section user-info">
              <h2 className="section-title">Asset Information</h2>
              <p className="info-item"><span>Name:</span> {item.name}</p>
              <p className="info-item"><span>Document:</span> {item.document}</p>
              <p className="info-item"><span>Last Maintenance:</span> {item.lastRenewalDate}</p>
              <p className="info-item"><span>Next Maintenance:</span> {item.nextRenewalDate}</p>
              <p className="info-item"><span>Time left:</span> {item.timeLeft}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="dashboard-section">
          <p className="no-data">Loading user data...</p>
        </div>
      )}
    </div>
  );
}
