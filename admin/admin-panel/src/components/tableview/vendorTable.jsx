import React from "react";
import axios from "axios";
import "../navbar.css";

function VendorTabelView({ vendor, key }) {
  const deleteVendor = (id) => {
    axios.delete(`/admin/delete/vendor/${id}`).then((res) => console.log(res));
  };
  return (
    <div style={{ padding: "5px", margin: "20px" }}>
      <table className="table table-striped">
        <tbody>
          <tr>
            <td className="col-2">{vendor._id}</td>
            <td className="col-2">{vendor.name}</td>
            <td className="col-3">{vendor.phone}</td>
            <td className="col-3">{vendor.cnic}</td>
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
                      deleteVendor(vendor._id);
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

export default VendorTabelView;
