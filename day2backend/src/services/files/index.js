const express = require("express")
const multer = require("multer")

const {join} = require("path")
const { writeFile } = require("fs-extra")
const imageFolderPath = join(__dirname,"../../../public/img/studentImages")

const router = express.Router()
const upload = multer({})
router.post("/:id/upload" , upload.single("picture") , async (req,res,next)=>{
    console.log(req.file.originalname)
    try {
   await  writeFile(join(imageFolderPath,req.file.originalname),req.file.buffer)
} catch (error) {
    next(error)
}
res.send("Successful")
})

// router.post("/:id/upload" , upload.array("picture",10) , async (req,res,next)=>{

//     console.log(req.file.originalname)
//     try {
//         arrayOfImages = req.files.map((file)=>{
//          writeFile(join(imageFolderPath, file.originalName),file.buffer)
//         })
//         console.log(file.originalName)
//         await Promise.all(arrayOfImages)
//         res.send("Successful")
//     } catch (error) {
//         next(error)
//     }
// })

module.exports = router