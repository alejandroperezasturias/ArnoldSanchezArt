import { useState, useEffect, useContext } from 'react';
import TextField from '@material-ui/core/TextField';
import { Button, Typography } from '@material-ui/core';
import {
	ThemeProvider,
	createMuiTheme,
	makeStyles,
} from '@material-ui/core/styles';
import { motion } from 'framer-motion';
import { Alert } from '@material-ui/lab';
import { AuthContext } from '../App';

export const spanQuantityAnimation = {
	open: {
		x: ['0%', '3%', '2%', '1%', '0%', '-1%', '-2%', '-3%', '-2%', '-1%', '0%'],
		transition: { duration: 0.3 },
	},
	close: {
		x: '0%',
	},
};

export default function CheckoutForm({
	setReadyToPay,
	error,
	addressReady,
	addressDetails,
	setAddressDetails,
}) {
	const { user } = useContext(AuthContext);
	const [formError, setFormError] = useState(false);
	// 5numbers no more no less
	const regex = /\b\d{5}\b/;

	const validPostalCode = (postal_code) => {
		return regex.test(postal_code);
	};

	useEffect(() => {
		// user && setEmail(user.email);
		user &&
			setAddressDetails((prev) => {
				return { ...prev, email: user.email };
			});
	}, [user]);

	const darkTheme = createMuiTheme({
		palette: {
			type: 'dark',
		},
	});

	const formStyles = makeStyles((theme) => ({
		formButton: {
			fontSize: '0.8rem',
			fontFamily: 'poppins, sans-serif',
			[theme.breakpoints.up('sm')]: {
				fontSize: '0.8rem',
			},
			[theme.breakpoints.up('md')]: {
				fontSize: '.8rem',
			},
			[theme.breakpoints.up('lg')]: {
				fontSize: '.9rem',
			},
		},
	}));
	const formClass = formStyles();
	return (
		<ThemeProvider theme={darkTheme}>
			<motion.div
				initial="close"
				animate={error ? 'open' : 'close'}
				variants={spanQuantityAnimation}
				// className="form-wrapper"
			>
				<div>
					{formError && (
						<Alert
							severity="error"
							style={{
								color: 'white',
								marginBottom: '1rem',
								textAlign: 'center',
							}}
						>
							{formError}
						</Alert>
					)}
				</div>
				<div>
					<div
						style={{
							width: '100%',
							background: '#424242',
							padding: '3rem 2rem',
							borderRadius: '1rem',
						}}
					>
						<form
							onSubmit={(e) => {
								if (validPostalCode(addressDetails.postal_code)) {
									setReadyToPay(e);
									setFormError();
								} else {
									console.log(validPostalCode(addressDetails.postal_code));
									console.log(typeof addressDetails.postal_code);
									e.preventDefault();
									setFormError('Codigo Postal no Valido');
								}

								// signInWithEmail(e, email, password, name);
								// setEmail('');
								// setName('');
								// setPassword('');
							}}
						>
							<div
								className="flow-content"
								style={{ '--flow-spacer': '1rem', textAlign: 'center' }}
							>
								<Typography variant="h6" style={{ marginBottom: '2rem' }}>
									Danos tu Direccion
								</Typography>
								<div>
									<TextField
										InputProps={{ style: { fontSize: 12 } }}
										fullWidth
										required
										id="standard-disabled"
										label="Email"
										type="email"
										value={addressDetails.email}
										variant="outlined"
										onInput={(e) =>
											setAddressDetails((prev) => {
												return { ...prev, email: e.target.value };
											})
										}
										size="small"
									/>
								</div>
								<div>
									<TextField
										InputProps={{ style: { fontSize: 12 } }}
										fullWidth
										required
										id="standard-required"
										label="Name"
										value={addressDetails.name}
										variant="outlined"
										onInput={(e) =>
											setAddressDetails((prev) => {
												return { ...prev, name: e.target.value };
											})
										}
										size="small"
									/>
								</div>
								<div>
									<TextField
										fullWidth
										InputProps={{ style: { fontSize: 12 } }}
										required
										id="standard-address-input"
										label="Country"
										value={addressDetails.state}
										onInput={(e) =>
											setAddressDetails((prev) => {
												return { ...prev, state: e.target.value };
											})
										}
										type="country"
										variant="outlined"
										autoComplete="country"
										size="small"
									/>
								</div>
								<div>
									<TextField
										fullWidth
										InputProps={{ style: { fontSize: 12 } }}
										required
										id="standard-address-input"
										label="Address"
										value={addressDetails.line1}
										onInput={(e) =>
											setAddressDetails((prev) => {
												return { ...prev, line1: e.target.value };
											})
										}
										type="address"
										variant="outlined"
										autoComplete="street-address"
										multiline
										size="small"
									/>
								</div>

								<div
									style={{ display: 'flex', justifyContent: 'space-around' }}
								>
									<div>
										<TextField
											required
											InputProps={{ style: { fontSize: 12 } }}
											id="standard-address-input"
											label="City"
											value={addressDetails.city}
											onInput={(e) =>
												setAddressDetails((prev) => {
													return { ...prev, city: e.target.value };
												})
											}
											type="city"
											autoComplete="city-address"
											size="small"
											variant="outlined"
										/>
									</div>
									<div>
										<TextField
											required
											InputProps={{ style: { fontSize: 12 } }}
											id="standard-address-input"
											label="ZIP"
											value={addressDetails.postal_code}
											onInput={(e) =>
												setAddressDetails((prev) => {
													return { ...prev, postal_code: e.target.value };
												})
											}
											type="ZIP"
											autoComplete="ZIP"
											size="small"
											variant="outlined"
										/>
									</div>
								</div>
								<div style={{ marginTop: '2rem' }}>
									<Button
										type="submit"
										variant="contained"
										fullWidth
										style={{ borderRadius: '100vw' }}
										disabled={addressReady}
										className={formClass.formButton}
									>
										Ready to pay
									</Button>
								</div>
							</div>
						</form>
					</div>
				</div>
			</motion.div>
		</ThemeProvider>
	);
}
