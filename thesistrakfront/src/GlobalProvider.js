import React, { createContext, useContext, useState } from 'react'

const GlobalContext = createContext();

export const useGlobalContext = () => useContext(GlobalContext);



const GlobalProvider = ({children}) => {
    const [globalVariable, setGlobalVariable] = useState(initialValue);
 
    return (
        <GlobalContext.Provider value={{globalVariable, setGlobalVariable}}> 
            {children}
        </GlobalContext.Provider>
    )
}

export default GlobalProvider
