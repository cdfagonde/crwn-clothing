import { createSelector } from 'reselect';

const selectCart = state => state.cart;

export const selectCartItems = createSelector(
    [selectCart],
    cart => cart.cartItems
);

export const selectCartItemsCount = createSelector(
    [selectCartItems],
    cartItems => cartItems.reduce( (sum,el) => sum + el.quantity, 0)
);

export const seletCartHidden = createSelector(
    [selectCart],
    cart => cart.hidden
);