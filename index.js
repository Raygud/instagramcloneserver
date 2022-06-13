const express = require("express");
const app = express();
const mysql = require('mysql');
var cors = require('cors')
const importData = require("./data.json")
let port = process.env.PORT || 3001;
require('dotenv').config()
app.use(cors())
app.use(express.json({ limit: "1mb" }));

DataBaseResult = []



//Login credentials for database
let Connection = mysql.createConnection({
    host: "mysql67.unoeuro.com",
    port: "3306",
    user: "runigud_com",
    password: "b6tD2chEf4RmyHaBxdnz",
    database: "runigud_com_db"
});

//Connect too external database
Connection.connect(function (err) {
    if (err) throw err;
    console.log("Connection to Database successful!!" + Connection.database);
});

app.get("/", (req, res) => {
    res.send("Hello world")
})

app.get("/api", (req, res) => {
    Connection.query("SELECT * FROM Dataset", function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        res.send(result)
    });
})

app.get("/api/characters", (req, res) => {
    Connection.query("SELECT * FROM characters", function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        res.send(result)
    });
})

app.get("/api/Posts", (req, res) => {
    Connection.query("SELECT * FROM Posts", function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        res.send(result)
    });
})


app.get("/players", (req, res) => {
    setTimeout(function () { res.send(importData) }, 5000);

})

app.post("/api/Post", (req, res) => {
    console.log("Connected!");
    data = req.body
    console.log(data)
    var sql = `INSERT INTO Posts (name, profilePicture, likes, timeStamp, description, comments, image, LikedBy) VALUES ('${data.Name}','${data.ProfilePicture}','${data.Likes}','${data.Time}','${data.Description}','${data.Comments}','${data.image}','${data.Liked}');`;
    Connection.query(sql, function (err, result) {
        if (err) throw err;
        console.log("1 record inserted");

    });
})

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
})