import React, {useState, useEffect} from "react";
import "./App.css";
import Axios from 'axios';

function App() {

  const [filmName, setFilmName] = useState("");
  const [beschreibung, setBeschreibung] = useState("");
  const [schauspieler, setSchauspieler] = useState("");
  const [regie, setRegie] = useState("");
  const [genre, setGenre] = useState("");
  const [kosten, setKosten] = useState("");
  const [filmListe, setFilmListe] = useState([])

  const [vorname, setVorName] = useState("");
  const [nachname, setNachname] = useState("");
  const [strasse, setStrasse] = useState("");
  const [plz, setPLZ] = useState("");
  const [stadt, setStadt] = useState("");
  const [kundenListe, setKundenListe] = useState([])


  const [ausleihdatum, setAusleihDatum] = useState("");
  const [rueckgabedatum, setRueckgabeDatum] = useState("");
  const [ausleihListe, setAusleihListe] = useState([]);

  const [filmnummer, setFilmnummer] = useState("");
  const [kundennummer, setKundennummer] = useState("");


  useEffect(()=>{
    Axios.get('http://localhost:3001/filme/get').then((response)=>{
      setFilmListe(response.data);
    });
  }, []);
  useEffect(()=>{
    Axios.get('http://localhost:3001/kunden/get').then((response)=>{
      setKundenListe(response.data);
    });
  }, []);
  useEffect(()=>{
    Axios.get('http://localhost:3001/ausleihen/get').then((response)=>{
      setAusleihListe(response.data);
    });
  }, []);
  return (
    <div className="Suche">

        
      

    </div>
  );
}

export default App;
