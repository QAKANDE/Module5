const express = require("express")
const path = require("path")
const studentRoutes = require("./services/students")
const filesRoutes = require("./services/files")
const {NotFoundHandler,unauthorizedHandler} = require("./errorHandling")
const server = express()


const publicfilesFolderPath = path.join(__dirname,"../public")
server.use(express.static(publicfilesFolderPath))
server.use(express.json())


server.use("/students" , studentRoutes)
server.use("/files",filesRoutes)
server.use(NotFoundHandler)
server.listen(4000, () => {
    console.log("Server is running ")
})