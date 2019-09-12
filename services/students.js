const express = require('express')
const fs = require('fs')

const router = express.Router()

router.get('/', (req,res) => {
    var buffer = fs.readFileSync('students.json');
    var content = buffer.toString()
    res.send(content)
})

router.get("/projects/:id", (req, res) => {
    var buffer = fs.readFileSync("projects.json");
    var content = buffer.toString()
    var projects = JSON.parse(content)

    res.send(projects.filter(x => x.StudentID == req.params.id))

})

router.get('/:id',(req,res) => {
var buffer = fs.readFileSync('students.json');
var content = buffer.toString()
var studentsDB = JSON.parse(content)
var student = studentsDB.find(x=> x.ID == req.params.id)
if(!student)
res.send('cannot find student')

else
res.send(student)


})

router.post('/',(request, response) => {

    var newstudent = request.body;
    var buffer = fs.readFileSync('students.json')
    var content = buffer.toString()
    var studentsDB = JSON.parse(content)

    newstudent.ID = studentsDB.length+1;
    studentsDB.push(newstudent)

    fs.writeFileSync('students.json', JSON.stringify(studentsDB))
    response.send(studentsDB)
})


router.delete('/:id',(req,res)=>{
   var buffer = fs.readFyleSync('students.json')
   var content = buffer.toString()
   var studentsDB = JSON.parse(content)
   var newDB = studentsDB.filter(x=>x.ID != req.params.id)
fs.writeFileSync('students.json', JSON.stringify(newDB))
res.send(newDB)
})

router.put ('/:id',(req,res) =>{

    var buffer = fs.readFyleSync('students.json')
    var content = buffer.toString()
    var studentsDB = JSON.parse(content)
    var newDB = studentsDB.filter(x=>x.ID != req.params.id) //Removing the previous ITEM 
    var student = req.body
    student.ID = req.params.id;
    newDB.push(student) //Aggiunge il nuovo ITEM 
    fs.writeFileSync('students.json', JSON.stringify(newDB))
 res.send(newDB)

})

module.exports = router;
