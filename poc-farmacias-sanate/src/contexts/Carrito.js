import { createContext, useState } from "react";

const CarritoContext = createContext([[], () => []])

const CarritoProvider = ({ children }) => {
    const [state, setState] = useState([]);
    return (
      <CarritoContext.Provider value={[state, setState]}>
        {children}
      </CarritoContext.Provider>
    )
  }
  
  export { CarritoContext, CarritoProvider }