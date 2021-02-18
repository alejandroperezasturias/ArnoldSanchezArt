// import React, { useState } from 'react';
// import { fetchFromAPI } from '../helpers/helpers';
// import { useStripe } from '@stripe/react-stripe-js';

// export default function CHECKOUT() {
// 	const stripe = useStripe();
// 	const [product, setProduct] = useState({
// 		name: 'Hat',
// 		description: 'Pug hat. A hat your pug will love.',
// 		images: [
// 			'https://images.unsplash.com/photo-1612902376658-d4d46558ee04?ixid=MXwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
// 		],
// 		amount: 799,
// 		currency: 'usd',
// 		quantity: 0,
// 	});

// 	const changeQuantity = (v) => {
// 		setProduct({ ...product, quantity: Math.max(0, product.quantity + v) });
// 	};

// 	const handleClick = async (event) => {
// 		const body = { line_items: [product] };
// 		const { id: sessionId } = await fetchFromAPI('checkouts', {
// 			body,
// 		});
// 		const { error } = await stripe.redirectToCheckout({
// 			sessionId,
// 		});

// 		if (error) {
// 			console.error(error);
// 		}
// 	};

// 	return (
// 		<div>
// 			<p>PRICE: {product.price}</p>
// 			<h3>{product.name}</h3>
// 			<button
// 				onClick={() => {
// 					changeQuantity(-1);
// 				}}
// 			>
// 				-
// 			</button>
// 			<span>{product.quantity}</span>
// 			<button
// 				onClick={() => {
// 					changeQuantity(1);
// 				}}
// 			></button>
// 			<img src={product.images[0]} width="250px" alt="product"></img>
// 			<button onClick={handleClick} disabled={product.quantity < 1}>
// 				CHECKOUT
// 			</button>
// 		</div>
// 	);
// }

import React, { useState, useEffect } from 'react';
import { fetchFromAPI } from '../helpers/helpers';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

export default function CHECKOUT() {
	const stripe = useStripe();
	const elements = useElements();

	const [amount, setAmount] = useState(0);
	const [paymentIntent, setPaymentIntent] = useState();

	// Create a payment intent on the server
	const createPaymentIntent = async (event) => {
		// Clamp amount to Stripe min/max
		const validAmonut = Math.min(Math.max(amount, 50), 9999999);
		setAmount(validAmonut);

		// Make the API Request
		const pi = await fetchFromAPI('payments', {
			body: { amount: validAmonut },
		});
		setPaymentIntent(pi);
	};

	useEffect(() => {
		console.log(paymentIntent);
	}, [paymentIntent]);

	// Handle the submission of card details
	const handleSubmit = async (event) => {
		event.preventDefault();

		const cardElement = elements.getElement(CardElement);

		// Confirm Card Payment
		const {
			paymentIntent: updatedPaymentIntent,
			error,
		} = await stripe.confirmCardPayment(paymentIntent.client_secret, {
			payment_method: { card: cardElement },
		});

		if (error) {
			console.error(error.payment_intent);
			error.payment_intent && setPaymentIntent(error.payment_intent);
		} else {
			setPaymentIntent(updatedPaymentIntent);
		}
	};

	return (
		<>
			<div>
				<input
					type="number"
					value={amount}
					disabled={paymentIntent}
					onChange={(e) => setAmount(e.target.value)}
				/>
				<button
					disabled={amount <= 0}
					onClick={createPaymentIntent}
					hidden={paymentIntent}
				>
					Ready to Pay ${(amount / 100).toFixed(2)}
				</button>
			</div>

			<form onSubmit={handleSubmit} style={{ backgroundColor: 'white' }}>
				<CardElement />
				<button type="submit">Pay</button>
			</form>
		</>
	);
}
