const express = require ('express');
const app = express();
const port = 3000

const users = require('./data/users')
const posts = require('./data/posts')

const bodyParser = require('body-parser')

//body parser middleware
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json({extended:true}))

//home routes
app.get('/', (req, res) => {
    res.send('Home Page')
})

//--------------------   USER ROUTES  ------------------------//
//INDEX - GET - getting all the users
app.get("/api/users", (req, res) => {
    res.json(users); 
})

//CREATE - POST - create a user
app.post('/api/users', (req,res)=>{
    if(req.body.name && req.body.username && req.body.email) {
        if(user.find((u)=> u.username == req.body.username))
    }
})

//SHOW - GET - get one user
app.get("/api/users/:id", (req, res,next) => {
    //find the user id
    const user = users.find((u)=> u.id == req.params.id);

    console.log(user);
    //display the user in json
    if(user)res.json(user);
    else next()
})

//UPDATE - PUT/PATCH - update a user

//DELETE - DELETE - delete a user from database


//-------------------------   POST ROUTES  ---------------------------//

//INDEX - GET - display all posts
app.get('/api/posts',(req, res) => {
    res.json(posts);
})

//CREATE - POST - add a new post to database 
//SHOW - GET - shows information of one post
app.get('/api/posts/:id',(req,res,next)=>{
    const post = posts.find((p)=> p.id == req.params.id)

    if(post) res.json(post)
    else next()
})

//UPDATE - PUT/PATCH - update a particular post 

//DELETE - DELETE - delete a particular post from database

//custom middleware - 404 not found
app.use((req,res)=>{
    res.status(404)
    res.json({error: "Resource not found"})
})

app.listen(port, ()=>{
    console.log(`Server is listening on ${port}`)
})