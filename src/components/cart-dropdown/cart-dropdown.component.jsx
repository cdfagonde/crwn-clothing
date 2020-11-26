import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router-dom';

import CartItem from '../cart-item/cart-item.component';
import { selectCartItems } from '../../redux/cart/cart.selectors';
import { toggleCartHidden } from '../../redux/cart/cart.actions.js';
import CustomButton from '../custom-button/custom-button.component';

import './cart-dropdown.styles.scss';

// 
const CartDropdown = ({ cartItems, history, dispatch }) => (
  <div className="cart-dropdown">
    <div className="cart-items">
      {cartItems.length ? (
        cartItems.map((item) => <CartItem key={item.id} item={item} />)
      ) : (
        <span className="empty-message"> Your cart is empty </span>
      )}
    </div>
    <CustomButton
      onClick={() => {
        history.push("/checkout");
        dispatch(toggleCartHidden());
      }}
    >GO TO CHECKOUT</CustomButton>
  </div>
);

// 1) Versão inicial
// const mapStateToProps = state => ({
//     cartItems: selectCartItems(state)
// });

// 2) Versao usando createStructuredSelector
const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems
});

// Mesmo sem definir, connect irá passar 'dispatch' como uma das props
export default withRouter(connect(mapStateToProps)(CartDropdown));