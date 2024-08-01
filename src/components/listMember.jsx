import React from "react";
import "./global.css";
import { Layout } from "antd";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";

function MemberListComponent() {
  return (
    <div className="container mt-2">
    <Layout
      className="home"
      style={{
        background: "FFF",
        width: "100%",
        height: "auto",
        padding: "5px",
        borderRadius: "5px",
        boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
      }}
    >
      member List
    </Layout>
  </div>
  )
}

export default MemberListComponent