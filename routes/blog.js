const express = require("express");
const blog = express();
const blogDB   = require("../model/blogDB")
var jwt = require('jsonwebtoken');

// 1 2
blog.post('/login_sign',(req,res) => {
    var updata = {
        Name: req.body.Name,
        Email: req.body.Email,
        Password: req.body.Password,
        SuperAdmin : req.body.SuperAdmin,
        Accessible_by_SuperAdmin : req.body.Accessible_by_SuperAdmin,
        Admin : req.body.Admin
    }
    var Name = updata.Name
    var Email = updata.Email
    var Password = updata.Password
    blogDB.login_sign(Name)
    .then((data) => {
        if(data.length ==0){
            blogDB.sign_in(updata)
            .then(() => {
                res.send('insert..........')
            })
        }else{blogDB.login(Email)
            .then((data)=>{
            if(data.length==0){
                res.send('worng Email')
            }else{blogDB.else_login(Password).then((data)=>{
                if(data.length==0){
                    res.send('wrong Password')
                }else{
                    let token = jwt.sign({"costomer":data},"zeba")
                        res.cookie(token)
                        res.send('loing successful')
                    }
                })
            }
        })
        .catch((err)=>{
            console.log(err);
        })
    }})
});

// 3
blog.post('/update/:ID', (req,res) => {
    var ID = req.params.ID
    blogDB.user_get(ID)
    .then((data) => {
    var user_ID = data[0]['ID']
    var updata =  {
        user_ID : user_ID,
        Title : req.body.Title,
        Content : req.body.Content,
        Author_Name : req.body.Author_Name,
        Image : req.body.Image,
        Date : new Date(),
        Approved : req.body.Approved
    }
    blogDB.Article(updata)
    .then(() => {
        res.send('insert.@..@..@..@.')
    })
    .catch((err)=>{
        console.log(err);
    })
    })
});

// 4
blog.get('/approve_articles',(req,res) => {
    blogDB.articles()
    .then((data) => {
        var list = []
        for(var i = 0; i < data.length; i++){
            var ID = data[i]['ID']
            var Title = data[i]['Title']
            var Content = data[i]['Content']
            var Author_Name = data[i]['Author_Name']
            var Image = data[i]['Image']
            var Date1 = data[i]['Date']
            var Approved = data[i]['Approved']
            if (Approved == "Yes"){
                var All_data = {
                    ID : ID,
                    Title : Title,
                    Content : Content,
                    Author_Name : Author_Name,
                    Image : Image,
                    Date : Date1,
                    updata_Date : new Date()
                }
                list.push(All_data)
                console.log(list)
            }
        }
        res.send(list)
    }).catch((err) => {
        res.send(err)
    })
});

// 5
blog.get('/get/:ID', (req,res) => {
    var ID = req.params.ID
    blogDB.getdata(ID)
    .then((data) => {
        var Approved = data[0]['Approved']
        if (Approved == "Yes"){
            var Author_Name = data[0]['Author_Name']
            blogDB.Article_get()
            .then((data) => {
                for(i = 0; i < data.length; i++){
                    var Accessible_by_SuperAdmin = data[i]['Accessible_by_SuperAdmin']
                    if (Accessible_by_SuperAdmin == "True"){
                        var SuperAdmin = data[i]['SuperAdmin']
                        var Admin = data[i]['Admin']
                    }
                }
                var order = {
                    SuperAdmin : SuperAdmin,
                    Admin : Admin,
                    Author_Name : Author_Name
                }
                res.send(order)
            })
        }
        else{ res.send('Approved Rejected')
        }
    }).catch((err) => {
        res.send(err)
    })
});

module.exports = blog