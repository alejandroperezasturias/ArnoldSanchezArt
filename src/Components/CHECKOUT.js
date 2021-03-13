import {
	useState,
	useContext,
	useRef,
	useLayoutEffect,
	useEffect,
} from 'react';
import { Alert } from '@material-ui/lab';
import { fetchFromAPI, formatCurrency } from '../helpers/helpers';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { motion } from 'framer-motion';
import { routeVariants, changeExitPropRight } from '../Animations/animation';
import FOOTER from './FOOTER';
import { AuthContext } from '../App';
import BURGER from './BURGER';
import CheckoutForm from './CHECKOUTFORM';
import { useHistory, Link } from 'react-router-dom';
import arrowBack from '../images/arrowBack.png';

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
	const [error, setError] = useState();
	const [paymentIntent, setPaymentIntent] = useState();
	const paymentBoxRef = useRef();
	const trollyRef = useRef();
	const [widthTrolly, setWidthTrolly] = useState();
	const [scrollStart, setScrollStart] = useState();
	const [scroll, setScroll] = useState();

	const createPaymentIntent = async () => {
		// Disabled the button to prevent from the client action
		setIsProcessing(true);
		// Make the API Request
		const pi = await fetchFromAPI('payments', {
			body: { trolly },
		});

		if (pi === 'Error_Creating_Payment_Intent') {
			console.log('it worked');
		}
		// Visualize in the front-end the CARD element and the Cancel Payment Button
		setPaymentIntent(pi);
		// Enabled the button to allow for client action
		setIsProcessing(false);
	};

	const cancelPaymentIntent = async () => {
		const id = paymentIntent.id;
		setIsProcessing(true);
		await fetchFromAPI('cancelpayments', {
			body: { pamentIntentID: id },
		});
		// We clear the payment intent so we remove the Card object from the front-end
		setPaymentIntent();
		// We are not processing the cancelation anymore
		setIsProcessing(false);
		// Incase I decide to cancel payment when I have a cc error
		setError();
		// AddressReady disables the address form submit button and also shows the payment screen in the
		// front-end we have to set it to undefined to unlock the form submit button and get the form ready
		setAddressReady();
		// We take the user up to the form again
		window.scrollTo(0, 0);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		// Prevent user action from paying twice
		setIsProcessingPayment(true);

		// Grab card data from the Card Element
		const cardElement = elements.getElement(CardElement);

		// Create Billing Details
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
		// Create shipping Details
		const shippingAddress = {
			address: {
				city: addressDetails.city,
				country: addressDetails.state,
				line1: addressDetails.line1,
				line2: '',
				postal_code: addressDetails.postal_code,
				state: addressDetails.state,
			},
			carrier: null,
			name: addressDetails.name,
			phone: '',
			tracking_number: null,
		};

		// Create Payment Method
		const {
			paymentMethod,
			error: createPaymentMethodError,
		} = await stripe.createPaymentMethod({
			type: 'card',
			card: cardElement,
			billing_details: billingDetails,
		});

		// This first one handles every possible issue with wrong credit card numbers
		if (createPaymentMethodError) {
			// Display the error to the user
			setError(createPaymentMethodError.code);
			// Unlock the pay button
			setIsProcessingPayment(false);
		} else {
			// If the payment method is valid

			// Clear errors
			setError();

			// Confirm card payment with Stripe
			const { error: confirmPaymentError } = await stripe.confirmCardPayment(
				paymentIntent.client_secret,
				{
					payment_method: paymentMethod.id,
					receipt_email: user.email,
					shipping: shippingAddress,
				}
			);

			// If we could not confirm the payment method.
			// Basically if we could not paid

			if (confirmPaymentError) {
				confirmPaymentError.payment_intent &&
					setPaymentIntent(confirmPaymentError.payment_intent);
				// Create the error
				setError(confirmPaymentError.code);
				// Unlock the pay button
				setIsProcessingPayment(false);
			} else {
				// If we made money
				// Unlock the button
				setIsProcessingPayment(false);

				// Clear Shopping Cart
				setShoppingCart([]);

				// Clear payment intent and lock paying portion of the front-end
				setPaymentIntent();

				// Clear Errors
				setError();

				// Redirect to Success Page
				history.push('./SUCCESS');
			}
		}
	};

	const setReadyToPay = (event) => {
		event.preventDefault();
		setAddressReady(true);
		window.scrollTo(0, scroll);
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

	useEffect(() => {
		if (trolly.length === 0) {
			history.push('./MERCH');
		}
	}, [trolly]);

	const checkOutAnimation = {
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
	};

	return (
		<motion.div
			style={{ minHeight: '100vh', position: 'relative' }}
			variants={routeVariants}
			initial="hidden"
			animate="visible"
			exit="exit"
			className={'section'}
		>
			<div
				className={'section-header '}
				style={{
					marginBottom: '5rem',
					display: 'flex',
					justifyContent: 'center',
				}}
			>
				<div style={{ textAlign: 'center' }}>
					<h2 className="gradient">CHECK OUT</h2>
				</div>
			</div>
			<div
				className={'split xl-space'}
				style={{
					margin: 'auto',
					'--split-spacer': '5rem',
					width: '75%',
					padding: '1rem',
					justifyContent: 'center',
					alignItems: 'flex-start',
					marginBottom: '4rem',
				}}
			>
				<div
					className="flow-content"
					style={{ flex: '1', minHeight: '100%', minWidth: { widthTrolly } }}
				>
					<Link
						onClick={() => {
							changeExitPropRight();
						}}
						to={'./MERCH'}
					>
						<motion.div
							whileHover={{
								x: '-1%',
								transition: { duration: 0.2 },
							}}
							style={{
								display: 'flex',
								alignItems: 'center',
							}}
						>
							<img src={arrowBack} alt={'arrow decoration'}></img>
							<span
								style={{ marginLeft: '1rem', color: 'white' }}
								className={'text-600'}
							>
								Vuelta a la tienda
							</span>
						</motion.div>
					</Link>

					<motion.div
						variants={checkOutAnimation}
						initial={'close'}
						animate={paymentIntent ? 'open' : 'close'}
						ref={trollyRef}
						className={'flow-content xl-space'}
					>
						{trolly.map((item) => {
							console.log(trolly);
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
										alt={`${item.image}`}
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
							error={''}
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
								<>
									<button
										className={'btn gradient'}
										onClick={createPaymentIntent}
										hidden={paymentIntent}
										disabled={isProcessing}
									>
										{isProcessing ? 'Processing...' : 'Pay with Credit Cart'}
									</button>
								</>
							)}
							{paymentIntent && (
								<>
									<button
										className={'btn gradient'}
										onClick={cancelPaymentIntent}
										disabled={isProcessing}
									>
										{isProcessing ? 'Processing...' : 'Cancel Payment'}
									</button>
									<form onSubmit={handleSubmit} className={'flow-content'}>
										<CardElement options={cardElementOptions} />
										{error && (
											<Alert
												severity="error"
												style={{
													color: 'white',
													marginTop: '1rem',
													backgroundColor: '#190604',
												}}
											>
												{error}
											</Alert>
										)}
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
								</>
							)}
						</div>
					</div>
				)}
			</div>
			<FOOTER />
			<BURGER />
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
