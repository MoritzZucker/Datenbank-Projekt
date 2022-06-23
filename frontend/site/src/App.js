import React, {useState, useEffect} from "react";
import "./App.css";
import Axios from 'axios';

function App() {

  const [filmName, setFilmName] = useState("");
  const [beschreibung, setBeschreibung] = useState("");
  const [schauspieler, setSchauspieler] = useState("");
  const [regie, setRegie] = useState("");
  const [genre, setGenre] = useState("");
  const [kategorieName, setkategorieName] = useState("");
  const [filmListe, setFilmListe] = useState([]);
  const [genreSchauspielerListe, setSchauspielerAction] = useState([]);


  const [vorname, setVorName] = useState("");
  const [nachname, setNachname] = useState("");
  const [email, setEmail] = useState("");
  const [plz, setPLZ] = useState("");
  const [stadt, setStadt] = useState("");
  const [strasse, setStrasse] = useState("");
  const [kundenListe, setKundenListe] = useState([]);



  const [ausleihDatum, setAusleihDatum] = useState("");
  const [rueckgabeDatum, setrueckgabeDatum] = useState("");
  const [ausleihListe, setAusleihListe] = useState([]);

  const [filmID, setfilmID] = useState("");
  const [kundenID, setkundenID] = useState("");

  const [gesamtListe, setGesamtListe] = useState([]);
  const [kundenKosten, setKundenKosten] = useState([]);





  useEffect(()=>{
    Axios.get('http://localhost:3001/filme/get').then((response)=>{
      setFilmListe(response.data);
    });
  }, []);
  const sendeFilm = () => {
    Axios.post('http://localhost:3001/filme/insert', {filmName: filmName, beschreibung: beschreibung, kategorieName: kategorieName, regie: regie}).then(()=>{
      alert("erfolgreich eingetragen");
    });
  }
  const sendeGenre = () => {
    Axios.post('http://localhost:3001/genre/insert', {genre: genre}).then(()=>{
      alert("erfolgreich eingetragen");
    });
  }
  const sendeSchauspieler = () => {
    Axios.post('http://localhost:3001/schauspieler/insert', {schauspieler:schauspieler}).then(()=>{
      alert("erfolgreich eingetragen");
    });
  }
  useEffect(()=>{
    Axios.get('http://localhost:3001/schauspieler/get').then((response)=>{
      setSchauspielerAction(response.data);
    });
  }, []);


  useEffect(()=>{
    Axios.get('http://localhost:3001/kunde/get').then((response)=>{
      setKundenListe(response.data);
    });
  }, []);
  const sendeKunde = () => {
    Axios.post('http://localhost:3001/kunde/insert', {vorname: vorname, nachname: nachname, email: email}).then(()=>{
      alert("erfolgreich eingetragen");
    });
  }
  const sendeKundenAdresse = () => {
    Axios.post('http://localhost:3001/kundenAdresse/insert', {plz: plz, stadt:stadt, strasse: strasse}).then(()=>{
      alert("erfolgreich eingetragen");
    });
  }

  useEffect(()=>{
    Axios.get('http://localhost:3001/ausleihen/get').then((response)=>{
      setAusleihListe(response.data);
    });
  }, []);
  const sendeAusleihen = () => {
    Axios.post('http://localhost:3001/ausleihen/insert', {filmID: filmID, kundenID: kundenID, ausleihDatum: ausleihDatum, rueckgabeDatum: rueckgabeDatum, kategorieName: kategorieName}).then(()=>{
      alert("erfolgreich eingetragen");
    });
  }

  useEffect(()=>{
    Axios.get('http://localhost:3001/suche/filmID').then((response)=>{
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
              <label>Regie:</label>
              <input type="text" name="regie" onChange = {(e)=>{
                setRegie(e.target.value);
              }}></input>
              <label>Kategorie:</label>
              <input type="text" name="kategorieName" onChange = {(e)=>{
                setkategorieName(e.target.value);
              }}></input>
             <label>Genre:</label>
              <input type="text" name="genre" onChange = {(e)=>{
                setGenre(e.target.value);
              }}></input>
              <label>schauspieler:</label>
              <input type="text" name="schauspieler" onChange = {(e)=>{
                setSchauspieler(e.target.value);
              }}></input>
              <button onClick={()=>{sendeFilm(); sendeGenre(); sendeSchauspieler();}}> Hinzufügen </button>

              <table>
                    <tr>
                    <th><h2>filmID</h2></th>
                    <th><h2>Film</h2></th>
                    </tr>
                    <tr>
                      
                    <th>{filmListe.map((val)=>{
                        return (
                            <h4>{val.filmID}</h4> 
                          );
                         })}
                    </th>
                    <th>
                    {filmListe.map((val)=>{
                        return (
                            <h4>{val.filmName} </h4> 
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
              <label>Email:</label>
              <input type="text" name="email" onChange = {(e)=>{
                setEmail(e.target.value);
              }}></input>
              <label>Strasse:</label>
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

              <button onClick={() => { sendeKunde(); sendeKundenAdresse();}}> Hinzufügen </button>

              <table>
                    <tr>
                    <th><h2>kundenID</h2></th>
                    <th><h2>Vorname</h2></th>
                    <th><h2>Nachname</h2></th>
                    <th><h2>Email</h2></th>
                    </tr>
                    <tr>
                      
                    <th>{kundenListe.map((val)=>{
                        return (
                            <h4>{val.kundenID}</h4> 
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
                    <th>
                    {kundenListe.map((val)=>{
                        return (
                            <h4>{val.email} </h4> 
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
              <label>filmID:</label>
              <input type="text" name="filmID" onChange = {(e)=>{
                setfilmID(e.target.value);
              }}></input>

              <label>kundenID:</label>
              <input type="text" name="kundenID" onChange = {(e)=>{
                setkundenID(e.target.value);
              }}></input>
              <label>Ausleihdatum:</label>
              <input type="date" name="ausleihDatum"  onChange = {(e)=>{
                setAusleihDatum(e.target.value);
              }}></input>
              <label>Rückgabedatum:</label>
              <input type="date" name="rueckgabeDatum"  onChange = {(e)=>{
                setrueckgabeDatum(e.target.value);
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
              <h1>Liste der Schauspieler von Actionfilmen:</h1>

<table className="tabelle">
             <tr>
             <th>{genreSchauspielerListe.map((val)=>{
                 return (
                     <h4>{val.schauspielerName}</h4> 
                   );
                  })}
             </th>

             </tr>
       </table>
    </div>
  );
}

export default App;