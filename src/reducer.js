import {
  CLEAR_CART,
  INCREASE,
  REMOVE,
  DECREASE,
  LOADING,
  DISPLAY,
} from "./actions";

const reducer = (state, action) => {
  if (action.type === CLEAR_CART) {
    return { ...state, cart:new Map()};
  }
  if(action.type === REMOVE){
    const newCart = new Map(state.cart);
    const itemId = (action.payload.id);
    newCart.delete(itemId);
    return {...state,cart: newCart };
  }

  if(action.type === INCREASE){
    const newCart = new Map(state.cart);
    const itemId = (action.payload.id);
    const item = newCart.get(itemId);
    const newItem = {...item, amount : item.amount + 1};
    newCart.set(itemId,newItem)
    return {...state,cart: newCart };

  };
  
  if(action.type === DECREASE){
    const newCart = new Map(state.cart);
    const itemId = (action.payload.id);
    const item = newCart.get(itemId);

    if(item.amount === 1) {
      newCart.delete(itemId);
      return {...state,cart: newCart};
    }
    const newItem = {...item, amount : item.amount - 1};
    newCart.set(itemId,newItem)
    return {...state,cart: newCart };
  };
  if(action.type === LOADING) {
    return {...state, loading : true};
  }
  if(action.type === DISPLAY) {
    const newCart = new Map(action.payload.cart.map((item) => [item.id,item]));
    return {...state, loading : false, cart: newCart};
  }
  throw new Error(`no matching action type ${action.type}`);
};

export default reducer;
