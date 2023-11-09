const express = require ('express');
const app = express();
const port = 3000

//const users = require("./data/users");
const users = require('./routes/userRoutes')
// const posts = require('./data/posts')
const posts = require ('./routes/postRoutes')

const bodyParser = require('body-parser')

//body parser middleware
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json({extended:true}))
app.use('/api/users', users)
app.use('/api/posts',posts)

//home routes
app.get('/', (req, res) => {
    res.send('Home Page')
})

//--------------------   USER ROUTES  ------------------------//
//INDEX - GET - getting all the users
app.get("/", (req, res) => {
    res.json(users); 
})

//CREATE - POST - create a user
app.post("/", (req, res) => {
    if (req.body.name && req.body.username && req.body.email) {
      if (users.find((u) => u.username == req.body.username)) {
        res.json({ error: "Username Already Taken" });
        return;
      }
  
      const user = {
        id: users[users.length - 1].id + 1,
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
      };
  
      users.push(user);
      res.json(users[users.length - 1]);
    } else res.json({ error: "Insufficient Data" });
  });
  

//SHOW - GET - get one user
app.get("/api/users/:id", (req, res, next) => {
    //find the user id
    const user = users.find((u) => u.id == req.params.id);
  
    console.log(user);
    //if the user exists display the json data
    if (user) res.json(user);
    else next();
  });
  

//UPDATE - PUT/PATCH - update a user\
app.patch("/", (req, res, next) => {
    const user = users.find((u, i) => {
      if (u.id == req.params.id) {
        for (const key in req.body) {
          users[i][key] = req.body[key];
        }
        return true;
      }
    });
  
    if (user) res.json(user);
    else next();
  });

//DELETE - DELETE - delete a user from database
app.delete("/api/users/:id", (req, res, next) => {
    const user = users.find((u, i) => {
      if (u.id == req.params.id) {
        users.splice(i, 1);
        return true;
      }
    });
  
    if (user) res.json(user);
    else next();
  });

//-------------------------   POST ROUTES  ---------------------------//

//INDEX - GET - display all posts
app.get('/api/posts',(req, res) => {
    res.json(posts);
})

//CREATE - POST - add a new post to the database

app.post("/api/posts", (req, res) => {
    if (req.body.userId && req.body.title && req.body.content) {
      const post = {
        id: posts[posts.length - 1].id + 1,
        userId: req.body.userId,
        title: req.body.title,
        content: req.body.content,
      };
  
      posts.push(post);
      res.json(posts[posts.length - 1]);
    } else res.json({ error: "Insufficient Data" });
  });

//SHOW - GET - shows information of one post
app.get('/api/posts/:id',(req,res,next)=>{
    const post = posts.find((p)=> p.id == req.params.id)

    if(post) res.json(post)
    else next()
})


//UPDATE - PUT/PATCH - update a particular post
app.patch("/api/posts/:id", (req, res, next) => {
  const post = posts.find((p, i) => {
    if (p.id == req.params.id) {
      for (const key in req.body) {
        posts[i][key] = req.body[key];
      }
      return true;
    }
  });

  if (post) res.json(post);
  else next();
});

//DELETE - DELETE - delete a particular post
app.delete("/api/posts/:id", (req, res, next) => {
    const post = posts.find((p, i) => {
      if (p.id == req.params.id) {
        posts.splice(i, 1);
        return true;
      }
    });
  
    if (post) res.json(post);
    else next();
  });

//custom middleware - 404 not found
app.use((req,res)=>{
    res.status(404)
    res.json({error: "Resource not found"})
})

app.listen(port, ()=>{
    console.log(`Server is listening on ${port}`)
})