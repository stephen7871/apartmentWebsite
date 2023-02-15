import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import React from "react"
import PaymentForm from "./PaymentForm"

const PUBLIC_KEY = "your key"

const stripeTestPromise = loadStripe(PUBLIC_KEY)

export default function StripeContainer({post,returnedPost }) {
	return (
		<Elements stripe={stripeTestPromise}>
			<PaymentForm post={post} returnedPost={returnedPost}/>
		</Elements>
	)
}
