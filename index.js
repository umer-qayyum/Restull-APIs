const express=require('express');
const app=express();
const path=require('path');
const {v4:uuidv4}=require('uuid');
var methodOverride = require('method-override')
app.use(express.urlencoded({extended:true}));
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")))
app.use(methodOverride('_method'))
let posts=[
    {
        id:uuidv4(),
        username:"Umer",
        content:"hello umer is here my coding is not so good"
    },
    {
        id:uuidv4(),
        username:"Ali bhai",
        content:"Hello I am Ali bhai and I am gym lover"
    },
    {
        id:uuidv4(),
        username:"Abubakar",
        content:"Hi, I'm Aboubakar and I'm architectural engineer"
    }
]
app.get(`/posts/:id`,(req,res)=>{
    let {id}=req.params;
    console.log(id);
    let post=posts.find((p)=>id==p.id)
    res.render('show.ejs',{post})
})
app.get("/posts/new",(req,res)=>{
    res.render("new.ejs");
})
app.post("/posts",(req,res)=>{
    let {username,content}=req.body;
    let id=uuidv4();
    posts.push({id, username,content});
    res.redirect("/posts");
})
app.patch('/posts/:id',(req,res)=>{
    let {id}=req.params;
    let newCotent=req.body.content;
    let post=posts.find((p)=>id==p.id);
    post.content=newCotent;
    res.redirect("/posts");
})
app.get("/posts/:id/edit",(req,res)=>{
    let {id}=req.params;
    let post=posts.find((p)=>id==p.id);
    res.render("edit.ejs",{post})
})
app.delete("/posts/:id",(req,res)=>{
    let {id}=req.params;
     posts=posts.filter((p)=>id!==p.id);
    res.redirect("/posts");
})
app.use("/posts",(req,res)=>{
    res.render("index.ejs",{posts});
})

const PORT=8080;
app.listen(PORT,()=>{
    console.log(`server is running at ${PORT}`)
})