const express = require("express");
const boeken = require("../boekenlijst");

const router = express.Router();

router.get("/", (req, res) => {
    return res.send(boeken);    
});

module.exports = router;