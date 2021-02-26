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
import { fetchFromAPI, formatCurrency } from '../helpers/helpers';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { AuthContext } from '../App';
import { products } from '../helpers/products';
import SHOPPINGCART from './SHOPPINGCART';
import BURGER from './BURGER';

export default function MERCH() {
	const stripe = useStripe();
	const elements = useElements();
	const { user, setShoppingCart, shoppingCart } = useContext(AuthContext);
	const [paymentIntent, setPaymentIntent] = useState();

	// Shopping Cart

	const addToShoppingCart = (id, amount) => {
		const shoppingCartCopy = [...shoppingCart];
		const existingItem = shoppingCartCopy.find((entry) => entry.id === id);
		if (existingItem) {
			existingItem.amount = existingItem.amount + amount;
			const existingItemIndex = shoppingCartCopy.findIndex(
				(entry) => entry.id === id
			);
			shoppingCartCopy[existingItemIndex] = existingItem;
			// shoppingCartCopy = [...shoppingCartCopy, 1];
			setShoppingCart(shoppingCartCopy);
		} else {
			setShoppingCart((items) => {
				return [...items, { id: id, amount }];
			});
		}
	};

	const deleteFromShoppingCart = (id) => {
		const existingItem = shoppingCart.find((entry) => entry.id === id);
		console.log(existingItem);
		if (!existingItem) return;
		const shoppingCartCopy = [...shoppingCart];
		setShoppingCart(shoppingCartCopy.filter((entry) => entry.id !== id));
	};

	const createPaymentIntent = async (event) => {
		// Clamp amount to Stripe min/max
		// const validAmonut = Math.min(Math.max(amount, 1), 9999999);
		// setAmount(validAmonut);

		// Make the API Request
		const pi = await fetchFromAPI('payments', {
			body: { price: 'price_1IO4EVK1UQqe4VM9h1hsTXlG', quantity: 2 },
		});
		setPaymentIntent(pi);
	};

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
					<div style={{ textAlign: 'center', marginTop: '5rem' }}>
						<h2 className="gradient">MERCH</h2>
						<SHOPPINGCART deleteFromShoppingCart={deleteFromShoppingCart} />
					</div>
					<BURGER />
					<SectionChangeLink
						weGoTo={'/TATTOO'}
						exitAnimationDirection={changeExitPropLeft}
						title={'TATTOO'}
						direction={'initial'}
					/>
				</div>

				<div className="split center-center">
					<div
						className={'merch-wrapper'}
						style={{
							justifyContent: 'space-between',
							alignItems: 'center',
							width: '70%',
							marginTop: '10rem',
							display: 'flex',
						}}
					>
						{products.map((product) => {
							return (
								<MerchCard
									key={product.price_id}
									price={product.price}
									name={product.name}
									price_id={product.price_id}
									image={product.image}
									addToShoppingCart={addToShoppingCart}
								/>
							);
						})}
					</div>
				</div>
				<div style={{ minHeight: '40rem' }}></div>
				<button onClick={createPaymentIntent} disabled={paymentIntent}>
					Ready to Pay
				</button>
				<form onSubmit={handleSubmit} style={{ backgroundColor: 'white' }}>
					<CardElement />
					<button type="submit">Pay</button>
				</form>
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

export function MerchCard({ price, name, price_id, addToShoppingCart, image }) {
	const [amount, setAmount] = useState(0);
	const changeQuantity = (v) => {
		setAmount((oldQ) => Math.max(0, oldQ + v));
	};
	return (
		<div
			id={price_id}
			className={'center-center split'}
			style={{ '--split-spacer': '3rem' }}
		>
			<img src={image} width="250px" alt="arnol tattoo bembibre product"></img>
			<div className="merchcard-info-wrapper">
				<h3>{name}</h3>
				<p>{formatCurrency(price * 1000)}</p>
				<div className={'merch-card-increase-quantity-wrapper'}>
					<button
						className="btn gradient"
						onClick={() => {
							changeQuantity(-1);
						}}
						style={{
							padding: '.3rem .3rem',
							width: '40px',
							height: '40px',
							borderRadius: '100%',
						}}
					>
						-
					</button>
					<span>{amount}</span>
					<button
						style={{
							padding: '.3rem .3rem',
							width: '40px',
							height: '40px',
							borderRadius: '100%',
						}}
						className="btn gradient"
						onClick={() => {
							changeQuantity(1);
						}}
					>
						+
					</button>
				</div>

				<button
					onClick={() => {
						addToShoppingCart(price_id, amount);
						setAmount(0);
					}}
					disabled={amount === 0}
					className="btn gradient"
				>
					ADD TO CART
				</button>
			</div>
		</div>
	);
}
