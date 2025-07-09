const express=require("express");
const app=express();
const path=require("path");
let port = process.env.PORT || 7000;

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));

const {v4:uuidv4}=require('uuid');
const methodoverride=require("method-override");
app.use(methodoverride("_method"));

app.use(express.urlencoded({extended:true}));//the urlencoded data can be understood by express

let posts=[
    {
        id:uuidv4(),
        username:"RiyaKumari",
        content:"Suggest me books to crack JEE Advanced",
    },
    {
        id:uuidv4(),
        username:"RohanPandey",
        content:"Will AI take our jobs?",
    },
    {
        id:uuidv4(),
        username:"rahulkumar",
        content:"i got an internship!",
    }
];
app.get("/posts",(req,res)=>{//basic API created
    res.render("index.ejs",{posts});
})

app.get("/posts/new",(req,res)=>{
    res.render("new.ejs");
})

app.post("/posts",(req,res)=>{
    let {username,content}=req.body;
    let id=uuidv4();
    posts.push({id,username,content});
    res.redirect("/posts");
})

app.get("/posts/:id",(req,res)=>{
    let {id}=req.params;//to retrieve the id
    let post=posts.find((p)=>id==p.id);
    res.render("show.ejs",{post});
})

app.patch("/posts/:id",(req,res)=>{
    let {id}=req.params;
    let newcontent=req.body.content;
    let post=posts.find((p)=>id==p.id);
    post.content=newcontent;
    console.log(post);
    res.redirect("/posts");
})

app.get("/posts/:id/edit",(req,res)=>{
    let {id}=req.params;
    let post=posts.find((p)=>id===p.id);
    res.render("edit.ejs",{post});
})

app.delete("/posts/:id",(req,res)=>{
    let {id}=req.params;//extract id
    posts=posts.filter((p)=>id!==p.id);
    res.redirect("/posts");
})
app.listen(port,()=>{//server started
    console.log("Listening to port:7000");
})