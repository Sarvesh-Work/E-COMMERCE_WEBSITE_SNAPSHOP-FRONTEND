import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "./StripeCheckoutForm";
import "../Stripe.scss";
import { useSelector } from "react-redux";
import { selectCurrentOrder } from "../features/order/orderSlice.jsx";

const stripePromise = loadStripe(
  "pk_test_51PNUwR2MQ7RY2ENMub3uhZB9yHn9Nl4yDSHdT2u5PtGuG2qdFY1TsgrwCIuBSlh3nCM6aLkoHCrXy3uFp6DT0KNj00cXoBTB1d"
);

export default function StripCheckoutPage() {
  const [clientSecret, setClientSecret] = useState("");
  const currentOrder = useSelector(selectCurrentOrder);


  useEffect(() => {
    fetch("https://snapshop-backend.vercel.app/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ totalAmount: currentOrder.totalAmount }),
      meta:{
        order_id:currentOrder.id
      }
    })
      .then((res) => res.jsxon())
      .then((data) => {
        setClientSecret(data.clientSecret);
       
      });
  }, []);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="Stripe">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
}
