import React, { Component, useEffect, useState } from "react";
import {
  AreaChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Area,
  ResponsiveContainer,
  BarChart,
  Line,
  LineChart,
  Pie,
  PieChart,
  RadialBar,
  RadialBarChart,
  Legend,
} from "recharts";
import { ProductConsumer } from "../../context";
import axios from "axios";
export default function Charts() {
  const [users, setUsers] = useState([]);
  const [rating, setRating] = useState([]);
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    axios.get("/admin/count").then((res) => setUsers(res.data));
    axios.get("/admin/rating").then((res) => setRating(res.data));
    axios.get("/admin/order").then((res) => setOrders(res.data));
  }, []);
  return (
    <div>
      <div
        style={{
          width: "70%",
          margin: "auto",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <div>
            <h3>Active Users</h3>
            <ResponsiveContainer width={400} height={350}>
              <LineChart data={users} margin={{ top: 20 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="count"
                  stroke="#03071e"
                  isAnimationActive
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div>
            <h3>Last Ratings</h3>
            <ResponsiveContainer width={400} height={350}>
              <BarChart data={rating}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="createdAt"
                  stroke="#8884d8"
                  strokeWidt={"12px"}
                />
                <YAxis />
                <Tooltip />
                <Bar
                  dataKey="rating"
                  fill="#FFA500"
                  barSize={30}
                  isAnimationActive
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div>
            <h3>Users</h3>
            <ResponsiveContainer width={400} height={350}>
              <PieChart width={730} height={250}>
                <Pie
                  data={users}
                  dataKey="count"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={100}
                  fill="#219ebc"
                  label
                  isAnimationActive
                />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div>
            <h3>Last Orders</h3>
            <ResponsiveContainer width={350} height={350}>
              <RadialBarChart
                width={730}
                height={250}
                innerRadius="10%"
                outerRadius="80%"
                data={orders}
                startAngle={0}
                endAngle={270}
                fill="#d62828"
              >
                <RadialBar
                  minAngle={15}
                  label={{ fill: "#fff", position: "insideStart" }}
                  background
                  clockWise={true}
                  dataKey="total"
                />
                <Tooltip />
              </RadialBarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
