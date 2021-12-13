const express = require("express");
const router = express.Router();
const AppRating = require('../models/appRating')

router.get("/allRatings", (req, res) => {
    AppRating.find()
      .then((rate) => res.json(rate))
      .catch((err) => console.log(err));
  });

  
module.exports = router;
