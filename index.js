const express = require("express");
const app = express();
const mysql = require('mysql');
var cors = require('cors')
const importData = require("./data.json");
const { send } = require("process");
const Token = "OnlyRay121294"
let port = process.env.PORT || 3001;
require('dotenv').config()
app.use(cors({ origin: 'https://62ae23dad39be736fdd4919d--incredible-medovik-2ace61.netlify.app/' }));
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
    console.log("Connection to Database successful!" + Connection.database);
});



app.get("/", (req, res) => {
    res.send("Hello world")
})

app.get(`/api`, (req, res) => {
    Connection.query("SELECT * FROM UsersTest WHERE id='4'", function (err, result, fields) {
        if (err) throw err;
        exists = result.length
        console.log(result.length);
        if (result.length == false) {
            res.send("Error")
        }
        else {
            res.send(result)
        }

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
        res.send(result)
    });
})

function UpdateLikes(data, likes) {
    var sql = `UPDATE Posts SET likes = '${likes}' WHERE Postid = ${data.PostId};`;
    Connection.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Likes Updated")
    });
}


app.post("/api/Like", (req, res) => {
    data = req.body
    if (data.Action === "Like") {
        var sql = `UPDATE Posts SET LikedBy = 'Raygud' WHERE Postid = ${data.PostId};`;
        Connection.query(sql, function (err, result) {
            if (err) throw err;
            console.log("Liked");
            UpdateLikes(data, "1")
        });
    }
    if (data.Action === "Unlike") {
        var sql = `UPDATE Posts SET LikedBy = '' WHERE Postid = ${data.PostId}`;
        Connection.query(sql, function (err, result) {
            if (err) throw err;
            console.log("Unliked");
            UpdateLikes(data, "0")
        });
    }
})


app.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
})