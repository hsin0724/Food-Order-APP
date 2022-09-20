import React, { useReducer } from "react";
import CartContext from "./cartContext";

// initalState
const defaultCartState = {
  items: [],
  totalAmount: 0,
};

//reducerState Function, the function that handle the state's state and will return the lastest state
const cartReducer = (state, action) => {
  if (action.type === "ADD_ITEM") {

    const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount;

    //check if the add item is exist in the cart
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );

    //if add item isn't exist in the cart => existingCartItem = -1
    const existingCartItem = state.items[existingCartItemIndex];

    let updatedItems;

    //existingCartItem == true ,the add item is exist in the cart so just update the item's amount 
    if (existingCartItem) {

      let updateItem;

      if(action.addfrom === 'CART'){
        updateItem = {
          ...existingCartItem,
          amount: existingCartItem.amount + 1
        }
        
      } else {
        updateItem = {
          ...existingCartItem,
          amount: existingCartItem.amount + action.item.amount
        }
      }

      updatedItems = [...state.items];
      //replace the existingCartItem's date to updateItem(new date)
      updatedItems[existingCartItemIndex] = updateItem;

    } else {
      //add item in to the cart list
      updatedItems = state.items.concat(action.item);
    };

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }

  if (action.type === "REMOVE_ITEM") {
    
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
      
    const existingCartItem = state.items[existingCartItemIndex];

    const updatedTotalAmount = state.totalAmount - existingCartItem.price; 

    let updatedItems;

    if (existingCartItem.amount === 1) {
      // if the item's amount is 1, remove the item from cart
      updatedItems = state.items.filter(item => item.id !== action.id);

    } else {
      const updateItem = {
        ...existingCartItem,
        amount: existingCartItem.amount - 1
      }
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updateItem;
    };

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    }
  };

  if (action.type === 'CLEAR') {
    debugger;
    return defaultCartState;
  }

  return defaultCartState;
};

const CartProvider = (props) => {
  // [currentState, dispatchFunction] = useReducer(ReducerFunction, initalState);
  const [CartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);

  const addItemToCartHandler = (item, addfrom) => {
    dispatchCartAction({ type: "ADD_ITEM", item: item, addfrom: addfrom});
  };

  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({ type: "REMOVE_ITEM", id: id });
  };

  const clearCartHandler = () => {
    dispatchCartAction({ type: "CLEAR"});
  };

  const cartContext = {
    items: CartState.items,
    totalAmount: CartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
    claerCart: clearCartHandler
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
