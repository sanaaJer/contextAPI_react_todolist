import React, { useState } from 'react';
import { useContext } from 'react'
import { TasksContext } from '../Context/TasksContext';




export default function AddTask() {
  // Get context state 
  const {state,dispatch}=useContext(TasksContext);
  // Get Id from Context
  const idCount = state.idCount; 
  

  // Create refs state for input's form
  const [newTask, setNewTAsk] = useState({
    title: '',
    description: '',
    id:idCount,
    completed:false
  });


  // Handle submit Add task form
  const addTaskSubmit = (e) => {
      e.preventDefault();
      // Dispatch actions: (ADDTASK ,UPDATECOUNTID ) to context reducer
      dispatch({type:'ADDTASK',payload:newTask}); 
      // update Id in context 
      dispatch({type:'UPDATECOUNTID', payload:idCount+1})
      // Clear newTask state values
      setNewTAsk({
        title: '',
        description: '',
        id: idCount + 1, // Prepare for the next task's ID
      });
  };

  return (
    <section className="formsection">
      <h1>Add New Task</h1>
      {/* form section element */}
      <form onSubmit={addTaskSubmit}>
         {/* Name title task input */}
        <input
          className='titleInput'
          value={newTask.title}
          name="title"
          type="text"
          placeholder="Enter task name"
          onChange={(e) =>
            // update local newTask state 
            setNewTAsk((prevState) => ({ ...prevState, title: e.target.value }))
          }
          required
        />
        {/* Description input */}
        <textarea
          name="description"
          value={newTask.description}
          type="text"
          placeholder="Enter description"
          onChange={(e) =>
            // update local newTask state 
            setNewTAsk((prevState) => ({ ...prevState, description: e.target.value }))
          }
          required
        />
        <input type="submit" value="Add Task" />
      </form>
    </section>
  );
}
