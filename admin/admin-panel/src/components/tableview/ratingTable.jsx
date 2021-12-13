import React from "react";
import axios from "axios";
import "../navbar.css";

function RatingTabelView({ rating, key }) {
  return (
    <div style={{ margin: "20px" }}>
      <table className="table table-striped">
        <tbody>
          <tr>
            <td className="col-4">{rating._id}</td>
            <td className="col-4">{rating.user}</td>
            <td className="col-4">{rating.rating}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default RatingTabelView;
