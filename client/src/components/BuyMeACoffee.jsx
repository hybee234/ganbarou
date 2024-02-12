import { useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useLazyQuery } from '@apollo/client';
import { QUERY_CHECKOUT } from './../utils/queries'; 

import Auth from './../utils/auth';
import { useGlobalContext } from '../utils/GlobalState';
import { Icon } from '@iconify/react';


import {
    COFFEE_QTY,
} from '../utils/actions'

// stripePromise returns a promise with the stripe object as soon as the Stripe package loads
const stripePromise = loadStripe('pk_test_51OiYUVKwMV8NBYYPoY8w6BNyEYxag1WKaOF0L5GOybGfLHQdg4wjlkMjeU7pyZq2ZchslaqgTlkili6B7QYqJlL500MfCZruYu');

export default function BuyMeACoffee () {
    console.log("🌳 BuyMeACoffee Rendering")

    //Hook to access state
    const [state, dispatch] = useGlobalContext();


    const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);

    const buyCoffee = async() => {
        console.log("📢 buyCoffee engaged")
        console.log("💬 state.coffeeQty", state.coffeeQty)

        try {
                const { data } = await getCheckout( {
                    variables: {
                        products: {
                            // image: "./assets/images/coffee.jpg",                        
                            // price: 5,
                            // name: "Coffee",
                            // purchaseQuantity: 5, 
                            // quantity: 1,                           
                            quantity: parseInt(state.coffeeQty),   
                        }
                    }
                })
                console.log ("📦 getCheckout data", data)
        } catch (error) {
            console.log(JSON.stringify(error, null, 2)); //Much better error reporting for GraphQl issues
            // toast.error("Checkout Unsuccessful - something went wrong")
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

    return (

            <div className=" m-auto">
                <div>
                    Enjoying <span className="cherry-font">Ganbarou</span>?
                    <div>Buy me coffee to show your appreciation! </div>
                </div>
                <div className="">
                    <input
                        className="modal-field w-16 text-center my-1"
                        name="cofee-qty"
                        type="number"
                        min="1"
                        value={state.coffeeQty}
                        onChange= {(e) =>
                            dispatch({ type: COFFEE_QTY, payload: e.target.value})}
                        > 
                    </input> 
                    {
                        state.coffeeQty <= 1 ?
                        (
                            <span>coffee</span>
                        ):(
                            <span>coffees 😍😍</span>
                        )
                    }
                    <div className="w-full">
                        <button
                            className="px-6 py-1 my-1 font-bold duration-200 ease-in-out button-color"
                            onClick={buyCoffee}
                            >
                                <Icon
                                    icon="line-md:coffee-loop"
                                    width="20" height="20" 
                                    className="task-detail-icon m-auto"
                                />                        
                        </button>   
                    </div>
                </div>
            </div>

    );



    
};
