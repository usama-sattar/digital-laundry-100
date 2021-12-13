import React, { useEffect, useState } from "react";
import {
  Inject,
  ScheduleComponent,
  Day,
  Week,
  WorkWeek,
  Month,
  Agenda,
} from "@syncfusion/ej2-react-schedule";
import axios from "axios";
function Dashboard(props) {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    axios.get("/admin/count").then((res) => setUsers(res.data));
  }, []);
  return (
    <div style={{ marginLeft: "260px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          flexWrap: "wrap",
          marginTop: 20,
        }}
      >
        <div
          style={{
            backgroundColor: "#00688B",
            height: "100px",
            width: "200px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <h4 style={{ color: "white" }}>Customers</h4>
          <h6 style={{ color: "white" }}>
            {users.length > 0 ? users[0].count : null}
          </h6>
        </div>
        <div
          style={{
            backgroundColor: "#CD3700",
            height: "100px",
            width: "200px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <h4 style={{ color: "white" }}>Vendors</h4>
          <h6 style={{ color: "white" }}>
            {users.length > 0 ? users[1].count : null}
          </h6>
        </div>
        <div
          style={{
            backgroundColor: "#FF6103",
            height: "100px",
            width: "200px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <h4 style={{ color: "white" }}>Riders</h4>
          <h6 style={{ color: "white" }}>
            {users.length > 0 ? users[2].count : null}
          </h6>
        </div>
      </div>
      <div style={{ marginTop: 20 }}>
        <ScheduleComponent currentView="Month">
          <Inject services={[Day, Day, Week, WorkWeek, Month, Agenda]} />
        </ScheduleComponent>
      </div>
    </div>
  );
}
export default Dashboard;
