import { useState, useContext, useRef, useLayoutEffect } from 'react';
import { fetchFromAPI, formatCurrency } from '../helpers/helpers';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { motion } from 'framer-motion';
import {
	routeVariants,
	changeExitPropRight,
	changeExitPropLeft,
} from '../Animations/animation';
import FOOTER from './FOOTER';
import { AuthContext } from '../App';
import BURGER from './BURGER';
import SectionChangeLink from '../Animations/SectionChangeLink';
import CheckoutForm from './CHECKOUTFORM';
import FloatingLinks from './FLOATINGLINKS';

export default function CHECKOUT() {
	const stripe = useStripe();
	const elements = useElements();
	const { trolly, deleteFromShoppingCart, user } = useContext(AuthContext);
	const [addressReady, setAddressReady] = useState(false);
	const [amount, setAmount] = useState(0);
	const [error, setError] = useState();
	const [paymentIntent, setPaymentIntent] = useState();
	const paymentBoxRef = useRef();
	const trollyRef = useRef();
	const [widthTrolly, setWidthTrolly] = useState();
	const [scrollStart, setScrollStart] = useState();
	const [scroll, setScroll] = useState();

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

	const cancelPaymentIntent = async () => {
		console.log(paymentIntent.id);
		const { status } = await fetchFromAPI('cancelpayments', {
			body: { pamentIntentID: paymentIntent.id },
		});
		console.log(status);
		setPaymentIntent();
		setAddressReady();
		window.scrollTo(0, 0);
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

	const setReadyToPay = (event, email, name, address, zip, city, country) => {
		event.preventDefault();
		if (email && name && address && zip && city && country && trolly[0]) {
			setAddressReady(true);
			window.scrollTo(0, scroll);
		}
		if (!trolly[0]) setError('Trolly is Empty');
	};

	useLayoutEffect(() => {
		// Get the distance from the start of the page to the element start
		const rect = paymentBoxRef.current.getBoundingClientRect();
		const trollyRect = trollyRef.current.getBoundingClientRect();
		const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
		const offsetStart = rect.top + scrollTop;
		const offsetEnd = offsetStart + rect.height;
		setScroll(offsetEnd - 300);
		setScrollStart(rect.top - trollyRect.top + trollyRect.height / 2);
		setWidthTrolly(trollyRect.width);
		console.log(rect);
		console.log(trollyRect);
	}, []);

	return (
		<motion.div
			style={{ minHeight: '100vh', position: 'relative' }}
			variants={routeVariants}
			initial="hidden"
			animate="visible"
			exit="exit"
			className={'section'}
		>
			<div className={'section-header'} style={{ marginBottom: '5rem' }}>
				<SectionChangeLink
					weGoTo={'/ART'}
					exitAnimationDirection={changeExitPropRight}
					title={'ART'}
					direction={'rtl'}
				/>
				<div style={{ textAlign: 'center' }}>
					<h2 className="gradient">CHECK OUT</h2>
				</div>
				<BURGER />
				<SectionChangeLink
					weGoTo={'/TATTOO'}
					exitAnimationDirection={changeExitPropLeft}
					title={'TATTOO'}
					direction={'initial'}
				/>
			</div>
			<div
				className={'split xl-space'}
				style={{
					margin: 'auto',
					'--split-spacer': '10rem',
					width: '75%',
					padding: '1rem',
					justifyContent: 'center',
					alignItems: 'flex-start',
				}}
			>
				<div
					className="flow-content"
					style={{ flex: '1', minHeight: '100%', minWidth: { widthTrolly } }}
				>
					<h3 className={'text-600'}>arnolsanchez</h3>
					<motion.div
						variants={{
							close: {
								y: '0%',
								transition: {
									duration: 0.2,
									ease: 'easeOut',
								},
							},
							open: {
								alignItems: 'flex-start',
								y: scrollStart,
								transition: {
									duration: 0.3,
									ease: 'easeOut',
								},
							},
						}}
						initial={'close'}
						animate={paymentIntent ? 'open' : 'close'}
						ref={trollyRef}
						className={'flow-content xl-space'}
					>
						{trolly.map((item) => {
							return (
								<div key={item.name + Math.random(100)} className="split">
									<div style={{ flex: ' 0 1 30%' }}>
										<TrollyItemCheckOut
											price_id={item.price_id}
											name={item.name}
											amount={item.amount}
											price={item.price}
											deleteFromShoppingCart={deleteFromShoppingCart}
											paymentIntent={paymentIntent}
										/>
									</div>
									<img
										src={item.image}
										alt={`image ${item.image}`}
										style={{ width: '4rem', objectFit: 'cover' }}
									></img>
								</div>
							);
						})}
					</motion.div>
				</div>

				<div style={{ flex: '0.9' }} className={'flow-content'}>
					<div>
						<CheckoutForm
							setReadyToPay={setReadyToPay}
							error={error}
							addressReady={addressReady}
						/>
					</div>
				</div>
			</div>
			<hr
				style={{
					width: '75%',
					margin: 'auto',
					height: '0.01rem',
					border: 'none transparent 0px',
					backgroundColor: 'white',
				}}
			></hr>
			<div ref={paymentBoxRef} className="xl-space split">
				{addressReady && (
					<div
						className="xl-space split"
						style={{
							width: '75%',
							margin: 'auto',
							'--split-spacer': '10rem',
							minHeight: '50vh',
						}}
					>
						<div style={{ flex: '1 1 0%', width: widthTrolly }}></div>
						<div style={{ flex: '0.9 1 0%' }} className="flow-content">
							{!paymentIntent && (
								<button
									className={'btn gradient'}
									onClick={createPaymentIntent}
									hidden={paymentIntent}
								>
									Pay with Credit Cart
								</button>
							)}
							{paymentIntent && (
								<button
									className={'btn gradient'}
									onClick={cancelPaymentIntent}
								>
									Cancel Payment
								</button>
							)}
							{paymentIntent && (
								<form
									onSubmit={handleSubmit}
									style={{ backgroundColor: 'white' }}
									className={'flow-content'}
								>
									<CardElement style={{ color: 'pink' }} />
									<button className="btn gradient" type="submit">
										Pay
									</button>
								</form>
							)}
						</div>
					</div>
				)}
			</div>
			<FloatingLinks />
			<FOOTER />
		</motion.div>
	);
}

export function TrollyItemCheckOut({
	price,
	amount,
	name,
	price_id,
	deleteFromShoppingCart,
	paymentIntent,
}) {
	return (
		<div
			key={price_id}
			className={'flow-content'}
			style={{ '--flow-spacer': '0.3rem' }}
		>
			<p style={{ fontSize: 'var(	--fs-500)' }}> {name}</p>
			<p style={{ fontSize: 'var(	--fs-300)' }}>Items: {amount}</p>

			<p style={{ fontSize: 'var(	--fs-300)' }}>
				Price: {formatCurrency(price * amount * 1000)}
			</p>
			{!paymentIntent && (
				<button
					className={'btn text'}
					style={{
						backgroundColor: 'red',
						padding: '.2rem .5rem',
						fontSize: 'var(	--fs-300)',
						marginTop: '0.5rem',
						border: 'none 0px !important',
					}}
					onClick={() => {
						deleteFromShoppingCart(price_id);
					}}
				>
					Delete
				</button>
			)}
		</div>
	);
}
