import React from "react";
import axios from "axios";
import "../navbar.css";

function OrderTableView({ order, key }) {
  console.log(order);

  const deleteOrder = (id) => {
    axios.delete(`/admin/delete/order/${id}`).then((res) => console.log(res));
  };
  return (
    <div style={{ margin: "20px" }}>
      <table className="table table-striped">
        <tbody>
          <tr>
            <td className="col-2">{order._id}</td>
            <td className="col-2">{order.vendor}</td>
            <td className="col-2">{order.name}</td>
            <td className="col-2">{order.total}</td>
            <td className="col-2">
              {order.cart !== undefined
                ? order.cart.map((item) => {
                    return (
                      <div style={{ display: "inline" }}>
                        <ul>
                          <li>{item.name}</li>
                          <li>{item.price}</li>
                        </ul>
                      </div>
                    );
                  })
                : null}
            </td>
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
                      deleteOrder(order._id);
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

export default OrderTableView;
