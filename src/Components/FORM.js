import { useState, useEffect, useContext } from 'react';
import TextField from '@material-ui/core/TextField';
import { Button, Typography } from '@material-ui/core';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import googleIcon from '../images/google-icon.svg';
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
	const { fromCheckout } = useContext(AuthContext);

	useEffect(() => {
		setError('');
	}, [email, name, password]);

	const darkTheme = createMuiTheme({
		palette: {
			type: 'dark',
		},
	});

	return (
		<ThemeProvider theme={darkTheme}>
			<motion.div
				initial="close"
				animate={error ? 'open' : 'close'}
				variants={spanQuantityAnimation}
				className="form-wrapper"
			>
				<div style={{ minHeight: '4rem' }}>
					{fromCheckout && (
						<Alert
							severity="success"
							style={{ color: 'white', marginTop: '1rem' }}
						>
							Please {!method ? 'log in' : 'sign up'} to proceed to checkout
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
								signInWithEmail(e, email, password, name);
								setEmail('');
								setName('');
								setPassword('');
							}}
						>
							<div
								className="flow-content"
								style={{ '--flow-spacer': '1rem', textAlign: 'center' }}
							>
								<div>
									<Button
										startIcon={
											<img
												alt="google-logo"
												style={{ minHeight: '32px', minWidth: '31px' }}
												src={googleIcon}
											></img>
										}
										variant="contained"
										fullWidth
										color="primary"
										onClick={signIn}
										style={{ padding: '1rem 0rem' }}
									>
										{!method ? 'Log IN' : 'Sign Up'} With Google
									</Button>
								</div>
								{method ? (
									<div>
										<TextField
											fullWidth
											required
											id="standard-required"
											label="Name"
											value={name}
											onInput={(e) => setName(e.target.value)}
											variant="outlined"
										/>
									</div>
								) : (
									<></>
								)}
								<div>
									<TextField
										fullWidth
										required
										id="standard-disabled"
										label="Email"
										type="email"
										value={email}
										onInput={(e) => setEmail(e.target.value)}
										variant="outlined"
									/>
								</div>
								<div>
									<TextField
										fullWidth
										required
										id="standard-password-input"
										label="Password"
										value={password}
										onInput={(e) => setPassword(e.target.value)}
										type="password"
										autoComplete="current-password"
										variant="outlined"
									/>
								</div>
								<div>
									<Button
										type="submit"
										variant="contained"
										fullWidth
										style={{ borderRadius: '100vw' }}
									>
										{!method ? 'Log IN' : 'Sign Up'}
									</Button>
								</div>
								{!method && (
									<div>
										<Typography variant="overline">
											<LinkRouter
												to="/FORGOTPASSWORD"
												style={{ color: 'white' }}
											>
												Forgot Password?
											</LinkRouter>
										</Typography>
									</div>
								)}
								<div item>
									<Typography variant="overline">
										{method ? 'Do you have an account?' : 'Not Signed in Yet?'}
										<span> </span>
										<LinkRouter
											style={{ color: 'white' }}
											to={method ? '/LOGIN' : '/SIGNUP'}
										>
											{method ? 'Log IN' : 'Sign Up'}
										</LinkRouter>
									</Typography>
								</div>
							</div>
						</form>
					</div>
				</div>
				<div style={{ minHeight: '4rem' }}>
					{error && (
						<Alert
							severity="error"
							style={{ color: 'white', marginTop: '1rem' }}
						>
							{error}
						</Alert>
					)}
				</div>
			</motion.div>
		</ThemeProvider>
	);
}
