import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import { useLoaderData } from "react-router-dom";
import CheckOutFrom from "./CheeckOut/CheckOutFrom";
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);
console.log("payment stripe", stripePromise);
const Payment = () => {
  const booking = useLoaderData();
  // const navigation = useNavigation();
  const { treatment, price, appointmentDate, slot } = booking;
  // if(navigation.state === "loading"){
  //     return <Loading></Loading>
  // }
  return (
    <div>
      <h3 className="text-3xl">Payment for {treatment}</h3>
      <p className="text-xl">
        Please pay <strong>${price}</strong> for your appointment on{" "}
        {appointmentDate} at {slot}
      </p>
      <div className="w-96 my-12">
        <Elements stripe={stripePromise}>
          <CheckOutFrom booking={booking} />
        </Elements>
      </div>
    </div>
  );
};

export default Payment;
