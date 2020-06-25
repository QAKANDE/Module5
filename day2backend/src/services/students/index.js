const express = require("express")
const fs = require("fs-extra")
const path = require("path")
const uniqid = require("uniqid")
const { writeFile } = require("fs")
const multer = require("multer")
const router = express.Router()
const studentsFilePath = path.join(__dirname,"students.json")
const studentReviewPath = path.join(__dirname,"review.json")
const imageFolderPath = ("public/img/studentImages")
const upload = multer({})
const readfile = (file) => {
    filepath = path.join(__dirname, file)
    const fileAsBuffer = fs.readFileSync(filepath)
    const fileAsJSON = JSON.parse(fileAsBuffer)
    return fileAsJSON
    console.log(fileAsJSON)
}

router.get('/',(req,res,next)=> {
    const students = readfile("students.json")
    res.send(students)
})

router.get('/:id',(req,res,next)=>{
    try{
        const studentsArray = readfile("students.json")
        const student = studentsArray.filter(student => student.id === req.params.id)
        let err = new Error()
        err.httpStatusCode= 404
        // err.httpStatusCode=401
        next(err)
        res.send(student)
    }
    catch(err){
        next(err)
    }
})
router.post("/",(request,res,next)=>{
    try{

        const newStudent = {...request.body , id:uniqid(),studentID:uniqid()}
        const studentsArray = readfile("students.json")
        studentsArray.push(newStudent)
        fs.writeFileSync(studentsFilePath,JSON.stringify(studentsArray))
        let err = new Error()
        err.httpStatusCode=401
        res.send(newStudent) 
    }
    catch(err){
        next(err)
    }
})
router.put('/:id',(request,res)=>{
    const studentsArray = readfile("students.json")
    const editStudent = studentsArray.filter(student=> student.id !== request.params.id)
    const student = request.body
    student.id = request.params.id
    editStudent.push(student)
    fs.writeFileSync(studentsFilePath,JSON.stringify(editStudent))
    res.send(editStudent)
})
router.delete('/:id',(request,res)=>{
    const studentsArray = readfile("students.json")
    const deleteStudent = studentsArray.filter(student=> student.id !== request.params.id)
    fs.writeFileSync(studentsFilePath,JSON.stringify(deleteStudent))
    res.send(deleteStudent)
})

router.post('/:id/review', async (req,res,next)=>{
    const newReview = {...req.body , date: new Date(), studentID:req.params.id}
    const studentsArray = readfile("review.json")
    studentsArray.push(newReview)
    await fs.writeFile(studentReviewPath,JSON.stringify(studentsArray))
    res.send(studentsArray)
})

router.post("/:id/image" , async (req,res,next)=>{
    const newPost = {...req.body, imageURL:"http://localhost:4000/"+imageFolderPath+ "/IMG-2355.JPG"}
    try {
        const studentsArray = readfile("students.json")
        studentsArray.push(newPost)
        await fs.writeFile(studentsFilePath,JSON.stringify(studentsArray))
} catch (error) {
    next(error)
}
res.send("Successful")
})
module.exports = router