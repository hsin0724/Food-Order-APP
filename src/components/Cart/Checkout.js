import React, { useRef, useState } from "react";
import classes from "../Styles/Checkout.module.css";

// Validate Input value function
const inputIsEmpty = (value) => value.trim() === "";
const postalCodeValidate = (value) => {
  const postalRegex = /^[0-9]{5}$/im;
  return !inputIsEmpty(value) && postalRegex.test(value);
};
const phoneValidate = (value) => {
  // 0912-345-678
  const phoneRegex = /^[(]?[0-9]{4}[)]?[-\s]?[0-9]{3}[-\s]?[0-9]{3}$/im;
  return !inputIsEmpty(value) && phoneRegex.test(value);
};

const Checkout = (props) => {
  const [formInputValidity, setFormInputValidity] = useState({
    name: true,
    postalCode: true,
    address: true,
    phoneNumber: true,
  });

  const nameInputRef = useRef();
  const postalCodeInputRef = useRef();
  const addressInputRef = useRef();
  const phoneInputRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredPostalCode = postalCodeInputRef.current.value;
    const enteredAddress = addressInputRef.current.value;
    const enteredPhone = phoneInputRef.current.value;

    const enteredNameIsValid = !inputIsEmpty(enteredName);
    const enteredPostalCodeIsValid = postalCodeValidate(enteredPostalCode);
    const enteredAddressIsValid = !inputIsEmpty(enteredAddress);
    const enteredPhoneIsValid = phoneValidate(enteredPhone);

    setFormInputValidity({
      name: enteredNameIsValid,
      postalCode: enteredPostalCodeIsValid,
      address: enteredAddressIsValid,
      phoneNumber: enteredPhoneIsValid,
    });

    const formIsValid =
      enteredNameIsValid &&
      enteredPostalCodeIsValid &&
      enteredAddressIsValid &&
      enteredPhoneIsValid;

    if (!formIsValid) {
      return;
    }

    props.onSubmit({
        name: enteredName,
        postalCode: enteredPostalCode,
        address: enteredAddress,
        phoneNumber: enteredPhone, 
    });
  };

  // Input classes control
  const nameClass = `${classes.control} ${formInputValidity.name ? "" : classes.invalid}`;
  const postalCodeClass = `${classes.control} ${formInputValidity.postalCode ? "" : classes.invalid}`;
  const addressClass = `${classes.control} ${formInputValidity.address ? "" : classes.invalid}`;
  const phoneNumberClass = `${classes.control} ${formInputValidity.phoneNumber ? "" : classes.invalid}`;


  return (
    <form onSubmit={submitHandler} className={classes.form}>
      <div className={nameClass}>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" ref={nameInputRef} placeholder="Max" />
        {!formInputValidity.name && <p>Please enter a valid name.</p>}
      </div>
      <div className={postalCodeClass}>
        <label htmlFor="postal">Postal Code</label>
        <input
          type="text"
          id="postal"
          ref={postalCodeInputRef}
          placeholder="40850"
        />
        {!formInputValidity.postalCode && (
          <p>Please enter a valid postal code.(5 characters long)</p>
        )}
      </div>
      <div className={addressClass}>
        <label htmlFor="adress">Address</label>
        <input type="text" id="address" ref={addressInputRef} />
        {!formInputValidity.address && <p>Please enter a valid address.</p>}
      </div>
      <div className={phoneNumberClass}>
        <label htmlFor="phoneNumber">Phone Number</label>
        <input
          type="text"
          id="phoneNumber"
          ref={phoneInputRef}
          placeholder="0912345678"
        />
        {!formInputValidity.phoneNumber && (
          <p>Please enter a valid phone number.</p>
        )}
      </div>

      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
