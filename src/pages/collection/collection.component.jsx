import React from 'react';
import { connect } from 'react-redux';

import { selectCollection } from '../../redux/shop/shop.selectors';
import CollectionItem from '../../components/collection-item/collection-item.component';

// Usaremos este aqui só para demonstrar o componentWillUnmount
// import { firestore } from '../../firebase/firebase.utils';

import './collection.styles.scss';

const CollectionPage = ({ collection }) => {
    // // Aqui um exemplo de componentWillUnmount usando useEffect.
    // useEffect(() => {
    //     // Aqui a suscrição..
    //     console.log('I am subscribing..');
    //     const unsubscribe = firestore.collection('collections').onSnapshot(snap => console.log(snap));

    //     // O valor de retorno será o equivalente ao componentWillUnmount usando
    //     return () => {
    //         console.log('I am unsubscribing');
    //         unsubscribe();
    //     }
    // },[]);

    // 
    const { title, items } = collection;
    return (
    <div className='collection-page'>
        <h2 className='title'>{ title }</h2>
        <div className='items'>
            {
                items.map( item => <CollectionItem key={item.id} item={item} /> )
            }
        </div>
    </div>
)};


const mapStateToProps = (state,ownProps) => ({
    collection: selectCollection(ownProps.match.params.collectionId)(state)
})

export default connect(mapStateToProps)(CollectionPage);
