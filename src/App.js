
import './styles/App.css';
import TaskForm from './Components/TaskForm'
import TasksList from './Components/TasksList'
import { TasksProvider } from './Context/TasksContext';



function App() {
  // inline style conts
  const divStyle={display:'flex',flexDirection:'row'}

  
  return (
    <div style={divStyle}>
        {/* wrap my components inside provider */}
        <TasksProvider>  
            {/* components to display */}
          <TasksList />
          <TaskForm />
        </TasksProvider>
       
    </div>
  );
}

export default App;
