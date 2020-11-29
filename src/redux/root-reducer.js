import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';   // aqui indicamos que usaremos localStorage
// import sessionStorage from 'redux-persist/lib/storage/session';   // aqui indicamos que usaremos sessionStorage

import userReducer from './user/user.reducer';
import cartReducer from './cart/cart.reducar';
import directoryReducer from './directory/directory.reducer';
import shopReducer from './shop/shop.reducer';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['cart']   // único reducer que interessa aqui eh o cart
};

const rootReducer = combineReducers({
    user: userReducer,
    cart: cartReducer,
    directory: directoryReducer,
    shop: shopReducer
 });


//  export default combineReducers({
//     user: userReducer,
//     cart: cartReducer
//  });

export default persistReducer( persistConfig, rootReducer );