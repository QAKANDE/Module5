const express = require("express")
const {writeFile} = require("fs-extra")
const studentRoute = require("index.js")
const path = require("path")
const router = express.Router()

router.post("/", async (req,res,next)=>{
    console.log(path.join(__dirname,"students"))
    res.send("ok")
})

module.exports = router