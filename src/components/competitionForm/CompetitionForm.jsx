import React from 'react';
import './CompetitionForm.css';

const CompetitionForm = ({compFormData, handleAddCompForm, handleRemoveComp, comp, index}) => {
    
    const handleCompChange = (e, index) => {
        const {name, value} = e.target;
        const updatedComp = [...compFormData.competitions];
        
        updatedComp[index] = {
            ...updatedComp[index],
            [name]: value
        };

        handleAddCompForm(updatedComp);
    }

    return (
        <div className='comp-form-single'>
            
            <div className='comp-inputs'>
            <div className='input-wrapper'>
          <label htmlFor="name">Comp Name</label>
          <input
            type="text"
            id="comp-name"
            name="name"
            value={comp.name}
            onChange={(e) => handleCompChange(e, index)}
          />
        </div>

        <div className='input-wrapper'>
          <label htmlFor="id">Comp Id</label>
          <input
            type="text"
            id="comp-id"
            name="id"
            value={comp.id}
            onChange={(e) => handleCompChange(e, index)}
          />
        </div>
            </div>
       
        <button className='remove-comp-button' type='button' onClick={() => handleRemoveComp(index)}>-</button>
        </div>
    )
  
}

export default CompetitionForm;