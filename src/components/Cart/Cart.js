import React, { useContext, useState } from "react";
import CartItem from "./CartItem";
import CartContext from "../../store/cartContext";
import Checkout from "./Checkout";
import Modal from "../UI/Modal";
import classes from "../Styles/Cart.module.css";
import sendingOrderImg from "../../assets/sendingOrder.png";
import OrderSuccessImg from "../../assets/orderSuccess.png";

const Cart = (props) => {
  const [confirmIsOrder, setConfirmIsOrder] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const cartCtx = useContext(CartContext);
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemAddHandler = (item, addfrom) => {
    addfrom = "CART";
    cartCtx.addItem(item, addfrom);
  };

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartITems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onAdd={cartItemAddHandler.bind(null, item)}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
        />
      ))}
    </ul>
  );

  const orderHandler = () => {
    setConfirmIsOrder(true);
  };

  const submitOrderHandler = async (userData) => {
    setIsSubmitting(true);
    setConfirmIsOrder(false);

    const respone = await fetch(
      "https://food-order-app-f9bd3-default-rtdb.firebaseio.com/orders.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: userData,
          orderedItems: cartCtx.items,
        }),
      }
    );

    
    if (!respone.ok) {
      throw new Error('Something went wrong!');
    }

    setIsSubmitting(false);
    setSubmitSuccess(true);
    cartCtx.claerCart();
  };

  return (
    <Modal onCloseCart={props.onCloseCart}>
      {!confirmIsOrder && !submitSuccess && !isSubmitting && (
        <div>
          {cartITems}
          <div className={classes.total}>
            <span>Total Amount</span>
            <span>{totalAmount}</span>
          </div>

          <div className={classes.actions}>
            <button
              className={classes.closebtn}
              onClick={props.onCloseCart}
            >
              Close
            </button>
            {hasItems && (
              <button className={classes.orderbtn} onClick={orderHandler}>
                Order
              </button>
            )}
          </div>
        </div>
      )}

      {confirmIsOrder && (
        <div className={classes.ordertext}>
          <Checkout
            onCancel={props.onCloseCart}
            onSubmit={submitOrderHandler}
          />
        </div>
      )}

      {isSubmitting && (
        <div className={classes.sending}>
          <img src={sendingOrderImg} alt="sending_Order_Img" />
          <p>Sending your order...</p>
        </div>
      )}

      {submitSuccess && (
        <div className={classes.success}>
          <img src={OrderSuccessImg} alt="order_Success_Img" />
          <h4>Your order is success!</h4>
          <p>Thanks for your order! We are done preparing your order.</p>
        </div>
      )}
    </Modal>
  );
};

export default Cart;
