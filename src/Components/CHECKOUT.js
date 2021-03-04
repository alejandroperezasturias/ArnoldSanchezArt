import {
	useState,
	useContext,
	useRef,
	useLayoutEffect,
	useEffect,
} from 'react';
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
import { useHistory } from 'react-router-dom';

const cardElementOptions = {
	style: {
		base: {
			color: 'white',

			fontWeight: 600,
			fontFamily: 'poppins, Open Sans, Segoe UI, sans-serif',
			fontSize: '16px',
			fontSmoothing: 'antialiased',

			':focus': {
				color: 'white',
			},

			'::placeholder': {
				color: 'white',
				iconColor: 'white',
			},

			':focus::placeholder': {
				color: 'white',
			},
		},
		invalid: {
			color: 'red',
			iconColor: 'red',
			':focus': {
				color: '#FA755A',
			},
			'::placeholder': {
				color: '#FFCCA5',
			},
		},
	},
	hidePostalCode: true,
};

export default function CHECKOUT() {
	const history = useHistory();
	const stripe = useStripe();
	const elements = useElements();
	const {
		trolly,
		deleteFromShoppingCart,
		user,
		setShoppingCart,
		totalCents,
	} = useContext(AuthContext);

	const [addressDetails, setAddressDetails] = useState({
		name: '',
		email: '',
		city: '',
		line1: '',
		state: '',
		postal_code: '',
	});
	const [addressReady, setAddressReady] = useState(false);
	const [isProcessing, setIsProcessing] = useState(false);
	const [isProcessingPayment, setIsProcessingPayment] = useState(false);
	// const [amount, setAmount] = useState(0);
	const [error, setError] = useState();
	const [paymentIntent, setPaymentIntent] = useState();
	const paymentBoxRef = useRef();
	const trollyRef = useRef();
	const [widthTrolly, setWidthTrolly] = useState();
	const [scrollStart, setScrollStart] = useState();
	const [scroll, setScroll] = useState();

	const createPaymentIntent = async () => {
		// Clamp amount to Stripe min/max
		// const validAmonut = Math.min(Math.max(amount, 1), 9999999);
		// setAmount(validAmonut);

		// Make the API Request
		setIsProcessing(true);
		const pi = await fetchFromAPI('payments', {
			body: { price: 'price_1IO4EVK1UQqe4VM9h1hsTXlG', quantity: 2 },
		});
		setPaymentIntent(pi);
		setIsProcessing(false);
	};

	const cancelPaymentIntent = async () => {
		const id = paymentIntent.id;
		setPaymentIntent();
		const { status } = await fetchFromAPI('cancelpayments', {
			body: { pamentIntentID: id },
		});
		setAddressReady();
		setIsProcessingPayment();
		window.scrollTo(0, 0);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		setIsProcessingPayment(true);

		const cardElement = elements.getElement(CardElement);

		const billingDetails = {
			name: addressDetails.name,
			email: addressDetails.email,
			address: {
				city: addressDetails.city,
				line1: addressDetails.line1,
				state: addressDetails.state,
				postal_code: addressDetails.postal_code,
			},
		};
		// Confirm Card Payment

		const paymentMethodReq = await stripe.createPaymentMethod({
			type: 'card',
			card: cardElement,
			billing_details: billingDetails,
		});

		const {
			paymentIntent: updatedPaymentIntent,
			error: confirmPaymentError,
		} = await stripe.confirmCardPayment(paymentIntent.client_secret, {
			// payment_method: { card: cardElement },
			payment_method: paymentMethodReq.paymentMethod.id,
			receipt_email: user.email,
		});

		if (confirmPaymentError) {
			setIsProcessingPayment(false);
			confirmPaymentError.payment_intent &&
				setPaymentIntent(confirmPaymentError.payment_intent);
			setPaymentIntent();
			setAddressReady();
			window.alert('Sorry we could process your payment. Please try again');
		} else {
			setIsProcessingPayment(false);
			setPaymentIntent(updatedPaymentIntent);
			setShoppingCart([]);
			setPaymentIntent();
			setAddressReady();
			history.push('./SUCCESSPAYMENT');
		}
	};

	const setReadyToPay = (event) => {
		event.preventDefault();
		if (trolly[0]) {
			setAddressReady(true);
			window.scrollTo(0, scroll);
		}
	};

	useLayoutEffect(() => {
		// Get the distance from the start of the page to the element start
		const rect = paymentBoxRef.current.getBoundingClientRect();
		const trollyRect = trollyRef.current.getBoundingClientRect();
		const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
		const offsetStart = rect.top + scrollTop;
		const offsetEnd = offsetStart + rect.height;
		setScroll(offsetEnd - 300);
		setScrollStart(rect.top - trollyRect.top);
		setWidthTrolly(trollyRect.width);
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
							addressDetails={addressDetails}
							setAddressDetails={setAddressDetails}
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
									disabled={isProcessing}
								>
									{isProcessing ? 'Processing...' : 'Pay with Credit Cart'}
								</button>
							)}
							{paymentIntent && (
								<button
									className={'btn gradient'}
									onClick={cancelPaymentIntent}
									disabled={isProcessing}
								>
									{isProcessing ? 'Processing...' : 'Cancel Payment'}
								</button>
							)}
							{paymentIntent && (
								<form onSubmit={handleSubmit} className={'flow-content'}>
									<CardElement options={cardElementOptions} />
									<button
										className="btn gradient"
										type="submit"
										disabled={isProcessingPayment}
									>
										{isProcessingPayment
											? 'Processing...'
											: `Pay ${formatCurrency(totalCents * 1000)}`}
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
