const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');


const studentsRouter = require('./services/students')
const projectsRouter = require('./services/projects')
const reviewsRouter = require('./services/reviews')

const server = express();


server.use(cors())
server.use(bodyParser.json())

server.use('/students', studentsRouter);
server.use('/projects', projectsRouter);
server.use('/reviews',  reviewsRouter);




server.listen(3000,() => {
    console.log('Server is running')
})
