const express = require('express');
var bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json())

const blog = require("./routes/blog")
app.use("/blog",blog)

app.listen(6000, () => {
    console.log("server is listening 6000.........")
});