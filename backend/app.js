const express = require('express')
const mongoose = require('mongoose')
const otpRoutes = require('./routes/otpRoutes')
const customerRoutes = require('./routes/customerRoutes')
const vendorRoutes = require('./routes/vendorRoutes')
const riderRoutes = require('./routes/riderRoutes')
const shopRoutes = require('./routes/shopRoutes')
const ratingRoutes = require('./routes/ratingRoutes')
const bookingRoutes = require('./routes/bookingRoutes')
const notificationRoutes = require('./routes/notification')
const adminRoutes = require('./routes/adminRoutes')
const conversationRoutes = require('./routes/conversationRoutes')
const app = express()
const server = require("http").createServer(app)
const io = require("socket.io")(server)

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const uri = 'mongodb+srv://usama:12345USAMAsattaR@digitallaundry.4ynkr.mongodb.net/digitalLaundry?retryWrites=true&w=majority'
mongoose.connect(uri, {
    useNewUrlParser:true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})
const connection = mongoose.connection
connection.once("open", async ()=>{
    await console.log("database established");
})

app.use('/booking', require('./routes/bookingRoutes')(io))
app.use('/app', ratingRoutes)
app.use('/verify', otpRoutes);
app.use('/customers',customerRoutes)
app.use('/vendors',vendorRoutes)
app.use('/riders',riderRoutes)
app.use('/shop',shopRoutes)
app.use('/notification', notificationRoutes)
app.use('/admin', adminRoutes)
app.use("/conversation", conversationRoutes)

const PORT = process.env.PORT || 5000;
server.listen(PORT, console.log(`server starting at ${PORT}`));

module.exports = app;

