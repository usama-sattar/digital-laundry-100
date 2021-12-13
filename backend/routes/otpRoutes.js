var express = require("express");
require('dotenv').config()
var router = express.Router();
const client = require("twilio")(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN);
const Customer = require("../models/customerModel");
const Vendor = require("../models/vendorModel");
const Rider = require("../models/riderModel");

router.post("/login/phone", (req, res) => {
  if (req.body.userType === "customer") {
    Customer.findOne({ phone: req.body.number }).then((user) => {
      if (!user) {
        console.log("not found")
        res.send({ message: "customer does not registered" });
      } else {
        console.log("found")
        client.verify
          .services(process.env.SERVICE_ID)
          .verifications.create({
            to: `+${req.body.number}`,
            channel: "sms",
          })
          .then((data) => {
            res.status(200).send(data);
          });
       }
    });
  } else if (req.body.userType === "vendor") {
    Vendor.findOne({ phone: req.body.number }).then((user) => {
      if (!user) {
        res.send({ message: "vendor does not registered" });
      } else {
        client.verify
          .services(process.env.SERVICE_ID)
          .verifications.create({
            to: `+${req.body.number}`,
            channel: "sms",
          })
          .then((data) => {
            res.status(200).send(data);
          });
      }
    });
  } else if (req.body.userType === "rider") {
    Rider.findOne({ phone: req.body.number }).then((user) => {
      if (!user) {
        res.send({ message: "rider does not registered" });
      } else {
        client.verify
          .services(process.env.SERVICE_ID)
          .verifications.create({
            to: `+${req.body.number}`,
            channel: "sms",
          })
          .then((data) => {
            res.status(200).send(data);
          });
      }
    });
  }
});

router.post("/login/code", (req, res) => {
  console.log('login called')
  client.verify
    .services(process.env.SERVICE_ID)
    .verificationChecks.create({
      to: `+${req.body.number}`,
      code: req.body.code,
    })
    .then((data) => {
      console.log("inside ")
      if (data.status === "approved") {
        if (req.body.userType === "customer") {
          Customer.findOne({ phone: req.body.number }).then((user) => {
            if(user){
              res.send(user)
            }
          })
          
        } 
        else if (req.body.userType === "vendor") {
          console.log("inside vendor")
          Vendor.findOne({ phone: req.body.number }).then((user) => {
            if(user){
              res.send(user)
            }
          })
          
        }
        else if (req.body.userType === "rider") {
          Rider.findOne({ phone: req.body.number }).then((user) => {
            if(user){
              res.send(user)
            }
          }) 
        }
        else {
        console.log("code did not match");
      }
    }});
});

router.post("/phone", (req, res, next) => {
  if (req.body.userType === "customer") {
    Customer.findOne({ phone: req.body.number }).then((user) => {
      if (user) {
        res.send({ message: "customer already registered" });
      } else {
        client.verify
          .services(process.env.SERVICE_ID)
          .verifications.create({
            to: `+${req.body.number}`,
            channel: "sms",
          })
          .then((data) => {
            res.status(200).send(data);
          });
      }
    });
  } else if (req.body.userType === "vendor") {
    Vendor.findOne({ phone: req.body.number }).then((user) => {
      if (user) {
        res.send({ message: "vendor already registered" });
      } else {
        client.verify
          .services(process.env.SERVICE_ID)
          .verifications.create({
            to: `+${req.body.number}`,
            channel: "sms",
          })
          .then((data) => {
            res.status(200).send(data);
          });
      }
    });
  } else if (req.body.userType === "rider") {
    Rider.findOne({ phone: req.body.number }).then((user) => {
      if (user) {
        res.send({ message: "rider already registered" });
      } else {
        client.verify
          .services(process.env.SERVICE_ID)
          .verifications.create({
            to: `+${req.body.number}`,
            channel: "sms",
          })
          .then((data) => {
            res.status(200).send(data);
          });
      }
    });
  }
});

router.post("/code", (req, res) => {
  client.verify
    .services(process.env.SERVICE_ID)
    .verificationChecks.create({
      to: `+${req.body.number}`,
      code: req.body.code,
    })
    .then((data) => {
      if (data.status === "approved") {
        if (req.body.userType === "customer") {
          const user = new Customer({
            name: req.body.name,
            phone: req.body.number,
          });
          user
            .save()
            .then((data) => {
              console.log("customer registered");
              res.send(data);
            })
            .catch((err) => console.log(err));
        } else if (req.body.userType === "vendor") {
          const user = new Vendor({
            name: req.body.name,
            phone: req.body.number,
            cnic: req.body.cnic,
          });
          user
            .save()
            .then((data) => {
              console.log("vendor registered");
              res.send(data);
            })
            .catch((err) => console.log(err));
        } else if (req.body.userType === "rider") {
          const user = new Rider({
            name: req.body.name,
            phone: req.body.number,
            cnic: req.body.cnic,
            license: req.body.license,
          });
          user
            .save()
            .then((data) => {
              console.log("rider registered");
              res.send(data);
            })
            .catch((err) => console.log(err));
        }
      } else {
        console.log("code did not match");
      }
    });
});

module.exports = router;
