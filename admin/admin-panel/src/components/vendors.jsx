import React from "react";
import { ProductConsumer } from "../context";
import VendorTableView from "./tableview/vendorTable";
import SearchField from "react-search-field";
import "./navbar.css";

function Vendor() {
  return (
    <div>
      <ProductConsumer>
        {(value) => {
          return (
            <div
              className={
                value.sideBar ? "customerContainer" : "customerContainer active"
              }
            >
              <h1>Vendors</h1>
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
                    value.searchItem(value.vendors, event, "vendor")
                  }
                  onSearchClick={(event) =>
                    value.searchItem(value.vendors, event, "vendor")
                  }
                />
              </div>
              <table className="table table-striped" style={{ margin: "20px" }}>
                <thead>
                  <tr>
                    <th className="col-2">#</th>
                    <th className="col-2">Name</th>
                    <th className="col-3">Phone</th>
                    <th className="col-3">CNIC</th>
                    <th className="col-2">Delete</th>
                  </tr>
                </thead>
              </table>
              {value.searchVendor.length > 0 ? (
                <div>
                  <h2>Searched Vendor</h2>
                  {value.searchVendor.map((item, index) => (
                    <VendorTableView key={index} vendor={item} />
                  ))}
                </div>
              ) : null}
              <h2>All Vendors</h2>
              {value.vendors !== undefined
                ? value.vendors.map((item, index) => (
                    <VendorTableView key={index} vendor={item} />
                  ))
                : null}
            </div>
          );
        }}
      </ProductConsumer>
    </div>
  );
}

export default Vendor;
