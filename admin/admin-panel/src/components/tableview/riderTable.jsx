import React from "react";
import axios from "axios";
import "../navbar.css";

function RiderTabelView({ rider, key }) {
  const deleteRider = (id) => {
    axios.delete(`/admin/delete/rider/${id}`).then((res) => console.log(res));
  };
  return (
    <div style={{ margin: "20px" }}>
      <table className="table table-striped">
        <tbody>
          <tr>
            <td className="col-2">{rider._id}</td>
            <td className="col-2">{rider.name}</td>
            <td className="col-2">{rider.phone}</td>
            <td className="col-2">{rider.cnic}</td>
            <td className="col-2">{rider.license}</td>
            <td className="col-2">
              <button type="button" className="btn btn-danger">
                <i
                  className="fas fa-trash"
                  style={{ color: "white", cursor: "pointer" }}
                  onClick={() => {
                    if (
                      window.confirm(
                        "Are you sure you wish to delete this item?"
                      )
                    )
                      deleteRider(rider._id);
                  }}
                ></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default RiderTabelView;
