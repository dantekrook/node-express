// Create express app
var express = require("express")
var app = express()
var db = require("./database.js")
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Server port
var HTTP_PORT = 8000
// Start server
app.listen(HTTP_PORT, () => {
    console.log("Server running on port %PORT%".replace("%PORT%", HTTP_PORT))
});

app.use(express.static('public'))

app.get("/characters", (req, res, next) => {
    var sql = "select * from character"
    var params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json({
            "message": "success",
            "data": rows
        })
    });
});

app.get("/characterstv", (req, res, next) => {
    var sql = "SELECT character.name AS character, tv_show.name AS name FROM character INNER JOIN character_tv_show ON character.id = character_tv_show.character_id INNER JOIN tv_show ON character_tv_show.tv_show_id = tv_show.id;"
    var params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json({
            "message": "success",
            "data": rows
        })
    });
});

app.post("/add", (req, res, next) => {
    console.log(req.body.name);
    var sql = "insert into character (name) values('ioj3')"
    var params = []
    db.run(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json({
            "message": "success",
        })
    });
});

app.get("/delete/:id", (req, res, next) => {
    console.log(req.params.id);
    res.json({
        "message": "successfully deleted",
    })
});

app.post("/update", (req, res, next) => {
    console.log(req.params.id);
    res.json({
        "message": "successfully deleted",
    })
});
// Root endpoint
app.get("/", (req, res, next) => {
    res.json({ "message": "Ok" })
});

// Default response for any other request
app.use(function (req, res) {
    res.status(404);
});
