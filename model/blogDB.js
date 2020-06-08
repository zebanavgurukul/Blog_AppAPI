const knex = require("../connection"); 

// 1 2
let sign_in = (updata) => {
    return knex('user').insert(updata)
};

let login_sign = (Name) => {
    return knex.select('*').from('user').havingIn('user.Name',Name)
};

let login = (Email) => {
    return knex.select('*').from('user').havingIn('user.Email',Email)
};

let else_login = (Password) => {
    return knex.select('*').from('user').havingIn('user.Password',Password)
};

// 3
let user_get = (ID) => {
    return knex.select('*').from('user').where('user.ID',ID)
};

// 3
let Article = (updata) => {
    return knex('Article').insert(updata)
};

// 4
let articles = () => {
    return knex.select('*').from('Article')
}

// 5
let getdata = (ID) => {
    return knex.select('*').from('Article').where('Article.ID',ID)
}

// 5
let Article_get = ()=>{
    return knex.select('*').from("user")
};

module.exports = {sign_in,login,else_login,login_sign,user_get,articles,Article,getdata,Article_get} 
