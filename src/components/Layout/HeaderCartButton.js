import React, { useContext, useEffect, useState } from 'react';
import CartIcon from '../Cart/CartIcon'
import CartContext from '../../store/cartContext';
import classes from '../Styles/HeaderCartButton.module.css';

const HeaderCartButton = (props) => {

  const [btnIsActive, setBtnIsActive] = useState(false);
  const CartCtx = useContext(CartContext);

  //use Object Destructuring to pull out the items
  const { items } = CartCtx;

  const numberOfCartItems = items.reduce((currentNumber, item) => {
    return currentNumber + item.amount;
  }, 0);

  //check btnIsActive is true or false, true => add class, false => add empty string
  const btnClasses = `${classes.button} ${btnIsActive ? classes.bump : ''}`;

  //when items (dependency) changes, React will trigger useEffect
  useEffect(() => {

    if(items.length === 0) {
      return;
    };

    setBtnIsActive(true);

    //remove css class after 0.3s  
    const timer = setTimeout(() => {
      setBtnIsActive(false);
    }, 300);

    //when you return a function in useEffect, it will automatically as a cleanup function in React
    return () => {
      clearTimeout(timer);
    }

  }, [items]);

  return (
    <button className={btnClasses} onClick={props.onClick}>
        <span className={classes.icon}>
            <CartIcon />
        </span>
        <span>Your Cart</span>
        <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;