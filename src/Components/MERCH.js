import React, { useState, useEffect, useContext } from 'react';
import { motion } from 'framer-motion';
import {
	routeVariants,
	changeExitPropRight,
	changeExitPropLeft,
	routeVariantsNormal,
	changeExitPropHomet,
} from '../Animations/animation';
import SectionChangeLink from '../Animations/SectionChangeLink';
import FOOTER from './FOOTER';
import { fetchFromAPI } from '../helpers/helpers';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { AuthContext } from '../App';

export default function MERCH() {
	const stripe = useStripe();
	const elements = useElements();
	const { user } = useContext(AuthContext);
	const [amount, setAmount] = useState(0);
	const [paymentIntent, setPaymentIntent] = useState();

	const changeQuantity = (v) => {
		setAmount((oldQ) => Math.max(0, oldQ + v));
	};

	const createPaymentIntent = async (event) => {
		// Clamp amount to Stripe min/max
		const validAmonut = Math.min(Math.max(amount, 1), 9999999);
		setAmount(validAmonut);

		// Make the API Request
		const pi = await fetchFromAPI('payments', {
			body: { price: 'price_1IO4EVK1UQqe4VM9h1hsTXlG', quantity: validAmonut },
		});
		setPaymentIntent(pi);
	};

	useEffect(() => {
		console.log(paymentIntent);
		console.log(user);
	}, [paymentIntent]);

	const handleSubmit = async (event) => {
		event.preventDefault();

		const cardElement = elements.getElement(CardElement);

		// Confirm Card Payment
		const {
			paymentIntent: updatedPaymentIntent,
			error,
		} = await stripe.confirmCardPayment(paymentIntent.client_secret, {
			payment_method: { card: cardElement },
			receipt_email: user.email,
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
			<motion.div
				style={{ minHeight: '100vh', position: 'relative' }}
				variants={routeVariants}
				initial="hidden"
				animate="visible"
				exit="exit"
				className={'section'}
			>
				<div className={'section-header'}>
					<SectionChangeLink
						weGoTo={'/ART'}
						exitAnimationDirection={changeExitPropRight}
						title={'ART'}
						direction={'rtl'}
					/>
					<h2 className="gradient">MERCH</h2>
					<SectionChangeLink
						weGoTo={'/TATTOO'}
						exitAnimationDirection={changeExitPropLeft}
						title={'TATTOO'}
						direction={'initial'}
					/>
				</div>
				<div className="split center-center">
					<div className={'section-body xl-space'}>
						<div>
							<p>PRICE: 333</p>
							<h3>cool stickers</h3>
							<button
								onClick={() => {
									changeQuantity(-1);
								}}
							>
								-
							</button>
							<span>{amount}</span>
							<button
								onClick={() => {
									changeQuantity(1);
								}}
							>
								+
							</button>
							<img
								src={
									'https://images.unsplash.com/photo-1612902376658-d4d46558ee04?ixid=MXwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80'
								}
								width="250px"
								alt="product"
							></img>
						</div>
						<div style={{ minHeight: '20rem' }}></div>
						<button onClick={createPaymentIntent} disabled={paymentIntent}>
							Ready to Pay
						</button>
						<form onSubmit={handleSubmit} style={{ backgroundColor: 'white' }}>
							<CardElement />
							<button type="submit">Pay</button>
						</form>
					</div>
				</div>
				<div>
					<motion.div
						style={{ position: 'fixed', bottom: 40 }}
						variants={routeVariantsNormal}
						initial="hidden"
						animate="visible"
						exit="exit"
					>
						<SectionChangeLink
							weGoTo={'/'}
							exitAnimationDirection={changeExitPropHomet}
							title={'HOME'}
							direction={'rtl'}
						/>
					</motion.div>
					<motion.div
						style={{ position: 'fixed', bottom: 40, right: 16 }}
						variants={routeVariantsNormal}
						initial="hidden"
						animate="visible"
						exit="exit"
					>
						<SectionChangeLink
							weGoTo={'/CONTACT'}
							exitAnimationDirection={changeExitPropRight}
							title={'CONTACT'}
							direction={'initial'}
						/>
					</motion.div>
				</div>
				<FOOTER />
			</motion.div>
		</>
	);
}
