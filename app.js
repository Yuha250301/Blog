const express = require('express');
const _ = require('lodash');

const app = new express();

const posts = [];

app.use(express.urlencoded({
    extended: true
}));
app.use(express.static("public"));

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('home', {
        listPost: posts
    });
})

app.get('/about', (req, res) => {
    res.render('about');
})

app.get('/contact', (req, res) => {
    res.render('contact');
})

app.get('/compose', (req, res) => {
    res.render('compose');
})

app.post('/compose', (req, res) => {
    const newPost = {
        title: req.body.newTitle,
        content: req.body.newContent
    }
    posts.push(newPost);
    res.redirect('/');
})

app.get('/posts/:postId', (req, res) => {
    let postFind;
    const requestTitle = _.lowerCase(req.params.postId);

    for (let index = 0; index < posts.length; index++) {
        const element = _.lowerCase(posts[index].title);
        if (element === requestTitle){
            postFind = posts[index];        
            break;
        }
    }
    res.render('post',{post: postFind});
    
})

app.listen('3000', () => {
    console.log('Stating server at port 3000');
})