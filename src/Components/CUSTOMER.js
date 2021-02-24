import React, { useState, useEffect, Suspense, useContext } from 'react';
import {
	fetchFromAPI,
	formatCurrency,
	timeConverter,
} from '../helpers/helpers';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { AuthCheck } from 'reactfire';
import LOGIN from './LOGIN';
import { auth, db } from './firebase';
import { motion } from 'framer-motion';
import {
	routeVariants,
	changeExitPropHomet,
	routeVariantsNormal,
	changeExitPropRight,
} from '../Animations/animation';
import SectionChangeLink from '../Animations/SectionChangeLink';
import USER from './USER';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import {
	ThemeProvider,
	createMuiTheme,
	makeStyles,
} from '@material-ui/core/styles';
import { AuthContext } from '../App';

function SaveCard() {
	const stripe = useStripe();
	const elements = useElements();
	const [user2, setUser2] = useState();
	const [setupIntent, setSetupIntent] = useState();
	const [wallet, setWallet] = useState([]);
	const [paymentIntents, setPaymentIntents] = useState([]);
	const [selectCreditCart, setSelectedCreditCart] = useState();
	const [loading, setLoading] = useState(false);
	const { user } = useContext(AuthContext);

	const getUserInfoFromDB = (user) => {
		db.collection('users')
			.doc(user)
			.get()
			.then((data) => {
				setUser2(data.data());
			});
	};

	const getWallet = async () => {
		if (user) {
			const paymentMethods = await fetchFromAPI('wallet', { method: 'GET' });
			setWallet(paymentMethods);
		}
	};

	const getPaymentIntents = async () => {
		if (user) {
			const paymentIntents = await fetchFromAPI('clienthistory', {
				method: 'GET',
			});
			setPaymentIntents(paymentIntents);
		}
	};

	const getTheSelectedCreditCard = (e) => {
		const selectedCard = wallet.filter((card) => card.id === e.target.value);
		setSelectedCreditCart(selectedCard[0]);
	};

	const cancelSetupIntent = () => {
		setSetupIntent();
	};

	useEffect(() => {
		getWallet();
		getPaymentIntents();
		user && getUserInfoFromDB(user.uid);
	}, [user]);

	// Create the setup intent
	const createSetupIntent = async () => {
		setLoading(true);
		const si = await fetchFromAPI('wallet');
		si && setLoading(false);
		setSetupIntent(si);
	};

	// Handle the submission of card details
	const handleSubmit = async (event) => {
		event.preventDefault();

		const cardElement = elements.getElement(CardElement);

		// Confirm Card Setup
		const {
			setupIntent: updatedSetupIntent,
			error,
		} = await stripe.confirmCardSetup(setupIntent.client_secret, {
			payment_method: { card: cardElement },
		});

		if (error) {
			alert(error.message);
			console.log(error);
		} else {
			setSetupIntent();
			await getWallet();

			alert('Success! Card added to your wallet');
		}
	};

	// Handle delete credit card
	const deleteCreditCard = async () => {
		const success = await fetchFromAPI('detach', {
			method: 'DELETE',
			body: selectCreditCart.id,
		});
		success && getWallet();
		success && console.log(success);
	};

	const logOut = async () => {
		await auth.signOut();
	};

	const useStyles = makeStyles((theme) => ({
		formControl: {
			margin: theme.spacing(1),
			width: '15rem',
		},
	}));
	const classes = useStyles();

	const darkTheme = createMuiTheme({
		palette: {
			type: 'dark',
		},
	});

	console.log(paymentIntents);

	return (
		<motion.div
			style={{ minHeight: '90vh', position: 'relative' }}
			variants={routeVariants}
			initial="hidden"
			animate="visible"
			exit="exit"
			className={'section'}
		>
			<AuthCheck fallback={<LOGIN />}>
				<div
					className={'section-header'}
					style={{
						padding: '0rem 1rem',
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'center',
					}}
				>
					<SectionChangeLink
						weGoTo={'/TATTOO'}
						exitAnimationDirection={changeExitPropHomet}
						title={'TATTOO'}
						direction={'rtl'}
					/>
					<USER user={user} />
					<SectionChangeLink
						weGoTo={'/MERCH'}
						exitAnimationDirection={changeExitPropHomet}
						title={'MERCH'}
						direction={'initial'}
					/>
				</div>
				<div
					style={{
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						minHeight: '50vh',
					}}
				>
					<div className={'user-dsh flow-content '}>
						<div style={{ minHeight: '150px' }}>
							{user2?.displayImage && (
								<img
									style={{ borderRadius: '50%', maxHeight: '140px' }}
									src={user2?.displayImage}
								></img>
							)}
						</div>
						<div
							className={'split user-dsh-wrapper'}
							style={{
								display: 'flex',
								justifyContent: 'space-around',
								alignItems: 'center',
							}}
						>
							<div className={'flow-content'}>
								{paymentIntents && (
									<div style={{ minWidth: '17rem' }}>
										<div style={{ marginBottom: '1rem' }}>
											<p className={'text-400'}>Your Orders</p>
										</div>
										<ul
											className="flow-content"
											style={{
												'--flow-spacer': '.5rem',
												maxHeight: '15vh',
												overflowY: 'scroll',
											}}
										>
											{paymentIntents.map((paymentSource) => {
												return paymentSource.status === 'succeeded' ? (
													<li>
														{paymentSource.currency}
														{'  '}
														{formatCurrency(paymentSource.amount)} -{' '}
														{timeConverter(paymentSource.created)}
													</li>
												) : (
													<></>
												);
											})}
										</ul>
									</div>
								)}
								{/* <div>
									<button
										className={'gradient btn'}
										onClick={createSetupIntent}
										hidden={setupIntent}
										style={{ minWidth: '245px' }}
									>
										{loading ? 'Loading' : 'Attach New Credit Card'}
									</button>
								</div>

								{setupIntent && (
									<form
										onSubmit={handleSubmit}
										className={'flow-content'}
										style={{ minWidth: '245px' }}
									>
										<div
											style={{
												background: 'white',
												padding: '1rem 1rem',
												borderRadius: '1rem',
												minWidth: '18rem',
											}}
										>
											<CardElement />
										</div>
										<div>
											<button className={'gradient btn'} type="submit">
												Attach
											</button>
											<button
												style={{ marginLeft: '1rem' }}
												className={'gradient btn'}
												onClick={cancelSetupIntent}
											>
												Cancel
											</button>
										</div>
									</form>
								)} */}
							</div>
							<div
								className={'bars split center-center'}
								style={{
									'--split-spacer': '0.5rem',
								}}
							>
								<hr width="1" size="250"></hr>
								<hr width="1" size="150"></hr>
								<hr width="1" size="50"></hr>
							</div>

							<div>
								<div style={{ textAlign: 'center' }}>
									<h3 style={{ marginBottom: '1rem' }} className={'text-400'}>
										Retrieve all Payment Sources
									</h3>
									<ThemeProvider theme={darkTheme}>
										<FormControl className={classes.formControl}>
											<InputLabel htmlFor="credit-cards-users">
												Your Credit Cards
											</InputLabel>
											<Select
												native
												value={`${selectCreditCart?.card.brand}***** **** **** ${selectCreditCart?.card.last4} expires ${selectCreditCart?.card.exp_month}/${selectCreditCart?.card.exp_year}`}
												onChange={(e) => getTheSelectedCreditCard(e)}
												inputProps={{
													name: 'Credit Cards',
													id: 'credit-cards-users',
												}}
											>
												<option aria-label="None" value="" />
												{wallet.map((paymentSource) => (
													<CreditCard
														key={paymentSource.id}
														paymentSource={paymentSource}
													/>
												))}
											</Select>
										</FormControl>
									</ThemeProvider>
								</div>
								<div style={{ minHeight: '3.8rem' }}>
									{selectCreditCart && (
										<div>
											<h3
												style={{ marginBottom: '1rem', marginTop: '2rem' }}
												className={'text-400'}
											>
												Delete
											</h3>
											<div>
												<p className={'text-300'}>
													{selectCreditCart.card.brand} **** **** ****{' '}
													{selectCreditCart.card.last4} expires{' '}
													{selectCreditCart.card.exp_month}/
													{selectCreditCart.card.exp_year}
												</p>
												{/* <button
													aria-label="Close"
													className={'btn gradient'}
													onClick={deleteCreditCard}
												>
													<span aria-hidden="true">×</span>
												</button> */}
											</div>
										</div>
									)}
								</div>
							</div>
						</div>
						<div>
							<button className={' gradient btn'} onClick={logOut}>
								Log out
							</button>
						</div>
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
				<div
					className={'split center-center final-footer xl-space'}
					style={{ '--split-spacer': '2rem' }}
				>
					<p>© 2020 Designed By Alex Perez. All Rights Reserved</p>
					<div>
						<ul className="footer-social">
							<li>
								<a
									aria-label="acme instagram Arnol tattoo page"
									style={{ color: 'var(--clr-neutral-100)' }}
									href="https://www.instagram.com/arnolsegchez/"
								>
									IG
								</a>
							</li>
						</ul>
					</div>
				</div>
			</AuthCheck>
		</motion.div>
	);
}

function CreditCard({ paymentSource }) {
	const { last4, brand, exp_month, exp_year } = paymentSource.card;
	return (
		<option value={paymentSource.id}>
			{brand} **** **** **** {last4} expires {exp_month}/{exp_year}
		</option>
	);
}

export default function CUSTOMER() {
	return (
		<Suspense fallback={'loading User'}>
			<SaveCard />
		</Suspense>
	);
}
