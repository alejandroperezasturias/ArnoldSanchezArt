import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import { Grid, Paper, Button, Typography, Link } from '@material-ui/core';
import {
	ThemeProvider,
	createMuiTheme,
	makeStyles,
} from '@material-ui/core/styles';
import googleIcon from '../images/google-icon.svg';
import { motion } from 'framer-motion';
import { Link as LinkRouter } from 'react-router-dom';
import { Alert } from '@material-ui/lab';
export const spanQuantityAnimation = {
	open: {
		x: ['0%', '3%', '2%', '1%', '0%', '-1%', '-2%', '-3%', '-2%', '-1%', '0%'],
		transition: { duration: 0.3 },
	},
	close: {
		x: '0%',
	},
};

export default function Form({
	signIn,
	signInWithEmail,
	error,
	method,
	setError,
}) {
	// const classes = useStyles();
	const [email, setEmail] = useState('');
	const [name, setName] = useState('');
	const [password, setPassword] = useState('');

	useEffect(() => {
		setError('');
	}, [email, name, password]);

	const darkTheme = createMuiTheme({
		palette: {
			type: 'dark',
		},
	});

	// const paperStyle = {
	// 	padding: '2rem 2rem',
	// };

	const formStyles = makeStyles((theme) => ({
		form: {
			padding: '2rem 1rem',
			fontFamily: 'poppins, sans-serif',
			[theme.breakpoints.up('sm')]: {
				padding: '2rem 1rem',
			},
			[theme.breakpoints.up('md')]: {
				padding: '2rem 2rem',
			},
			[theme.breakpoints.up('lg')]: {
				padding: '4rem 4rem',
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
								signInWithEmail(e, email, password, name);
								setEmail('');
								setName('');
								setPassword('');
							}}
						>
							<Grid container spacing={3} align="center" direction={'column'}>
								<Grid item>
									<Button
										startIcon={<img alt="google-logo" src={googleIcon}></img>}
										variant="contained"
										fullWidth
										color="primary"
										onClick={signIn}
										className={formClass.formButton}
										style={{
											padding: '1rem 2rem',
											backgroundColor: 'black',
											borderRadius: '100vw',
										}}
									>
										{!method ? 'Log IN' : 'Sign Up'} With Google
									</Button>
								</Grid>
								{method ? (
									<Grid item>
										<TextField
											fullWidth
											required
											id="standard-required"
											label="Name"
											value={name}
											onInput={(e) => setName(e.target.value)}
										/>
									</Grid>
								) : (
									<></>
								)}
								<Grid item>
									<TextField
										fullWidth
										required
										id="standard-disabled"
										label="Email"
										type="email"
										value={email}
										onInput={(e) => setEmail(e.target.value)}
									/>
								</Grid>
								<Grid item>
									<TextField
										fullWidth
										required
										id="standard-password-input"
										label="Password"
										value={password}
										onInput={(e) => setPassword(e.target.value)}
										type="password"
										autoComplete="current-password"
									/>
								</Grid>
								<Grid item>
									<Button
										type="submit"
										variant="contained"
										fullWidth
										style={{ borderRadius: '100vw' }}
										className={formClass.formButton}
									>
										{!method ? 'Log IN' : 'Sign Up'}
									</Button>
								</Grid>
								<Grid direction={'column'} container spacing={2} align="center">
									{!method && (
										<Grid item>
											<Typography
												variant="overline"
												className={formClass.lowerLinks}
											>
												<Link style={{ color: 'white' }}>Forgot Password?</Link>
											</Typography>
										</Grid>
									)}
									<Grid item>
										<Typography
											variant="overline"
											className={formClass.lowerLinks}
										>
											{method
												? 'Do you have an account?'
												: 'Not Signed in Yet?'}
											<span> </span>
											<LinkRouter
												style={{ color: 'white' }}
												to={method ? '/LOGIN' : '/SIGNUP'}
											>
												{method ? 'Log IN' : 'Sign Up'}
											</LinkRouter>
										</Typography>
									</Grid>
								</Grid>
							</Grid>
						</form>
					</Paper>
					{error && (
						<Alert
							severity="error"
							style={{ color: 'white', marginTop: '1rem' }}
						>
							{error}
						</Alert>
					)}
				</Grid>
			</motion.div>
		</ThemeProvider>
	);
}
