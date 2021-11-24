const express = require("express");
const _ = require("lodash");
const mongoose = require("mongoose");

const app = new express();

const posts = [];

app.use(
    express.urlencoded({
        extended: true,
    })
);
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/blogDB");

const postSchema = {
    title: String,
    content: String,
};

const Post = mongoose.model("Blog", postSchema);
// const About = mongoose.model("About",post);
// const Contact = mongoose.model("Contact",post);

app.set("view engine", "ejs");

app.get("/", (req, res) => {
    Post.find({}, (err, posts) => {
        if (err) {
            console.log(err);
        } else {
            res.render("home", {
                listPost: posts,
            });
        }
    });
});

app.get("/about", (req, res) => {
    res.render("about");
});

app.get("/contact", (req, res) => {
    res.render("contact");
});

app.get("/compose", (req, res) => {
    res.render("compose");
});

app.post("/compose", (req, res) => {
    // const newPost = {
    //     title: req.body.newTitle,
    //     content: req.body.newContent,
    // };

    const newPost = new Post({
        title: req.body.newTitle,
        content: req.body.newContent,
    });
    newPost.save((err) => {
        if (!err) {res.redirect("/");}
    });
    
});

app.get("/posts/:postId", (req, res) => {
    const postId = req.params.postId;

    Post.findById(postId, (err, postFind) => {
        if (err) {
            console.log(err);
        } else {
            res.render("post", { post: postFind });
        }
    });
});

app.listen("3000", () => {
    console.log("Stating server at port 3000");
});
