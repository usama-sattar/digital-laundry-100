import React from "react";
import axios from "axios";
import "../navbar.css";

function ShopTable({ shop, key }) {
  const deleteShop = (id) => {
    console.log(id);
    axios.delete(`/admin/delete/shop/${id}`).then((res) => console.log(res));
  };

  return (
    <div style={{ padding: "5px", margin: "20px" }}>
      <table className="table table-striped">
        <tbody>
          <tr>
            <td className="col-3">{shop._id}</td>
            <td className="col-3">{shop.name}</td>
            <td className="col-3">
              {shop.services !== undefined
                ? shop.services.map((item) => {
                    return (
                      <div style={{ display: "inline" }}>
                        <ul>
                          <li>{item.title}</li>
                          <li>{item.price}</li>
                        </ul>
                      </div>
                    );
                  })
                : null}
            </td>
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
                      deleteShop(shop._id);
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

export default ShopTable;
