import { useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useLazyQuery } from '@apollo/client';
import { QUERY_CHECKOUT } from './../utils/queries'; 

import Auth from './../utils/auth';
import { useGlobalContext } from '../utils/GlobalState';
// import { TOGGLE_CART, ADD_MULTIPLE_TO_CART } from './../utils/actions';

// import CartItem from '../CartItem';
// import { idbPromise } from '../../utils/helpers';


// stripePromise returns a promise with the stripe object as soon as the Stripe package loads
const stripePromise = loadStripe('pk_test_51OiYUVKwMV8NBYYPoY8w6BNyEYxag1WKaOF0L5GOybGfLHQdg4wjlkMjeU7pyZq2ZchslaqgTlkili6B7QYqJlL500MfCZruYu');

export default function BuyMeACoffee () {
    console.log("🌳 BuyMeACoffee Rendering")

    //Hook to access state
    const [state, dispatch] = useGlobalContext();


    const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);

    const buyCoffee = async() => {
        console.log("📢 buyCofee engaged")

        try {
                const {data } = await getCheckout( {
                    variables: {
                        product: {
                            currency: 'aud',
                            name: "Coffee",
                            description: "Buy the developer a coffee",
                            price: 5,
                            purchasQuantity: 1,
                        },                     
                        
                    }
                })

                console.log ("📦 getCheckout data", data)

                // console.log ("📦 getCheckout data.checkout.session", data.checkout.session)

                // window.location.href = `${data.checkout.sesssion}`;


        } catch (error) {
            console.log(JSON.stringify(error, null, 2)); //Much better error reporting for GraphQl issues
            // toast.error("Updated Unsuccessful - something went wrong")
        }



}
    // // We check to see if there is a data object that exists, if so this means that a checkout session was returned from the backend
    // // Then we should redirect to the checkout with a reference to our session id
    useEffect(() => {
        if (data) {
        stripePromise.then((res) => {
            console.log("📢 useEffect (redirectToCheckout) engaged")
            res.redirectToCheckout({ sessionId: data.checkout.session });
        });
        }
    }, [data]);

    // console.log (data)
    
    // // If the cart's length or if the dispatch function is updated, check to see if the cart is empty.
    // // If so, invoke the getCart method and populate the cart with the existing from the session
    // useEffect(() => {
    //     async function getCart() {

    //         //[HL] look at what this is adding ... just need to add a coffee ....
    //     const cart = await idbPromise('cart', 'get');
    //     dispatch({ type: ADD_MULTIPLE_TO_CART, products: [...cart] });
    //     }

    //     if (!state.cart.length) {
    //     getCart();
    //     }
    // }, [state.cart.length, dispatch]);

    // function toggleCart() {
    //     dispatch({ type: TOGGLE_CART });
    // }

    // function calculateTotal() {
    //     let sum = 0;
    //     state.cart.forEach((item) => {
    //     sum += item.price * item.purchaseQuantity;
    //     });
    //     return sum.toFixed(2);
    // }

    // // When the submit checkout method is invoked, loop through each item in the cart
    // // Add each item id to the productIds array and then invoke the getCheckout query passing an object containing the id for all our products
    // function submitCheckout() {

    //     getCheckout({
    //     variables: { 
    //         products: [...state.cart],
    //     },
    //     });
    // }

    // if (!state.cartOpen) {
    //     return (
    //     <div className="cart-closed" onClick={toggleCart}>
    //         <span role="img" aria-label="trash">
    //         🛒
    //         </span>
    //     </div>
    //     );
    // }

    return (
    //     <div className="cart">
    //     <div className="close" onClick={toggleCart}>
    //         [close]
    //     </div>
    //     <h2>Shopping Cart</h2>
    //     {state.cart.length ? (
    //         <div>
    //         {state.cart.map((item) => (
    //             <CartItem key={item._id} item={item} />
    //         ))}

            <div className="flex-row space-between">
    {/* //             <strong>Total: ${calculateTotal()}</strong> */}

                 {/* Check to see if the user is logged in. If so render a button to check out */}
                {
                    Auth.loggedIn() ? (
                        <button className="button-color" onClick={buyCoffee}>Checkout</button>
                    ) : (
                        <span>(log in to check out)</span>
                    )
                }
            </div>
    //         </div>
    //     ) : (
    //         <h3>
    //         <span role="img" aria-label="shocked">
    //             😱
    //         </span>
    //         You haven't added anything to your cart yet!
    //         </h3>
    //     )}
    //     </div>
    );



    
};
