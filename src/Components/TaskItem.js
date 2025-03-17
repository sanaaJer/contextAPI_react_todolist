import React, { useState } from 'react';
import "bootstrap-icons/font/bootstrap-icons.css";
import { iconsColor, gray } from '../colors';
import { TasksContext } from '../Context/TasksContext';
import {  useContext } from 'react'


export default function CardTask({ id, title, description }) {

  //inline-style variables
  const cardSectionStyle={ display: 'flex',  boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', flexDirection: 'row', backgroundColor:'white', color: 'black', marginTop: '1em', borderRadius: '16px', padding: '10px'}
  const inputTitleStyleEdit={ width: '100%',fontSize: '1em',border: '1px solid #ccc',borderRadius: '4px',padding: '5px',height:'1em'}
  const descriptionStyle={color:gray,margin: 0,fontSize: '11px',overflow: 'auto', maxHeight:' calc(1em * 2)',}
  const checkbStyle={ transform: "scale(1.3)", cursor: "pointer" };
  const descripEditStyle={width: '100%', height: '25px',fontSize: '12px',padding: '10px',borderRadius: '4px',   border: '1px solid #ccc', marginTop: '5px',color:gray}
  const taskDivstyle={ flex: 1 }
  const buttonsIconStyle={ display: 'flex', alignItems: 'center', gap: '10px' }
  const iconStyle={ cursor: 'pointer', fontSize: '16px', color: iconsColor }

  // Get context state 
  const {dispatch}=useContext(TasksContext);
 
  // initialisation state variables
  const [isEditing, setIsEditing] = useState(false);// used to track mode(Edit mode,View Mode) selected by used
  const [editedTitle, setEditedTitle] = useState(title);// track edited title: text input
  const [editedDescription, setEditedDescription] = useState(description);// track edited description: text area
 

  // Handle Delete
  const handleDelete = () => {
    dispatch({type:'DELETETASK',payload:id}); // Dispatch delete action with task's Id
  };

  // Handle Edit Mode 
  const handleEdit = () => {
    setIsEditing(true); // Enable edit mode
  };

  // Handle Save Changes in Edit mode
  const handleSave = () => {
    setIsEditing(false); // Disable edit mode
    dispatch( {type: 'EDITTASK',
              payload:{id,taskEdit:{title: editedTitle, description: editedDescription}}
             });
  };


  
  return (
    <div style={cardSectionStyle}>
      
      {/* Task Card Content */}
      <div style={taskDivstyle}>
        {isEditing ? (
          // **Edit Mode (Show Inputs)
          <div>
            <input
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              style={inputTitleStyleEdit}
            />
            <textarea
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
              style={descripEditStyle}
              required/>
          </div>
        ) : (
          // **View Mode (Card view Task)
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            {/* Checkbox */}
            <input
              className='checkboxStyle'
              type="checkbox"
              name="task"
              style={checkbStyle}
              // checked={checkStatus}
              // onChange={handleChecked}
            />
            {/* Title and Description */}
            <div>
              <h3 class='titleTask' style={{ margin: 0 }}>{title}</h3>
              <p style={descriptionStyle}>{description}</p>
            </div>
          </div>
        )}
      </div>

      {/* Edit & Delete Icons */}
      <div style={buttonsIconStyle}>
        {isEditing ? (
          // Show Save Button icon in Edit mode
          <i className="bi bi-check-circle" onClick={handleSave} style={iconStyle}></i>
        ) : (
          // Edit Button icon in Task view mode
          <i className="bi bi-pencil-square" onClick={handleEdit} style={iconStyle}></i>
        )}

        {/* Delete Button icon */}
        <i className="bi bi-x-circle" onClick={handleDelete} style={iconStyle}></i>
      </div>
      
    </div>
  );
}
