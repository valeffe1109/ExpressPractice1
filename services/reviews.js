const express = require('express')
const fs = require('fs')

const router = express.Router()

router.get('/', (req,res) => {
    var buffer = fs.readFileSync('reviews.json');
    var content = buffer.toString()

    res.send(content)
})

router.get('/:id',(req,res) => {
var buffer = fs.readFileSync('reviews.json');
var content = buffer.toString()
var reviewsDB = JSON.parse(content)
var review = reviewsDB.find(x=> x.ID == req.params.id)
if(!review)
res.send('cannot find review')

else
res.send(review)


})

router.get("/reviews/:id", (req, res) => {
    var buffer = fs.readFileSync("projects.json");
    var content = buffer.toString()
    var projects = JSON.parse(content)

    res.send(projects.filter(x => x.ProjectID == req.params.id))

})

router.post('/',(request, response) => {

    var newreview = request.body;
    var buffer = fs.readFileSync('reviews.json')
    var content = buffer.toString()
    var reviewsDB = JSON.parse(content)

    newreview.ID = reviewsDB.length+1;
    reviewsDB.push(newreview)

    fs.writeFileSync('reviews.json', JSON.stringify(reviewsDB))
    response.send(reviewsDB)
})


router.delete('/:id',(req,res)=>{
   var buffer = fs.readFyleSync('reviews.json')
   var content = buffer.toString()
   var reviewsDB = JSON.parse(content)
   var newDB = reviewsDB.filter(x=>x.ID != req.params.id)
fs.writeFileSync('reviews.json', JSON.stringify(newDB))
res.send(newDB)
})

router.put ('/:id',(req,res) =>{

    var buffer = fs.readFyleSync('reviews.json')
    var content = buffer.toString()
    var reviewsDB = JSON.parse(content)
    var newDB = reviewsDB.filter(x=>x.ID != req.params.id) //Removing the previous ITEM 
    var review = req.body
    review.ID = req.params.id;
    newDB.push(review) //Aggiunge il nuovo ITEM 
    fs.writeFileSync('reviews.json', JSON.stringify(newDB))
 res.send(newDB)

})

module.exports = router;
