import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import { useLoaderData } from "react-router-dom";
import CheckOutFrom from "./CheeckOut/CheckOutFrom";
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);
console.log("payment stripe", stripePromise);
const Payment = () => {
  const bookings = useLoaderData();
  const { treatment, price, appointmentDate, slot } = bookings;
  console.log("payment taka and mama", bookings);
  return (
    <div>
      <h3 className="text-4xl text-primary ">payment for {treatment}</h3>
      <p className="text-xl">
        {" "}
        please pay <strong>${price}</strong>for your appointment{" "}
        {appointmentDate} at {slot}{" "}
      </p>
      <div className="w-96 my-12">
        <Elements stripe={stripePromise}>
          <CheckOutFrom bookings={bookings} />
        </Elements>
      </div>
    </div>
  );
};

export default Payment;
