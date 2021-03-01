import { useState, useEffect, useContext } from 'react';
import TextField from '@material-ui/core/TextField';
import { Grid, Paper, Button, Typography } from '@material-ui/core';
import {
	ThemeProvider,
	createMuiTheme,
	makeStyles,
} from '@material-ui/core/styles';
import { motion } from 'framer-motion';
import { Link as LinkRouter } from 'react-router-dom';
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

export default function CheckoutForm({ setReadyToPay, error, addressReady }) {
	const [email, setEmail] = useState('');
	const [name, setName] = useState('');
	const [address, setAddress] = useState('');
	const [zip, setZip] = useState('');
	const [city, setCity] = useState('');
	const [country, setCountry] = useState('');
	const { user } = useContext(AuthContext);

	useEffect(() => {
		user && setEmail(user.email);
	}, [user]);

	const darkTheme = createMuiTheme({
		palette: {
			type: 'dark',
		},
	});

	const formStyles = makeStyles((theme) => ({
		form: {
			padding: '4rem 2rem',
			fontSize: '0.2rem',
			fontFamily: 'poppins, sans-serif',
			[theme.breakpoints.up('sm')]: {
				padding: '2rem 1rem',
			},
			[theme.breakpoints.up('md')]: {
				padding: '2rem 1rem',
			},
			[theme.breakpoints.up('lg')]: {
				padding: '2rem 2rem',
			},
		},
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
		lowerLinks: {
			fontSize: '0.6rem',
			fontFamily: 'poppins, sans-serif',
			[theme.breakpoints.up('sm')]: {
				fontSize: '0.6rem',
			},
			[theme.breakpoints.up('md')]: {
				fontSize: '.6rem',
			},
			[theme.breakpoints.up('lg')]: {
				fontSize: '.7rem',
			},
		},
		resize: {
			fontSize: '.7rem',
			lineHeight: 2,
		},
	}));
	const formClass = formStyles();
	return (
		<ThemeProvider theme={darkTheme}>
			<motion.div
				initial="close"
				animate={error ? 'open' : 'close'}
				variants={spanQuantityAnimation}
			>
				<Grid>
					<Paper elevation={3} className={formClass.form}>
						<form
							onSubmit={(e) => {
								setReadyToPay(e, email, name, address, zip, city, country);
								// signInWithEmail(e, email, password, name);
								// setEmail('');
								// setName('');
								// setPassword('');
							}}
						>
							<Grid container spacing={3} align="center" direction={'column'}>
								<Typography variant="h6" style={{ marginBottom: '2rem' }}>
									Where do we send the order?
								</Typography>
								<Grid item>
									<TextField
										InputProps={{ style: { fontSize: 12 } }}
										fullWidth
										required
										id="standard-disabled"
										label="Email"
										type="email"
										value={email}
										variant="outlined"
										onInput={(e) => setEmail(e.target.value)}
										size="small"
									/>
								</Grid>
								<Grid item>
									<TextField
										InputProps={{ style: { fontSize: 12 } }}
										fullWidth
										required
										id="standard-required"
										label="Name"
										value={name}
										variant="outlined"
										onInput={(e) => setName(e.target.value)}
										size="small"
									/>
								</Grid>
								<Grid item>
									<TextField
										fullWidth
										InputProps={{ style: { fontSize: 12 } }}
										required
										id="standard-address-input"
										label="Country"
										value={country}
										onInput={(e) => setCountry(e.target.value)}
										type="country"
										variant="outlined"
										autoComplete="country"
										size="small"
									/>
								</Grid>
								<Grid item>
									<TextField
										fullWidth
										InputProps={{ style: { fontSize: 12 } }}
										required
										id="standard-address-input"
										label="Address"
										value={address}
										onInput={(e) => setAddress(e.target.value)}
										type="address"
										variant="outlined"
										autoComplete="street-address"
										multiline
										size="small"
									/>
								</Grid>

								<Grid
									container
									direction={'row'}
									spacing={1}
									justify="center"
									alignItems="center"
								>
									<Grid item>
										<TextField
											required
											InputProps={{ style: { fontSize: 12 } }}
											id="standard-address-input"
											label="City"
											value={city}
											onInput={(e) => setCity(e.target.value)}
											type="city"
											autoComplete="city-address"
											size="small"
											variant="outlined"
										/>
									</Grid>
									<Grid item>
										<TextField
											required
											InputProps={{ style: { fontSize: 12 } }}
											id="standard-address-input"
											label="ZIP"
											value={zip}
											onInput={(e) => setZip(e.target.value)}
											type="ZIP"
											autoComplete="ZIP"
											size="small"
											variant="outlined"
										/>
									</Grid>
								</Grid>
								<Grid item style={{ marginTop: '2rem' }}>
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
								</Grid>
							</Grid>
						</form>
					</Paper>
				</Grid>
				<div style={{ minHeight: '4rem' }}>
					{error && (
						<Alert
							severity="error"
							style={{ color: 'white', marginTop: '1rem', textAlign: 'center' }}
						>
							{error}
						</Alert>
					)}
				</div>
			</motion.div>
		</ThemeProvider>
	);
}
