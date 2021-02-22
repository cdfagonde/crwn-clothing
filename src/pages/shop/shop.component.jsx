import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

// import CollectionOverview from '../../components/collections-overview/collections-overview.component';
import CollectionOverviewContainer from '../../components/collections-overview/collections-overview.container';

import CollectionPageContainer from '../collection/collection.container';

import { fetchCollectionsStartAsync } from '../../redux/shop/shop.actions';
// import { selectIsCollectionFetching, selectIsCollectionsLoaded } from '../../redux/shop/shop.selectors';
// import { selectIsCollectionsLoaded } from '../../redux/shop/shop.selectors';

// import WithSpinner from '../../components/with-spinner/with-spinner.component';

// const CollectionOverviewWithSpinner = WithSpinner(CollectionOverview);
// const CollectionPageWithSpinner = WithSpinner(CollectionPage);


class ShopPage extends React.Component {

    // Tudo isso era antes do thunk..
    // // Agora podemos definir state sem precisar constructor. Isso será feito por baixo dos panos.
    // state = {
    //     loading: true
    // };
    //
    // unsubscribeFromSnapshot = null;
    //
    // Primeira versão do DisMount
    // componentDidMount() {
    //     const { updateCollections } = this.props;
    //     const collectionRef = firestore.collection('collections');
    //
    //     // -------------------------------------------------------------------------------
    //     // Método 1: Usaremos padrão observable-observer, disponibilizado por firebase. 
    //     // -------------------------------------------------------------------------------
    //     // Este método é bem melhor, porque proporciona atualização de dados nos 2 sentidos.
    //     // collectionRef.onSnapshot( async snapshot => {
    //     //     const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
    //     //     // console.log(collectionsMap);
    //     //     updateCollections(collectionsMap);
    //     //     this.setState({ loading: false });
    //     // });
    //
    //     // -------------------------------------------------------------------------------
    //     // Método 2: Método get tradicional, que retorna uma promise.
    //     // -------------------------------------------------------------------------------
    //     // Aqui não teremos atualização nos 2 sentidos!
    //     collectionRef.get().then(snapshot => {
    //         const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
    //         // console.log(collectionsMap);
    //         updateCollections(collectionsMap);
    //         this.setState({ loading: false });
    //     });
    //
    //     // -------------------------------------------------------------------------------
    //     // Método 3: Acesso via rest api.
    //     // -------------------------------------------------------------------------------
    //     // A forma de montar a url depende de cada banco. A seguir acesso firebase.
    //     // fetch(
    //     //     'https://firestore.googleapis.com/v1/projects/crwn-clothing-db-9cde8/databases/(default)/documents/collections'
    //     // )
    //     // .then(response => response.json())
    //     // .then(collections => console.log(collections));
    //     // Funciona, mas é um porre! Firebase retorna um array bem chato de trabalhar, mas os dados estão ai, para quem quiser..  :-(
    //
    // }

    // 
    componentDidMount() {
        const { fetchCollectionsStartAsync } = this.props;
        fetchCollectionsStartAsync();
    }

    // 
    render() {
        const { match } = this.props;

        return (
            <div className='shop-page'>
                <Route exact path={`${match.path}`} 
                    component={CollectionOverviewContainer}
                />
                <Route path={`${match.path}/:collectionId`} 
                    component={CollectionPageContainer}
                />
            </div>
        );
    }
};


const mapDispatchToProps = dispatch => ({
    fetchCollectionsStartAsync: () => dispatch(fetchCollectionsStartAsync())
})

export default connect(null,mapDispatchToProps)(ShopPage);