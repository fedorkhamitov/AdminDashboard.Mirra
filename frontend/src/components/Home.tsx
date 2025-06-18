import React from "react";
import { Link } from "react-router-dom";

const Home: React.FC = () => (
  <div style={{
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "40px",
    height: "100vh"
  }}>
    <Link to="/login" style={{ textAlign: "center", textDecoration: "none" }}>
      <img src="../../public/login.svg" alt="Login" width={120} height={120} />
      <div style={{ marginTop: 12, fontSize: 18, color: "#333" }}>Login</div>
    </Link>
    <Link to="/dashboard" style={{ textAlign: "center", textDecoration: "none" }}>
      <img src="../../public/dashboard.svg" alt="Dashboard" width={120} height={120} />
      <div style={{ marginTop: 12, fontSize: 18, color: "#333" }}>Dashboard</div>
    </Link>
  </div>
);

export default Home;