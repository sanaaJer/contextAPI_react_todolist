//sessionStorage.js :to persist the tasks between sessions.

// get state from storage 
export const loadStateStorage = () => {
    try {
        const serializedState = sessionStorage.getItem('state');
        if (serializedState === null) {
            // No state saved, so return undefined to let Redux use the default state
            return undefined;
        }
        // Parse the JSON string to a JavaScript object
        return JSON.parse(serializedState); 

    } catch (err) {
        // Return undefined if there's an error (e.g., invalid data in sessionStorage)
        console.error('session error: ',err)
        return undefined; 
    }
  };
  

  
  // save date to storage 
  export const saveStateStorage = (state) => {
    try {
      const serializedState = JSON.stringify(state);
      // set the state to sessionStorage
      sessionStorage.setItem('state', serializedState); 
    } catch (err) {
      console.error("Could not save state", err);
    }
  };
  