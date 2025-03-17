import React, { useContext } from 'react'
import CardTask from './TaskItem';
import { primaryColor } from '../colors';
import { TasksContext } from '../Context/TasksContext';

function TasksList() {
   // inline-style
   const secListStyle={ display: 'flex',flexDirection: 'column',width:'50%', padding:'0 1em 1em 1em', backgroundColor:primaryColor,color:'black',borderRadius:18,margin:'4em auto'}
    
    
    // Get list Tasks from context state 
    const {state}=useContext(TasksContext);
    const listTasks = state.listTAsks; 


  return (
 // display list Tasks component section
  <section style={secListStyle}>
    <h1>To-Do List </h1>
    {
      // map functon to diisplay list of tasks usnig Component CardTask, send data of each single task as props 
      listTasks.map((e)=> (<CardTask {...e} />))
    }
  </section>

    
  )
}

export default TasksList;