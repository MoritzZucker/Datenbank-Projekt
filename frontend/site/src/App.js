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

  const [gesamtListe, setGesamtListe] = useState([]);
  const [kundenKosten, setKundenKosten] = useState([]);





  useEffect(()=>{
    Axios.get('http://localhost:3001/filme/get').then((response)=>{
      setFilmListe(response.data);
    });
  }, []);
  const sendeFilm = () => {
    Axios.post('http://localhost:3001/filme/insert', {filmName: filmName, beschreibung: beschreibung, schauspieler: schauspieler, regie: regie, genre: genre, 
    kosten: kosten}).then(()=>{
      alert("erfolgreich eingetragen");
    });
  }


  useEffect(()=>{
    Axios.get('http://localhost:3001/kunden/get').then((response)=>{
      setKundenListe(response.data);
    });
  }, []);
  const sendeKunde = () => {
    Axios.post('http://localhost:3001/kunden/insert', {vorname: vorname, nachname: nachname, strasse: strasse, plz: plz, stadt:stadt}).then(()=>{
      alert("erfolgreich eingetragen");
    });
  }

  useEffect(()=>{
    Axios.get('http://localhost:3001/ausleihen/get').then((response)=>{
      setAusleihListe(response.data);
    });
  }, []);
  const sendeAusleihen = () => {
    Axios.post('http://localhost:3001/ausleihen/insert', {filmnummer: filmnummer, kundennummer: kundennummer, ausleihdatum: ausleihdatum, rueckgabedatum: rueckgabedatum}).then(()=>{
      alert("erfolgreich eingetragen");
    });
  }

  useEffect(()=>{
    Axios.get('http://localhost:3001/suche/filmnummer').then((response)=>{
      setGesamtListe(response.data);
    });
  }, []);

  useEffect(()=>{
    Axios.get('http://localhost:3001/kosten/kunde').then((response)=>{
      setKundenKosten(response.data);
    });
  }, []);



  return (
    <div className="App">
      <table className="tabelle">
        <tr>
          <th>
             <div className="film">
              <h1>Filme</h1>
              <label>Filmname:</label>
              <input type="text" name="filmName" onChange = {(e)=>{
                setFilmName(e.target.value);
              }}></input>
              <label>Beschreibung:</label>
              <input type="text" name="beschreibung" onChange = {(e)=>{
                setBeschreibung(e.target.value);
              }}></input>
              <label>Schauspieler:</label>
              <input type="text" name="schauspieler" onChange = {(e)=>{
                setSchauspieler(e.target.value);
              }}></input>
              <label>Regie:</label>
              <input type="text" name="regie" onChange = {(e)=>{
                setRegie(e.target.value);
              }}></input>
              <label>Genre:</label>
              <input type="text" name="genre" onChange = {(e)=>{
                setGenre(e.target.value);
              }}></input>
              <label>Kosten:</label>
              <input type="text" name="kosten" onChange = {(e)=>{
                setKosten(e.target.value);
              }}></input>
              <button onClick={sendeFilm}> Hinzufügen </button>

              <table>
                    <tr>
                    <th><h2>Filmnummer</h2></th>
                    <th><h2>Film</h2></th>
                    </tr>
                    <tr>
                      
                    <th>{filmListe.map((val)=>{
                        return (
                            <h4>{val.filmnummer}</h4> 
                          );
                         })}
                    </th>
                    <th>
                    {filmListe.map((val)=>{
                        return (
                            <h4>{val.filmname} </h4> 
                          );
                         })}
                    </th>
                    </tr>
              </table> 

           </div>

           
          </th>

          <th>
            <div className="kunde">
              <h1>Kunden</h1>
              <label>Vorname:</label>
              <input type="text" name="vorname" onChange = {(e)=>{
                setVorName(e.target.value);
              }}></input>
              <label>Nachname:</label>
              <input type="text" name="nachname" onChange = {(e)=>{
                setNachname(e.target.value);
              }}></input>
              <label>Straße:</label>
              <input type="text" name="strasse" onChange = {(e)=>{
                setStrasse(e.target.value);
              }}></input>
              <label>PLZ:</label>
              <input type="text" name="plz" onChange = {(e)=>{
                setPLZ(e.target.value);
              }}></input>
              <label>Stadt:</label>
              <input type="text" name="stadt" onChange = {(e)=>{
                setStadt(e.target.value);
              }}></input>
              <button onClick={sendeKunde}> Hinzufügen </button>

              <table>
                    <tr>
                    <th><h2>Kundennummer</h2></th>
                    <th><h2>Vorname</h2></th>
                    <th><h2>Nachname</h2></th>
                    </tr>
                    <tr>
                      
                    <th>{kundenListe.map((val)=>{
                        return (
                            <h4>{val.kundennummer}</h4> 
                          );
                         })}
                    </th>
                    <th>
                    {kundenListe.map((val)=>{
                        return (
                            <h4>{val.vorname} </h4> 
                          );
                         })}
                    </th>
                    <th>
                    {kundenListe.map((val)=>{
                        return (
                            <h4>{val.nachname} </h4> 
                          );
                         })}
                    </th>
                    </tr>
              </table>

            </div>
          </th>
          <th>
              <div className="ausleihen">
              <h1>Ausleihen</h1>
              <label>Filmnummer:</label>
              <input type="text" name="filmnummer" onChange = {(e)=>{
                setFilmnummer(e.target.value);
              }}></input>

              <label>Kundennummer:</label>
              <input type="text" name="kundennummer" onChange = {(e)=>{
                setKundennummer(e.target.value);
              }}></input>
              <label>Ausleihdatum:</label>
              <input type="date" name="ausleihdatum"  onChange = {(e)=>{
                setAusleihDatum(e.target.value);
              }}></input>
              <label>Rückgabedatum:</label>
              <input type="date" name="rueckgabedatum"  onChange = {(e)=>{
                setRueckgabeDatum(e.target.value);
              }}></input>

              <button onClick={sendeAusleihen}> Ausleihen </button>

              </div>
          </th>
        </tr>
      </table>

      <h1>Liste der Kunden mit Film:</h1>

       <table className="tabelle">
                    <tr>
                    <th><h2>Filmname</h2></th>
                    <th><h2>Kundenvorname</h2></th>
                    <th><h2>Kundennachname</h2></th>
                    </tr>
                    <tr>
                      
                    <th>{gesamtListe.map((val)=>{
                        return (
                            <h4>{val.filmname}</h4> 
                          );
                         })}
                    </th>
                    <th>
                    {gesamtListe.map((val)=>{
                        return (
                            <h4>{val.vorname} </h4> 
                          );
                         })}
                    </th>
                    <th>
                    {gesamtListe.map((val)=>{
                        return (
                            <h4>{val.nachname} </h4> 
                          );
                         })}
                    </th>
                    </tr>
              </table>


              <h1>Liste der Kunden Kosten:</h1>

       <table className="tabelle">
                    <tr>
                    <th><h2>Kundenvorname</h2></th>
                    <th><h2>Kundennachname</h2></th>
                    <th><h2>Kosten</h2></th>

                    </tr>
                    <tr>
                      
                    <th>{kundenKosten.map((val)=>{
                        return (
                            <h4>{val.vorname}</h4> 
                          );
                         })}
                    </th>
                    <th>
                    {kundenKosten.map((val)=>{
                        return (
                            <h4>{val.nachname} </h4> 
                          );
                         })}
                    </th>
                    <th>
                    {kundenKosten.map((val)=>{
                        return (
                            <h4>{val.kosten} </h4> 
                          );
                         })}
                    </th>
                    </tr>
              </table>

    </div>
  );
}

export default App;