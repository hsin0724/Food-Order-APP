import React, { useRef, useState } from "react";
import Input from "../../UI/Input";
import classes from "../../Styles/MealItemForm.module.css";

const MealItemForm = (props) => {
  const [amountIsValid, setAmountIsValid] = useState(true);

  //use useRef to get input value
  const amountInputRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();

    //ref will always save value as a string
    const enteredAmount = amountInputRef.current.value;
    const enteredAmountNumber = +enteredAmount;

    //validation amount input
    if (
      enteredAmount.trim().length === 0 ||
      enteredAmountNumber < 0 ||
      enteredAmountNumber > 5
    ){
      setAmountIsValid(false);
      return;
    };

    props.onAddToCart(enteredAmountNumber);
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        ref={amountInputRef}
        label="Amount"
        input={{
          id: "amount" + props.id,
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button>+ Add</button>
      {!amountIsValid && <p>Please enter a valid amount (1-5).</p>}
    </form>
  );
};

export default MealItemForm;
