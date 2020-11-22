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
}