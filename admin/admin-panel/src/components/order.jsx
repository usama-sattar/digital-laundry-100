import React from "react";
import { ProductConsumer } from "../context";
import "./navbar.css";
import OrderTableView from "./tableview/orderTable";

function Order() {
  return (
    <ProductConsumer>
      {(value) => {
        return (
          <div
            className={
              value.sideBar ? "customerContainer" : "customerContainer active"
            }
          >
            <h1>Orders</h1>
            <table className="table table-striped" style={{ margin: "20px" }}>
              <thead>
                <tr>
                  <th className="col-2">#</th>
                  <th className="col-2">Vendor</th>
                  <th className="col-2">Name</th>
                  <th className="col-2">Total</th>
                  <th className="col-2">Cart</th>
                  <th className="col-2">Delete</th>
                </tr>
              </thead>
            </table>
            {value.orders !== undefined
              ? value.orders.map((item, index) => (
                  <OrderTableView key={index} order={item} />
                ))
              : null}
          </div>
        );
      }}
    </ProductConsumer>
  );
}

export default Order;
