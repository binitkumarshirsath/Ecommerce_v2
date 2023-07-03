import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import { useNavigate } from "react-router-dom";

export default function Spinner() {
  const navigate = useNavigate();
  const [count, setCount] = useState(3);
  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevData) => --prevData);
      if (count <= 0) {
        navigate("/");
      }
      return clearInterval(interval);
    }, 1000);
  }, [count]);

  return (
    <Layout>
      <div className="d-flex flex-column align-items-center justify-content-center vh-100 vw-100">
        <h2 className="font-weight-bold">REDIRECTING YOU IN {count} SECONDS</h2>
        <div className="spinner-grow text-danger" role="status">
          <span className="sr-only"></span>
        </div>
      </div>
    </Layout>
  );
}
