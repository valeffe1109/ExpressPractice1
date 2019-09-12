const express = require('express')
const fs = require('fs')

const router = express.Router()

router.get('/', (req,res) => {
    var buffer = fs.readFileSync('projects.json');
    var content = buffer.toString()

    res.send(content)
})

router.get('/:id',(req,res) => {
var buffer = fs.readFileSync('projects.json');
var content = buffer.toString()
var projectsDB = JSON.parse(content)
var project = projectsDB.find(x=> x.ID == req.params.id)
if(!project)
res.send('cannot find project')

else
res.send(project)


})

router.post('/',(request, response) => {

    var newproject = request.body;
    var buffer = fs.readFileSync('projects.json')
    var content = buffer.toString()
    var projectsDB = JSON.parse(content)

    newproject.ID = projectsDB.length+1;
    projectsDB.push(newproject)

    fs.writeFileSync('projects.json', JSON.stringify(projectsDB))
    response.send(projectsDB)
})


router.delete('/:id',(req,res)=>{
   var buffer = fs.readFyleSync('projects.json')
   var content = buffer.toString()
   var projectsDB = JSON.parse(content)
   var newDB = projectsDB.filter(x=>x.ID != req.params.id)
fs.writeFileSync('projects.json', JSON.stringify(newDB))
res.send(newDB)
})

router.put ('/:id',(req,res) =>{

    var buffer = fs.readFyleSync('projects.json')
    var content = buffer.toString()
    var projectsDB = JSON.parse(content)
    var newDB = projectsDB.filter(x=>x.ID != req.params.id) //Removing the previous ITEM 
    var project = req.body
    project.ID = req.params.id;
    newDB.push(project) //Aggiunge il nuovo ITEM 
    fs.writeFileSync('projects.json', JSON.stringify(newDB))
 res.send(newDB)

})

module.exports = router;
