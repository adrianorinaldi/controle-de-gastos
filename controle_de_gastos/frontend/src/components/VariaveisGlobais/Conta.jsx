import React, { createContext, useContext, useState } from 'react';

// Criando um contexto
const GlobalContext = createContext();

// Componente de provedor para envolver a sua aplicação
export const GlobalProvider = ({ children }) => {
  const [globalState, setGlobalState] = useState('');

  return (
    <GlobalContext.Provider value={{ globalState, setGlobalState }}>
      {children}
    </GlobalContext.Provider>
  );
};

// Hook personalizado para acessar o estado global
export const useGlobalState = () => useContext(GlobalContext);