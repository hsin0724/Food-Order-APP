import React, { Fragment } from 'react';
import HeaderCartButton from './HeaderCartButton';
import classes from '../Styles/Header.module.css';
import headerImg from '../../assets/header_img.jpg';

const Header = (props) => {
  return (
    <Fragment>
        <header className={classes.header}>
            <h1>React Meals</h1>
            <HeaderCartButton onClick={props.onShowCart}/>
        </header>
        <div className={classes['main-image']}>
            <img src={headerImg} alt="Header_Img" />
        </div>
    </Fragment>
  );
};

export default Header;