import React from "react";
import { ProductConsumer } from "../context";
import RiderTableView from "./tableview/riderTable";
import "./navbar.css";
import SearchField from "react-search-field";

function Rider() {
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
              <h1>Riders</h1>
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
                    value.searchItem(value.riders, event, "rider")
                  }
                  onSearchClick={(event) =>
                    value.searchItem(value.riders, event, "rider")
                  }
                />
              </div>
              <table className="table table-striped" style={{ margin: "20px" }}>
                <thead>
                  <tr>
                    <th className="col-2">#</th>
                    <th className="col-2">Name</th>
                    <th className="col-2">Phone</th>
                    <th className="col-2">CNIC</th>
                    <th className="col-2">License</th>
                    <th className="col-2">Delete</th>
                  </tr>
                </thead>
              </table>
              {value.searchRider.length > 0 ? (
                <div>
                  <h2>Searched Rider</h2>
                  {value.searchRider.map((item, index) => (
                    <RiderTableView key={index} rider={item} />
                  ))}
                </div>
              ) : null}
              <h2>All Riders</h2>
              {value.riders !== undefined
                ? value.riders.map((item, index) => (
                    <RiderTableView key={index} rider={item} />
                  ))
                : null}
            </div>
          );
        }}
      </ProductConsumer>
    </div>
  );
}

export default Rider;
