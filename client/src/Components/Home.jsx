import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="max-w-7xl mx-auto my-3 px-3">
      <div className="flex gap-3">
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </div>
    </div>
  );
}

export default Home;
