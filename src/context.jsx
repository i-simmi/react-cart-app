import { useContext, useReducer, createContext, useEffect } from "react";
import reducer from "./reducer";
//import  {getTotals}  from "./util";
const AppContext = createContext();

import {
  CLEAR_CART,
  INCREASE,
  REMOVE,
  DECREASE,
  LOADING,
  DISPLAY,
} from "./actions";
import { getTotals } from "./util";

const initialDefault = {
  loading: false,
  cart: new Map(),
};

const url = 'https://www.course-api.com/react-useReducer-cart-project';

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialDefault);
  const {totalAmount, totalCost} = getTotals(state.cart)

  const clearCart = () => {
    dispatch({ type:CLEAR_CART });
  };

  const remove = (id) => {
   dispatch({ type:REMOVE,payload:{id} });
  };

  const increase = (id) => {
    dispatch({ type:INCREASE, payload:{id} });
  };
  const decrease = (id) => {
    dispatch({ type:DECREASE, payload:{id} });
  };

  const fetchData = async()=>{
    dispatch({type: LOADING})
    const response = await fetch(url);
    const cart = await response.json();
    dispatch({type: DISPLAY, payload: {cart}});
  }
  useEffect(()=>{
fetchData()
  },[])
  return (
    <AppContext.Provider value={{ ...state, clearCart, remove, increase, decrease, totalAmount, totalCost }}>{children}</AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};
