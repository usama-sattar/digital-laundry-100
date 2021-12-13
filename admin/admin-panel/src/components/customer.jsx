import React, { useState } from "react";
import { ProductConsumer } from "../context";
import CustomerTableView from "./tableview/customerTable";
import "./navbar.css";
import SearchField from "react-search-field";

function Customer() {
  return (
    <ProductConsumer>
      {(value) => {
        return (
          <div
            className={
              value.sideBar ? "customerContainer" : "customerContainer active"
            }
          >
            <h1>Customers</h1>
            <div
              style={{
                width: "90%",
                display: "flex",
                justifyContent: "flex-end",
                margin: "auto",
              }}
            >
              <SearchField
                placeholder="Search..."
                onEnter={(event) =>
                  value.searchItem(value.customers, event, "customer")
                }
                onSearchClick={(event) =>
                  value.searchItem(value.customers, event, "customer")
                }
              />
            </div>
            <table className="table table-striped" style={{ margin: "20px" }}>
              <thead>
                <tr>
                  <th className="col-3">#</th>
                  <th className="col-3">Name</th>
                  <th className="col-3">Phone</th>
                  <th className="col-3">Delete</th>
                </tr>
              </thead>
            </table>
            {value.searchCustomer.length > 0 ? (
              <div>
                <h2>Searched User</h2>
                {value.searchCustomer.map((item, index) => (
                  <CustomerTableView key={index} customer={item} />
                ))}
              </div>
            ) : null}
            <h2>All Customers</h2>
            {value.customers !== undefined
              ? value.customers.map((item, index) => (
                  <CustomerTableView key={index} customer={item} />
                ))
              : null}
          </div>
        );
      }}
    </ProductConsumer>
  );
}

export default Customer;
