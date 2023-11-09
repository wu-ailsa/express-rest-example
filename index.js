const express = require ('express');
const bodyParser = require('body-parser')
const app = express();
const port = 3000

//const users = require("./data/users");
// const posts = require('./data/posts')
const users = require('./routes/userRoutes')
const posts = require ('./routes/postRoutes')



//body parser middleware
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json({extended:true}))

//use Routes
app.use('/api/users', users)
app.use('/api/posts',posts)

//home routes
app.get('/', (req, res) => {
    res.send('Home Page')
})


//custom middleware - 404 not found
app.use((req,res)=>{
    res.status(404)
    res.json({error: "Resource not found"})
})

app.listen(port, ()=>{
    console.log(`Server is listening on ${port}`)
})