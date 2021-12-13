import React from "react";
import { ProductConsumer } from "../context";
import "./navbar.css";

function Complaint() {
  return (
    <ProductConsumer>
      {(value) => {
        return (
          <div
            className={
              value.sideBar ? "customerContainer" : "customerContainer active"
            }
          >
            <h1>Complaints</h1>
            <div style={{ padding: "10px", margin: "20px" }}></div>
          </div>
        );
      }}
    </ProductConsumer>
  );
}

export default Complaint;
