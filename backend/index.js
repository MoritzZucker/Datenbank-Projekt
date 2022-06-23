var express = require("express");
var app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
var connection = require('./database');
const { query } = require("express");
var varKosten = 0;
var kategorie = "";
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));




app.get("/filme/get", function(req,res) {
    const sqlGet = "SELECT * FROM film;"
    connection.query(sqlGet, (err, result) =>{
        res.send(result);
    });
});
app.post("/filme/insert", (req, res)=>{
    const filmName = req.body.filmName;
    const beschreibung = req.body.beschreibung;
    const regie = req.body.regie;
    const kategorieName = req.body.kategorieName;
    const sqlInsert = "INSERT INTO film (filmName, beschreibung, regie, kategorieName) VALUES (?,?,?,?);";
    connection.query(sqlInsert, [filmName, beschreibung, regie, kategorieName], (err, result)=>{
        console.log(err);
    })

});
app.post("/genre/insert", (req, res)=>{
    const genre = req.body.genre;
    const sqlInsert = "INSERT INTO genre (genreName) VALUES (?);";
    connection.query(sqlInsert, [genre], (err, result)=>{
        console.log(err);
    })

});
app.post("/schauspieler/insert", (req, res)=>{
    const schauspieler = req.body.schauspieler;
    const sqlInsert = "INSERT INTO schauspieler (schauspielerName) VALUES (?);";
    connection.query(sqlInsert, [schauspieler], (err, result)=>{
        console.log(err);
    })

});
app.get("/schauspieler/get", function(req,res) {
    const sqlGet = "SELECT schauspielerName FROM schauspieler, genre WHERE schauspieler.filmID = genre.filmID AND genreName = 'Action' GROUP BY schauspielerName;"
    connection.query(sqlGet, (err, result) =>{
        res.send(result);
    });
});
app.get("/kunde/get", function(req,res) {
    const sqlGet = "SELECT * FROM kunde;"
    connection.query(sqlGet, (err, result) =>{
        res.send(result);
       // console.log(result);
    });
});
app.post("/kunde/insert", (req, res)=>{
    const vorname = req.body.vorname;
    const nachname = req.body.nachname;
    const email = req.body.email;

    const sqlInsert = "INSERT INTO kunde (vorname, nachname, email) VALUES (?,?,?);";   
    connection.query(sqlInsert, [vorname, nachname, email], (err, result)=>{
        console.log(err);
    })
});
app.post("/kundenAdresse/insert", (req, res)=>{
    const plz = req.body.plz;
    const strasse = req.body.strasse;
    const stadt = req.body.stadt;

    const sqlInsert = "INSERT INTO adresse (plz, strasse, stadt) VALUES (?,?,?);";   
    connection.query(sqlInsert, [plz, strasse, stadt], (err, result)=>{
        console.log(err);
    })
});
app.get("/ausleihen/get", function(req,res) {
    const sqlGet = "SELECT * FROM ausleihen;"
    connection.query(sqlGet, (err, result) =>{
        res.send(result);
    });
});
app.post("/ausleihen/insert", async function(req, res){
    var kategorieName = req.body.kategorieName;
    const filmID = req.body.filmID;

    get_kosten(ausleihen);

     function get_kosten(ausleihen){
        var sql = "SELECT kategorieName FROM film WHERE filmID = ' " + filmID + " ' ";

        connection.query(sql, (err, res)=>{
             if(err)throw err;
               kategorie = JSON.parse(JSON.stringify(res[0].kategorieName));
              // console.log(kategorieName);       
              getZahl(kategorie);
          });
         
   //   console.log(varKosten);
      ausleihen();
    }
    function getZahl(kategorie){
        var sql1 = "SELECT * FROM kategorie WHERE kategorieName = ' " + kategorie + " ';";
        console.log(kategorie);
        connection.query(sql1, kategorie, (error, result)=>{
          if(error)throw error;
         //varKosten = JSON.parse(JSON.stringify(res[0].preis));
          console.log(result);
          return varKosten;
         })
      }
    function ausleihen(){
        const kundenID = req.body.kundenID;
        const filmID = req.body.filmID;
        const ausleihDatum = req.body.ausleihDatum;
        const rueckgabeDatum = req.body.rueckgabeDatum;
        const ausleihDatum1 = new Date(req.body.ausleihDatum).valueOf();
        const rueckgabeDatum1 = new Date(req.body.rueckgabeDatum).valueOf();
        const diff = Math.abs(rueckgabeDatum1-ausleihDatum1);
        const diffDays = Math.ceil(diff / (1000*60*60*24));
        const kosten = diffDays*5;

    //console.log(varKosten);
    //console.log(diffDays);
    //console.log(kosten);

    const sqlInsert = "INSERT INTO ausleihen (filmID, kundenID, ausleihDatum, rueckgabeDatum, kosten) VALUES (?,?,?,?,?);";
    connection.query(sqlInsert, [filmID, kundenID, ausleihDatum, rueckgabeDatum, kosten], (err, result)=>{
       // console.log(err);
    });
   }
   
   
});

app.get("/suche/filmID", function(req,res) {
    const sucheMitfilmID = req.body.sucheMitfilmID;
    const sqlGet = "SELECT kunde.vorname, kunde.nachname, film.filmname FROM film INNER JOIN ausleihen ON film.filmID=ausleihen.filmID INNER JOIN kunde ON kunde.kundenID=ausleihen.kundenID;";
    connection.query(sqlGet, (err, result) =>{
        res.send(result);
    });
});

app.get("/kosten/kunde", function(req,res) {
    const sqlGet = "SELECT ausleihen.kosten, kunde.vorname, kunde.nachname FROM ausleihen JOIN kunde ON kunde.kundenID = ausleihen.kundenID;";
    connection.query(sqlGet, (err, result) =>{
        res.send(result);
    });
});


app.listen(3001, ()=>{
    console.log("running on port 3001");
    connection.connect(function(err){
        if(err) throw err;
        console.log('Database connected!');
    });
});