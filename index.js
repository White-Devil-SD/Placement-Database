var express = require("express");
var mysql = require("mysql");
var bodyparser = require("body-parser");
var mysql = require("mysql");
var bodyparser = require("body-parser");
var app = express();
var urlencodedParser = bodyparser.urlencoded({ extended: false });

app.set("view engine", "ejs");
app.use("/assets", express.static(__dirname + "/assets"));


var connection = mysql.createConnection({

    host: "localhost",
    user: "root",
    password: "",
    database: "placement"
});
connection.connect(err => {
    if (err) throw err;
    console.log("connected");
});


app.get("/", (req, res) => res.render("index"));
app.get("/insert/booking", (req, res) => res.render("insertbooking"));
app.get("/insert/student", (req, res) => res.render("insertstudent"));
app.get("/insert/branch", (req, res) => res.render("insertbranch"));
app.get("/insert/company", (req, res) => res.render("insertcompany"));
app.get("/insert/placed", (req, res) => res.render("insertplaced"));
app.get("/success", (req, res) => res.render("error/success"));
app.get("/failure", (req, res) => res.render("error/failure"));
app.get("/delete/placed", (req, res) => res.render("deletion/DeletePlaced"));
app.get("/display", (req, res) => res.render("display/displayDetails"));
app.get("/update", (req, res) => res.render("update/updateStudent"));

app.post("/insert/booking", urlencodedParser, function(req, res) {
    var BId = req.body.bg_id;
    var SId = req.body.s_id;
    var Name = req.body.bg_name;
    var Phone = req.body.bg_phone;
    var sql =
        "Insert into booking VALUES ('" + BId + "','" + SId + "','" + Name + "','" + Phone + "')";

    connection.query(sql, (err, result) => {
        try {
            if (err) throw err;
            console.log("1 row inserted");
            res.redirect("/success");
        } catch (e) {
            res.redirect("/failure");
            console.log("error was thrown");
        }
    });
})

app.post("/insert/student", urlencodedParser, function(req, res) {
    var Id = req.body.s_id;
    var Name = req.body.s_name;
    var Father = req.body.s_father;
    var Mother = req.body.s_mother;
    var Sex = req.body.s_gender;
    var Branch = req.body.b_id;
    var DOB = req.body.s_dob;
    var Phone = req.body.s_phone;
    var SSLC = req.body.s_sslc;
    var PUC = req.body.s_puc;
    var Graduation = req.body.s_graduation;
    var Passing = req.body.s_pass;
    var sql = "INSERT INTO student VALUES('" + Id + "','" + Name + "','" + Father + "','" + Mother + "','" + Sex + "','" + Branch + "','" + DOB + "','" + Phone + "','" + SSLC + "','" + PUC + "','" + Graduation + "','" + Passing + "')"
    connection.query(sql, (err, result) => {
        try {
            if (err) throw err;
            console.log("1 row inserted");
            res.redirect("/success");
        } catch (e) {
            res.redirect("/failure");
            console.log("error was thrown");
        }
    });
});

app.post("/insert/branch", urlencodedParser, function(req, res) {
    var Id = req.body.b_id;
    var Name = req.body.b_name;
    var HOD = req.body.b_hod;
    var sql = "INSERT INTO branch VALUES('" + Id + "','" + Name + "','" + HOD + "')"
    connection.query(sql, (err, result) => {
        try {
            if (err) throw err;
            console.log("1 row inserted");
            res.redirect("/success");
        } catch (e) {
            res.redirect("/failure");
            console.log("error was thrown");
        }
    });
});

app.post("/insert/company", urlencodedParser, function(req, res) {
    var Id = req.body.c_id;
    var Name = req.body.c_name;
    var Location = req.body.c_location;
    var Type = req.body.c_type;
    var sql =
        "Insert into company VALUES ('" + Id + "','" + Name + "','" + Location + "','" + Type + "')";

    connection.query(sql, (err, result) => {
        try {
            if (err) throw err;
            console.log("1 row inserted");
            res.redirect("/success");
        } catch (e) {
            res.redirect("/failure");
            console.log("error was thrown");
        }
    });
})

app.post("/insert/placed", urlencodedParser, function(req, res) {
    var Id = req.body.pl_id;
    var StudentId = req.body.s_id;
    var BranchId = req.body.b_id;
    var CompanyId = req.body.c_id;
    var Package = req.body.pl_package;
    var Status = req.body.pl_status;
    var sql =
        "Insert into placed VALUES ('" + Id + "','" + StudentId + "','" + BranchId + "','" + CompanyId + "','" + Package + "','" + Status + "')";

    connection.query(sql, (err, result) => {
        try {
            if (err) throw err;
            console.log("1 row inserted");
            res.redirect("/success");
        } catch (e) {
            res.redirect("/failure");
            console.log("error was thrown");
        }
    });
})

app.post("/delete/placed", urlencodedParser, function(req, res) {
    var Id = req.body.s_id;
    var sql = "DELETE FROM `placed` WHERE `s_id`= '" + Id + "'";

    connection.query(sql, (err, result) => {
        try {
            if (err) throw err;
            console.log("1 row Deleted");
            res.redirect("/delete/placed");
        } catch (e) {
            res.redirect("/failure");
            console.log("error was thrown");
        }
    });
});


app.post("/display1", urlencodedParser, function(req, res) {
    var Name = req.body.bg_name;
    var sql =
        "";
    connection.query(sql, function(err, result, fields) {
        try {
            if (err) throw err;
            var Id = result[0].bg_id;
            var Phone = result[0].bg_phone;
            res.render("display/DisplayBooking", {
                Name: bg_name,
                Phone: bg_phone,
                Id: bg_id
            });
        } catch (e) {
            res.redirect("/failure");
            console.log("error was thrown");
        }
    });
});

app.post("/update1", urlencodedParser, function(req, res) {
    var Name = req.body.s_name;
    var Phone = req.body.s_phone;
    sql =
        "update student SET s_phone='" +
        Phone +
        "' WHERE s_name='" +
        Name +
        "'";
    connection.query(sql, function(err, result) {
        try {
            if (err) throw err;
            res.redirect("/update");
            console.log("data successfully updated");
        } catch (e) {
            res.redirect("/failure");
            console.log("error was thrown");
        }
    });
});

app.post("/update2", urlencodedParser, function(req, res) {
    var Name = req.body.b_name;
    var HOD = req.body.b_hod;
    sql =
        "update branch SET b_hod='" +
        HOD +
        "' WHERE b_name='" +
        Name +
        "'";
    connection.query(sql, function(err, result) {
        try {
            if (err) throw err;
            res.redirect("/success");
            console.log("data successfully updated");
        } catch (e) {
            res.redirect("/failure");
            console.log("error was thrown");
        }
    });
});
app.listen(9999, () => console.log("Listen to port 9999"));