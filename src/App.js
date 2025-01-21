import { useState, useEffect } from 'react';
import './App.css';
import Header from './components/header/Header';
import SportForm from './components/sportForm/SportForm';
import SportsList from './components/sportsList/SportsList';

function App() {

    const [loggedIn, setLoggedIn] = useState(false);
    const [saved, setSaved] = useState(false);
    const [sportsList, setSportsList] = useState([]);
    const [isFetching, setIsFetching] = useState(true);

    useEffect(() => {
        const getData = async () => {
            const url = "http://localhost:8080/sports";
            try {
              const response = await fetch(url);
              if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
              }
              const json = await response.json();
              setSportsList(json);
              setIsFetching(false);
            } catch (error) {
              console.error(error.message);
            }
          }
        getData();  
        }, []);

    const handleLogin = () => {
        document.cookie = "loggedIn=true; expires=Fri, 31 Dec 9999 23:59:59 GMT; SameSite=None; Secure";
        setLoggedIn(true);
    }

    const handleLogout = () => {
        document.cookie = "loggedIn=false; expires=Fri, 31 Dec 9999 23:59:59 GMT; SameSite=None; Secure";
        setLoggedIn(false);
    }

    const handleSave = () => {
        setSaved(!saved)
    }

    const handleSportListUpdate = (list) => {
        setSportsList(list);
    }    
    
  return (
    <div className="App">
        <Header loggedIn={loggedIn} handleLogin={handleLogin} handleLogout={handleLogout}/>
        <div className='page-wrapper'>
            <SportForm handleSave={handleSave} sportsList={sportsList} handleSportListUpdate={handleSportListUpdate} loggedIn={loggedIn}/>
            <div className='line'></div>
            <SportsList loggedIn={loggedIn} saved={saved} sportsList={sportsList} handleSportListUpdate={handleSportListUpdate} isFetching={isFetching}/>
        </div>
    </div>
  );
}

export default App;
