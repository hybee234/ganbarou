

export default function BuyMeACofee() {


    return (
        <div>
            <script async
            src="https://js.stripe.com/v3/buy-button.js">
            </script>

            <stripe-buy-button
            buy-button-id="buy_btn_1OiZDxKwMV8NBYYPX05HgNBF"
            publishable-key="pk_live_51OiYUVKwMV8NBYYPTaIhogDm9F5lwZZjjXTmlW2ZXyrN9q89x8jaIdm7c1m3sQITHt6ci5Y82p1npcaeKJvOEETz0042OdTX0Q"
            >
            </stripe-buy-button>
        </div>
    )
}