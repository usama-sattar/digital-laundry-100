module.exports = (io)=>{
    const express = require("express");
    const router = express.Router();
    const Booking = require("./models/bookModel");
    const RiderLocation = require("./models/riderLocationModel");
    router.get("/post", (req, res) => {
        io.on("connection", socket =>{
            console.log("user connected")  
        })
    })
    return router
}