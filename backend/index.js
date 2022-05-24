var express = require("express");
var app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
var connection = require('./database');
const { query } = require("express");
var varKosten = 0;
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));




app.get("/filme/get", function(req,res) {
    const sqlGet = "SELECT * FROM filme;"
    connection.query(sqlGet, (err, result) =>{
        res.send(result);
    });
});
app.post("/filme/insert", (req, res)=>{
    const filmName = req.body.filmName;
    const beschreibung = req.body.beschreibung;
    const schauspieler = req.body.schauspieler;
    const regie = req.body.regie;
    const genre = req.body.genre;
    const kosten = req.body.kosten;
    const sqlInsert = "INSERT INTO filme (filmname, beschreibung, schauspieler, regie, genre, kosten) VALUES (?,?,?,?,?,?);";
    connection.query(sqlInsert, [filmName, beschreibung, schauspieler, regie, genre, kosten], (err, result)=>{
        console.log(err);
    })
});
app.get("/kunden/get", function(req,res) {
    const sqlGet = "SELECT * FROM kunden;"
    connection.query(sqlGet, (err, result) =>{
        res.send(result);
    });
});
app.post("/kunden/insert", (req, res)=>{
    const vorname = req.body.vorname;
    const nachname = req.body.nachname;
    const strasse = req.body.strasse;
    const plz = req.body.plz;
    const stadt = req.body.stadt;
    const sqlInsert = "INSERT INTO kunden (vorname, nachname, strasse, plz, stadt) VALUES (?,?,?,?,?);";
    connection.query(sqlInsert, [vorname, nachname, strasse, plz, stadt], (err, result)=>{
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
    const filmnummer = req.body.filmnummer;

    get_kosten(ausleihen);

     function get_kosten(ausleihen){
        var sql = "SELECT kosten FROM filme WHERE filmnummer = ' " + filmnummer+" ' ";
    connection.query(sql, (err, res)=>{
         if(err)throw err;
            varKosten = JSON.parse(JSON.stringify(res[0].kosten));
            //console.log(varKosten);
            return varKosten;
      });
   //   console.log(varKosten);
      ausleihen();
    }

    function ausleihen(){
        const kundennummer = req.body.kundennummer;
        const ausleihdatum = req.body.ausleihdatum;
        const rueckgabedatum = req.body.rueckgabedatum;
        const ausleihdatum1 = new Date(req.body.ausleihdatum).valueOf();
        const rueckgabedatum1 = new Date(req.body.rueckgabedatum).valueOf();
        const diff = Math.abs(rueckgabedatum1-ausleihdatum1);
        const diffDays = Math.ceil(diff / (1000*60*60*24));
        const kosten = diffDays*varKosten;

    console.log(varKosten);
    console.log(diffDays);
    console.log(kosten);

    const sqlInsert = "INSERT INTO ausleihen (filmnummer, kundennummer, ausleihdatum, rueckgabedatum ,kosten) VALUES (?,?,?,?,?);";
    connection.query(sqlInsert, [filmnummer, kundennummer, ausleihdatum, rueckgabedatum ,kosten], (err, result)=>{
        console.log(err);
    });
   }
   
   
});

app.get("/suche/filmnummer", function(req,res) {
    const sucheMitFilmnummer = req.body.sucheMitFilmnummer;
    const sqlGet = "SELECT kunden.vorname, kunden.nachname, filme.filmname FROM filme INNER JOIN ausleihen ON filme.filmnummer=ausleihen.filmnummer INNER JOIN kunden ON kunden.kundennummer=ausleihen.kundennummer;";
    connection.query(sqlGet, (err, result) =>{
        res.send(result);
    });
});

app.get("/kosten/kunde", function(req,res) {
    const sqlGet = "SELECT ausleihen.kosten, kunden.vorname, kunden.nachname FROM ausleihen JOIN kunden ON kunden.kundennummer = ausleihen.kundennummer;";
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