import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({ price }) => {
    // Já que Stripe quer os preços em cents..
    const price4Stripe = price * 100;
    const publishableKey = 'pk_test_51HszDLBHJQpCeqmRgO7LvSK020yuQIkxXuA0R7HjiTN1LbqNJ7zZk6vuWsDypXLzn8T3pWtYp7qtl1Il0FrZ8j4E00I83KAILo';

    // Somente para simular um pagamento
    const onToken = token => {
        console.log(token);
        alert('Payment Successful');
    }

    // 
    return (
        <StripeCheckout 
            label='Pay Now'
            name='CRWN Clothing iLtd'
            billingAddress
            shippingAddress
            image='https://svgshare.com/i/CUz.svg'
            description={`Your total is $${price}`}
            amount={price4Stripe}
            panelLabel='Pay Now'
            token={onToken}
            stripeKey={publishableKey}
        />
    )
};


export default StripeCheckoutButton;