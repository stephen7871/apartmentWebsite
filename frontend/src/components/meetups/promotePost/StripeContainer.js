import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import React from "react"
import PaymentForm from "./PaymentForm"

const PUBLIC_KEY = "pk_test_51M31CkLqdUUllD3Zaq81POPEwyUssmHjU0S3g8lebdITqOM9xYY89mveqyvNk4AwulJZ1tcPuDZllFnaCkGmzF9y00oxkkuuW3"

const stripeTestPromise = loadStripe(PUBLIC_KEY)

export default function StripeContainer({post,returnedPost }) {
	return (
		<Elements stripe={stripeTestPromise}>
			<PaymentForm post={post} returnedPost={returnedPost}/>
		</Elements>
	)
}
