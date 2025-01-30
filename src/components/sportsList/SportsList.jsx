import "./SportsList.css";

const SportsList = ({
  isLoggedIn,
  sportsList,
  handleSportListUpdate,
  isFetching,
}) => {
  const removeSportInApi = async (id) => {
    //try {
    //  fetch(`http://localhost:8080/sports/${id}`, {
    //    method: "DELETE",
    //  })
    //    .then((res) => res.json())
    //    .catch((error) => {
    //      console.log(error);
    //    });
    //} catch (e) {
    //  console.error("Error removing sport: ", e);
    //}
    
    let sports = JSON.parse(localStorage.getItem('sports'));
    sports = sports.filter((sport) => sport.id !== id);
    localStorage.setItem('sports', JSON.stringify(sports));
  };

  const handleRemoveSport = (id) => {
    removeSportInApi(id);
    const updatedSportsList = sportsList.filter((sport) => sport.id !== id);

    handleSportListUpdate(updatedSportsList);
  };

  const renderCompetitions = (sport) => {
    return (
      <ul className="competitions-list">
        {sport.competitions.map((comp) => (
          <div className="single-competition-list-item">
            <span className="single-competition-list-label">
              Name
              <span>{comp.name}</span>
            </span>
            <span className="single-competition-list-label">
              Id
              <span>{comp.id}</span>
            </span>
          </div>
        ))}
      </ul>
    );
  };

  const renderSports = () => {
    return (
      <ul className="sports-list">
        {sportsList.map((sport) => (
          <div className="single-sport-list-item">
            <div className="sport-item-header">
              <span className="sport-item-name">{sport.name}</span>
              <button
                type="button"
                className={`delete-sport-button${!isLoggedIn ? ` not-allowed` : ''}`}
                onClick={() => handleRemoveSport(sport.id)}
              >
                X
              </button>
            </div>
            <div className="sport-item-content">
              <span className="sport-item-feat-row underline">
                Id <span></span>
                {sport.id}
              </span>
              <span className="sport-item-feat-row underline">
                Active <span></span>
                {sport.active.toString()}
              </span>
              <div className="comps-list-wrapper">
                {sport.competitions.length > 0 ? (
                  <h4>Competitions</h4>
                ) : (
                  <span className="no-comp-added-message">
                    No competitions added to sport
                  </span>
                )}
                {renderCompetitions(sport)}
              </div>
            </div>
          </div>
        ))}
      </ul>
    );
  };

  return (
    <div className="sports-list-wrapper">
      {isFetching && <p>Loading...</p>}
      {!isFetching && sportsList.length === 0 && <p>No sports on list...</p>}
      {sportsList.length > 0 && renderSports()}
    </div>
  );
};

export default SportsList;
