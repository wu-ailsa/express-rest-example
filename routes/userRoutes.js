const express = require('express');
const router = express.Router();
const users = require("../data/users");

//--------------------   USER ROUTES  ------------------------//
//INDEX - GET - getting all the users
router.get("/", (req, res) => {
    res.json(users); 
})

//CREATE - POST - create a user
router

    .post("/", (req, res) => {
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
router.get("/:id", (req, res, next) => {
    //find the user id
    const user = users.find((u) => u.id == req.params.id);
  
    console.log(user);
    //if the user exists display the json data
    if (user) res.json(user);
    else next();
  });
  

//UPDATE - PUT/PATCH - update a user\
router.patch("/", (req, res, next) => {
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
router.delete("/:id", (req, res, next) => {
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
router.get('/',(req, res) => {
    res.json(posts);
})

//CREATE - POST - add a new post to the database

router.post("/", (req, res) => {
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
router.get('/:id',(req,res,next)=>{
    const post = posts.find((p)=> p.id == req.params.id)

    if(post) res.json(post)
    else next()
})


//UPDATE - PUT/PATCH - update a particular post
router.patch("/:id", (req, res, next) => {
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
router.delete("/:id", (req, res, next) => {
    const post = posts.find((p, i) => {
      if (p.id == req.params.id) {
        posts.splice(i, 1);
        return true;
      }
    });
  
    if (post) res.json(post);
    else next();
  });




module.exports = router;