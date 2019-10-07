import React, { useReducer, createContext } from 'react'
import reducer from './reducer'

const initialState = {
  isModalOpen: false,
  date: 0,
  isCommon: false,
  foodQuery: null,
  todayInputlist: [],
  totalCurrentCalories: 0
}


export const Context = createContext(initialState);

export const Provider = (props) => {

  const [state, dispatch] = useReducer(reducer, initialState);
  
  return (
    <Context.Provider value={{ state, dispatch }}>
      {props.children}
    </Context.Provider>
  );
}

