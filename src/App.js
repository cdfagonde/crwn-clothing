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

import { auth, createUserProfileDocument } from './firebase/firebase.utils';
// import { auth, createUserProfileDocument, addCollectionAndDocuments } from './firebase/firebase.utils';
import { setCurrentUser } from './redux/user/user.actions';
import { selectCurrentUser } from './redux/user/user.selectors';

// Usaremos isto para criar SHOP_DATA em firebase
import { selectCollectionsForPreview } from './redux/shop/shop.selectors';


//
class App extends React.Component {

  unsubscribeFromAuth = null;

  componentDidMount() {
    // collectionsArray foi usada somente para criar a collection inicial
    // const { setCurrentUser, collectionsArray } = this.props;
    const { setCurrentUser } = this.props;

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data()
          });

        });
      }

      // Definimos nosso usuário corrente
      setCurrentUser(userAuth);

      // Este processo será usado para criar nossa collection que substituirá SHOP_DATA. Usamos somente 1 vez!
      // Desta forma criaremos nossas collections com todos os valores 
      // addCollectionAndDocuments('collections', collectionsArray);
      // Aqui criaremos nossas collections somente com o nome e os items. Esta foi a versão que usamos.
      // addCollectionAndDocuments('collections', collectionsArray.map(({title,items}) => ({ title, items }) ));
      // Usamos a segunda versão, e após criar a collection, não precisamos mais dela por aqui!

    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
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
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
