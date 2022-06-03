import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Home() {
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {}, [user]);
  return (
    <div className="max-w-7xl mx-auto my-3 px-3">
      <div className="flex flex-col justify-center items-center gap-3">
        <p className="text-3xl font-semibold">Welcome Home</p>
        {user ? (
          <p className="text-xl font-medium">Name: {user.name}</p>
        ) : (
          <div className="flex gap-3">
            <Link
              to="/login"
              className="px-3 py-2 border-2 border-gray-500 rounded-md hover:bg-orange-500 hover:text-white"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="px-3 py-2 border-2 border-gray-500 rounded-md hover:bg-orange-500 hover:text-white"
            >
              Register
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
