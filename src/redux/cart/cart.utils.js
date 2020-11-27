export const addItemToCart = ( cartItems, itemToAdd ) => {
    const existingCartItems = cartItems.find( item => item.id === itemToAdd.id );

    // Caso este item já exista na sacola..
    if (existingCartItems) {
        return cartItems.map( item => 
            item.id === itemToAdd.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
    }

    // Se o item não existia na sacola..
    return [...cartItems, { ...itemToAdd, quantity: 1 }]
};


export const removeItemFromCart = ( cartItems, itemToRemove ) => {
    const existingCartItems = cartItems.find( item => item.id === itemToRemove.id );

    if (existingCartItems.quantity === 1) {
        // Só temos 1, então excluimos o item
        return cartItems.filter( item => item.id !== itemToRemove.id );
    }

    if (existingCartItems.quantity > 1) {
        // Temos vários, então diminuimos a quantidade
        return cartItems.map( item => 
            item.id === itemToRemove.id
                ? { ...item, quantity: item.quantity-1 }
                : item
        );
    } else {
        // Não deveria ocorrer, mas neste caso fica tudo como está
        return cartItems;
    }
}