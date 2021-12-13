import React from "react";
import { ProductConsumer } from "../context";
import "./navbar.css";
import ShopTable from "./tableview/shopTable";
import SearchField from "react-search-field";

function Shop() {
  return (
    <ProductConsumer>
      {(value) => {
        return (
          <div
            className={
              value.sideBar ? "customerContainer" : "customerContainer active"
            }
          >
            <h1>Shops</h1>
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
                  value.searchItem(value.shops, event, "shop")
                }
                onSearchClick={(event) =>
                  value.searchItem(value.shops, event, "shop")
                }
              />
            </div>
            <table className="table table-striped" style={{ margin: "20px" }}>
              <thead>
                <tr>
                  <th className="col-3">vendor #</th>
                  <th className="col-3">Name</th>
                  <th className="col-3">Services</th>
                  <th className="col-3">Delete</th>
                </tr>
              </thead>
            </table>
            {value.searchShop.length > 0 ? (
              <div>
                <h2>Searched Shop</h2>
                {value.searchShop.map((item, index) => (
                  <ShopTable key={index} shop={item} />
                ))}
              </div>
            ) : null}
            <h2>All Shops</h2>
            {value.shops !== undefined
              ? value.shops.map((item, index) => (
                  <ShopTable key={index} shop={item} />
                ))
              : null}
          </div>
        );
      }}
    </ProductConsumer>
  );
}

export default Shop;
