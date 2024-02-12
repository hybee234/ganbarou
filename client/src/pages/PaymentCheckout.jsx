import { useEffect } from 'react';
// import { loadStripe } from '@stripe/stripe-js';
// import { useLazyQuery } from '@apollo/client';
// import { QUERY_CHECKOUT } from '../../utils/queries';
// import { idbPromise } from '../../utils/helpers';
// import CartItem from '../CartItem';
// import Auth from '../../utils/auth';
// import { useStoreContext } from '../../utils/GlobalState';
// import { TOGGLE_CART, ADD_MULTIPLE_TO_CART } from '../../utils/actions';


const ProductDisplay = () => (
    <section>
        <div className="product">
        <img
            src="https://i.imgur.com/EHyR2nP.png"
            alt="The cover of Stubborn Attachments"
        />
        <div className="description">
        <h3>Stubborn Attachments</h3>
        <h5>$20.00</h5>
        </div>
        </div>
        <form action="./create-checkout-session" method="POST">
        <button type="submit">
            Checkout
        </button>
        </form>
    </section>
    );



    //TO BE REPLACED ...
    const Message = ({ message }) => (
    <section>
        <p>{message}</p>
    </section>
    );

    export default function App() {
    const [message, setMessage] = useState("");

    useEffect(() => {
        // Check to see if this is a redirect back from Checkout
        const query = new URLSearchParams(window.location.search);

        if (query.get("success")) {
        setMessage("Order placed! You will receive an email confirmation.");
        }

        if (query.get("canceled")) {
        setMessage(
            "Order canceled -- continue to shop around and checkout when you're ready."
        );
        }
    }, []);

    return message ? (
        <Message message={message} />
    ) : (
        <ProductDisplay />
    );
}