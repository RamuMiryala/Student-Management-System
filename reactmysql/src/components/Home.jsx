import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../scss/Home.scss";
import { getRecentActivities } from "../services/api";

const Home = () => {
  const [recentActivities, setRecentActivities] = useState([]);

  useEffect(() => {
    fetchRecentActivities();
  }, []);

  const fetchRecentActivities = async () => {
    try {
      const response = await getRecentActivities();
      setRecentActivities(response.data);
    } catch (error) {
      console.error("Error fetching recent activities:", error);
    }
  };

  return (
    <div className="home">
      <header className="hero">
        <h2>Manage Students Efficiently</h2>
        <p>A simple, secure, and fast way to handle student data.</p>
        <Link to="/students">
          <button className="cta-button">Get Started</button>
        </Link>
      </header>

      <section className="features">
        <div className="feature-card">
          <h3>Student Records</h3>
          <p>Easily manage student details and performance.</p>
        </div>
        <div className="feature-card">
          <h3>Faculty Management</h3>
          <p>Assign and track faculty members seamlessly.</p>
        </div>
        <div className="feature-card">
          <h3>Data Security</h3>
          <p>Ensure secure and efficient data management.</p>
        </div>
      </section>

      <section className="recent-activity">
        <h2>Recent Student Activity</h2>
        <ul>
          {recentActivities.length > 0 ? (
            recentActivities.map((activity, index) => (
              <li key={index}> {activity}</li>
            ))
          ) : (
            <li>No recent activities found.</li>
          )}
        </ul>
      </section>
    </div>
  );
};

export default Home;
