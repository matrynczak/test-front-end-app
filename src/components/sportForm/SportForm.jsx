import React, { useState, useEffect } from "react";
import "./SportForm.css";
import CompetitionForm from "../competitionForm/CompetitionForm";
//import { fs } from 'fs';
import mock from '../../sports.json';

const SportForm = ({ sportsList, handleSportListUpdate, isLoggedIn }) => {
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [sportToSave, setSportToSave] = useState({});
  const [compFormData, setCompFormData] = useState({ competitions: [] });
  const [error, setError] = useState("");

  let sportObject = {
    name: name,
    id: id,
    active: isActive,
    competitions: compFormData.competitions,
  };

  const sports = JSON.parse(localStorage.getItem('sports'));

  useEffect(() => {
    setSportToSave(sportObject);
  }, [name, id, isActive, compFormData]);

  const isSportWithIdOnList = (listOfSports, sportId) => !!listOfSports.find(sport => sport.id === sportId);

  const saveSportInApi = async () => {
    //try {
    //  fetch(`http://localhost:8080/sports/${id}`, {
    //    method: "POST",
    //    headers: {
    //      "Content-Type": "application/json",
    //    },
    //    body: JSON.stringify(sportToSave),
    //  })
    //    .then((res) => res.json())
    //    .catch((error) => {
    //      console.log(error);
    //    });
    //} catch (e) {
    //  console.error("Error adding sport: ", e);
    //}

    sports.push(sportToSave);
    localStorage.setItem('sports', JSON.stringify(sports));
  };

  const handleUpdateSportList = () => {
    const updatedSportsList = [...sportsList, sportObject];

    handleSportListUpdate(updatedSportsList);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setError("");

    if (!name || !id) {
      setError("Fill in sport name and sport id.");
      return;
    }

    console.log("Form submitted with:", {
      name: name,
      id: id,
      isActive: isActive,
      competitions: compFormData.competitions,
    });
    if(isSportWithIdOnList(sports, id)) {
        setError(`Sport with id = ${id} is already in the list!`)
    } 
    else {
        saveSportInApi();
        handleUpdateSportList();
    }

    setName("");
    setId("");
    setIsActive("");
    setCompFormData({ competitions: [] });
  };

  const handleAddCompForm = (updatedComp) => {
    setCompFormData({
      ...compFormData,
      competitions: updatedComp,
    });
  };

  const handleAddComp = () => {
    setCompFormData({
      ...compFormData,
      competitions: [...compFormData.competitions, { name: "", id: "" }],
    });
  };

  const handleRemoveComp = (index) => {
    const updatedComp = compFormData.competitions.filter((_, i) => i !== index);

    setCompFormData({
      ...compFormData,
      competitions: updatedComp,
    });
  };

  const renderCompetitionsForm = () => {
    return compFormData.competitions.map((comp, index) => (
      <div className="competitions-form-wrapper">
        <CompetitionForm
          key={index}
          compFormData={compFormData}
          handleAddCompForm={handleAddCompForm}
          handleRemoveComp={handleRemoveComp}
          comp={comp}
          index={index}
        />
      </div>
    ));
  };

  return (
    <div className="sports-form-wrapper">
      <div className="sport-form-container">
        {!isLoggedIn ? (
          <div className="log-in-message">
            <span>Please log in to to add and remove competitions.</span>
          </div>
        ) : null}
        <form className={!isLoggedIn ? `not-allowed` : null} onSubmit={handleSubmit}>
          <h2>Sport</h2>
          <div className="input-wrapper">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="input-wrapper">
            <label htmlFor="id">Id</label>
            <input
              type="number"
              id="id"
              min='1'
              value={id}
              onChange={(e) => setId(e.target.value)}
            />
          </div>

          <div className="input-wrapper">
            <label htmlFor="isActive">Active?</label>
            <div className="is-active-input-wrapper">
            <input
              type="checkbox"
              id="isActive"
              value={isActive}
              onChange={() => setIsActive(!isActive)}
            />
            </div>
            
          </div>

          <h3>Competitions</h3>
          <button type="button" className="add-comp-button" onClick={handleAddComp}>
            +
          </button>
          {renderCompetitionsForm()}

          {error && <div className="error">{error}</div>}

          <div className="submit-wrapper">
            <button className="submit-button" type="submit">
              Add
            </button>
          </div>
          <hr></hr>
        </form>
      </div>
    </div>
  );
};

export default SportForm;
