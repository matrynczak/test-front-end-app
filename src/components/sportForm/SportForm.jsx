import React, { useState, useEffect } from 'react';
import './SportForm.css';
import CompetitionForm from '../competitionForm/CompetitionForm';

const SportForm = ({ handleSave, sportsList, handleSportListUpdate, loggedIn }) => {
  const [name, setName] = useState('');
  const [id, setId] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [sportToSave, setSportToSave] = useState({});
  const [compFormData, setCompFormData] = useState({competitions: []});

let sportObject = {
    "name": name,
    "id": id,
    "active": isActive,
    "competitions": compFormData.competitions
  }

  useEffect(() => {
    setSportToSave(sportObject);
  }, [name, id, isActive, compFormData]);

  const saveSportInApi = async () => {
    try {
        fetch(`http://localhost:8080/sports/${id}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
             body: JSON.stringify(sportToSave)
          })
            .then(res => res.json())
            .catch(error => {
             console.log(error)
            }) 
    } catch (e) {
      console.error("Error adding sport: ", e);
    }
  };

  const handleUpdateSportList = () => {
    const updatedSportsList = [...sportsList, sportObject];

    handleSportListUpdate(updatedSportsList);
    handleSave();
  }; 

  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    setError('');

    if (!name || !id) {
      setError('Fill in sport name and sport id.');
      return;
    }

    console.log('Form submitted with:', { name: name, id: id, isActive: isActive, competitions: compFormData.competitions });
    saveSportInApi();
    handleUpdateSportList();

    setName('');
    setId('');
    setIsActive('');
    setCompFormData({competitions: []})
  };

    const handleAddCompForm = (updatedComp) => {
        setCompFormData({
            ...compFormData,
            competitions: updatedComp
        })
    }

    const handleAddComp = () => {
        setCompFormData({
          ...compFormData,
          competitions: [...compFormData.competitions, { name: '', id: '' }] 
        });
      };

      const handleRemoveComp = (index) => {
        const updatedComp = compFormData.competitions.filter((_,i) => i !== index);

        setCompFormData({
            ...compFormData,
            competitions: updatedComp
        }
        );
      };  

  const renderCompetitionsForm = () => {
    return (
        compFormData.competitions.map((comp, index) => (
            <div className='competitions-form-wrapper'>
                <CompetitionForm compFormData={compFormData} handleAddCompForm={handleAddCompForm} handleRemoveComp={handleRemoveComp} comp={comp} index={index}/>
          </div> 
        ))
    )
  }

  return (
    <div className='sports-form-wrapper'>
        <div className='sport-form-container'>
           {!loggedIn ?  <div className='log-in-message'>
            <span>Please log in to to add and remove competitions.</span>
        </div> : null }
      <form className={!loggedIn ? `not-allowed` : null } onSubmit={handleSubmit}>
        <h2>Sport</h2>
        <div className='input-wrapper'>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className='input-wrapper'>
          <label htmlFor="id">Id</label>
          <input
            type="text"
            id="id"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
        </div>

        <div className='input-wrapper'>
          <label htmlFor="isActive">Active?</label>
          <input
            type="checkbox"
            id="isActive"
            value={isActive}
            onChange={() => setIsActive(!isActive)}
          />
        </div>

        <h3>Competitions</h3>
        <button type="button" className='add-comp-button' onClick={handleAddComp}>+</button>
        {renderCompetitionsForm()}
        
        {error && <div className="error">{error}</div>}

        <div className='submit-wrapper'>
          <button className="submit-button" type="submit">Submit</button>
        </div>
        <hr></hr>
      </form>
    </div>
    </div>
    
  );
}

export default SportForm;