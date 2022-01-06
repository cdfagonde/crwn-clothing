import React from 'react';
// import { Link } from 'react-router-dom';
// import { auth } from '../../firebase/firebase.utils';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';

import { seletCartHidden } from '../../redux/cart/cart.selectors';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { signOutStart } from '../../redux/user/user.actions';

import { ReactComponent as Logo } from '../../assets/crown.svg';

// import './header.styles.scss';
// import { HeaderContainer, LogoContainer, OptionsContainer, OptionDiv, OptionLink } from './header.styles';
import { HeaderContainer, LogoContainer, OptionsContainer, OptionLink } from './header.styles';

const Header = ({ currentUser, hidden, signOutStart }) => (
    <HeaderContainer>
        <LogoContainer to='/'>
            <Logo className='logo'/>
        </LogoContainer>
        <OptionsContainer>
            <OptionLink to='/shop' >
                SHOP
            </OptionLink>
            <OptionLink to='/contact' >
                CONTACT
            </OptionLink>
            {
                currentUser ?
                <OptionLink as='div' onClick={signOutStart}> SIGN OUT</OptionLink>
                :
                <OptionLink to='/signin'>SIGN IN</OptionLink>
            }
            <CartIcon />
        </OptionsContainer>
        { hidden ? null : <CartDropdown />}
    </HeaderContainer>
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

const mapDispatchToProps = dispatch => ({
    signOutStart: () => dispatch(signOutStart())
})

export default connect(mapStateToProps,mapDispatchToProps)(Header);