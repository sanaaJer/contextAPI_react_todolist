import { createContext, useEffect, useReducer } from "react";
import { loadStateStorage,saveStateStorage } from "../SessionStorage/sessoinStorage";

//1 create context object 
export const TasksContext=createContext();


//2 reducer function to handle actions,the is a function it will handle how state should change based on actions
const Reducer=(state,action)=>{
    switch(action.type){

        case 'ADDTASK':  
            const updatedState = {
            ...state,
            listTAsks: [...state.listTAsks, action.payload], // Add new task to the list
    
            }; 
            return updatedState;
        case 'DELETETASK': 
            return {...state,
                    listTAsks:state.listTAsks.filter( (e) => e.id != action.payload) // filter tasks not selected for delete by id
             };
         case 'EDITTASK': 
             return {...state,
                     listTAsks:state.listTAsks.map( (e) => e.id == action.payload.id? 
                     {...e,...action.payload.taskEdit}:e ) // after finding task to edit by its id ,set edited task
              };  
        // case 'CHECKCOMPLETED': 
        //       return {...state,
        //               listTAsks:state.listTAsks.map( (e) => e.id == action.payload.id? 
        //               {...e,...action.payload.checkStatus}:e )
        //        };   
        
        case 'UPDATECOUNTID': 
               return {...state,idCount:action.payload};
     
        default: return state;}
};






//3 create the provider 
export const TasksProvider=({children})=>{

    // **Load from sessionStorage,if nulll then use  init values { listTAsks: [], idCount: 1 }
    const initialState = loadStateStorage() || { listTAsks: [], idCount: 1 }; 

    // **reducer link to my provider
    const [state,dispatch]=useReducer(Reducer,initialState);


    //**saveState will save the updated state to sessionStorage, whenever the state changes.
    useEffect(() => {
                    saveStateStorage(state);
                }, [state]);


//** */ return provider component
return (
        <TasksContext.Provider value={{state,dispatch}}>
            {children}
        </TasksContext.Provider>
    );
}