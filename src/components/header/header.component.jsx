import React from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../../firebase/firebase.utils';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';

import { seletCartHidden } from '../../redux/cart/cart.selectors';
import { selectCurrentUser } from '../../redux/user/user.selectors';

import { ReactComponent as Logo } from '../../assets/crown.svg';

import './header.styles.scss';

const Header = ({ currentUser, hidden }) => (
    <div className='header'>
        <Link className='logo-container ' to='/'>
            <Logo className='logo'/>
        </Link>
        <div className='options'>
            <Link className='option' to='/shop' >
                SHOP
            </Link>
            <Link className='option' to='/contact' >
                CONTACT
            </Link>
            {
                currentUser ?
                <div className='option' onClick={() => auth.signOut()}> SIGN OUT</div>
                :
                <Link className='option' to='/signin'>SIGN IN</Link>
            }
            <CartIcon />
        </div>
        { hidden ? null : <CartDropdown />}
    </div>
)

// 1) 
// const mapStateToProps = state => ({
//     currentUser: state.user.currentUser
// });

// 2) Para incluir 'cart', Veremos outra forma de desestructurar..
// const mapStateToProps = ({ user: {currentUser}, cart: {hidden}}) => ({
//     currentUser,
//     hidden
// });

// 3) Usando selectors separados
// const mapStateToProps = state => ({
//     currentUser: selectCurrentUser(state),
//     hidden: seletCartHidden(state)
// });

// 4) Usaremos createStructuredSelector, que se encarregará de passar o state para cada um dos selectors
const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    hidden: seletCartHidden
});

export default connect(mapStateToProps)(Header);