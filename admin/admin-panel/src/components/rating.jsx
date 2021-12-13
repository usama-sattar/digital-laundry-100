import React from "react";
import { ProductConsumer } from "../context";
import RatingTableView from "./tableview/ratingTable";
import "./navbar.css";

function Rating() {
  return (
    <ProductConsumer>
      {(value) => {
        return (
          <div
            className={
              value.sideBar ? "customerContainer" : "customerContainer active"
            }
          >
            <h1>App Rating</h1>
            <table className="table table-striped" style={{ margin: "20px" }}>
              <thead>
                <tr>
                  <th className="col-4">#</th>
                  <th className="col-4">user #</th>
                  <th className="col-4">Rating</th>
                </tr>
              </thead>
            </table>
            {value.ratings !== undefined
              ? value.ratings.map((item, index) => (
                  <RatingTableView key={index} rating={item} />
                ))
              : null}
          </div>
        );
      }}
    </ProductConsumer>
  );
}

export default Rating;
