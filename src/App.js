import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import './App.css';

import Header from './components/header/header.component';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import CheckoutPage from './pages/checkout/checkout.component';

// import { auth, createUserProfileDocument } from './firebase/firebase.utils';
// import { auth, createUserProfileDocument, addCollectionAndDocuments } from './firebase/firebase.utils';
// import { setCurrentUser } from './redux/user/user.actions';
import { selectCurrentUser } from './redux/user/user.selectors';
import { checkUserSession } from './redux/user/user.actions';

// Usaremos isto para criar SHOP_DATA em firebase
import { selectCollectionsForPreview } from './redux/shop/shop.selectors';


//
class App extends React.Component {

  unsubscribeFromAuth = null;

  componentDidMount() {
    const { checkUserSession } = this.props;
    checkUserSession();

  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
    // console.log('component will unmount');
  }

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/shop" component={ShopPage} />
          <Route exact path="/checkout" component={CheckoutPage} />
          {/* <Route path='/signin' component={SignInAndSignUpPage} /> */}
          <Route
            exact
            path="/signin"
            render={() =>
              this.props.currentUser 
                ? (<Redirect to="/" />)
                : (<SignInAndSignUpPage />)
            }
          />
        </Switch>
      </div>
    );
  }

}

// 1) Versão inicial
// const mapStateToProps = ({ user }) => ({
//   currentUser: user.currentUser
// });

// 2) Versão usando createStructuredSelector
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  collectionsArray: selectCollectionsForPreview
});

const mapDispatchToProps = dispatch => ({
  checkUserSession: () => dispatch(checkUserSession())
})


export default connect(mapStateToProps,mapDispatchToProps)(App);
