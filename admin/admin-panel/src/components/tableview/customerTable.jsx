import React from "react";
import axios from "axios";
import "../navbar.css";

function CustomerTabelView({ customer, key }) {
  const deleteCustomer = (id) => {
    axios
      .delete(`/admin/delete/customer/${id}`)
      .then((res) => console.log(res));
  };
  return (
    <div style={{ margin: "20px" }}>
      <table className="table table-striped">
        <tbody>
          <tr>
            <td className="col-3">{customer._id}</td>
            <td className="col-3">{customer.name}</td>
            <td className="col-3">{customer.phone}</td>
            <td className="col-3">
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
                      deleteCustomer(customer._id);
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

export default CustomerTabelView;
