import React, { useState, useEffect } from 'react';
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
export const spanQuantityAnimation = {
	open: {
		x: ['0%', '3%', '2%', '1%', '0%', '-1%', '-2%', '-3%', '-2%', '-1%', '0%'],
		transition: { duration: 0.3 },
	},
	close: {
		x: '0%',
	},
};

export default function FormRecoverPassword({
	recoverPassword,
	error,
	setError,
	success,
}) {
	// const classes = useStyles();
	const [email, setEmail] = useState('');

	useEffect(() => {
		setError('');
	}, [email]);

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
								recoverPassword(e, email);
								setEmail('');
							}}
						>
							<div
								className="flow-content"
								style={{ '--flow-spacer': '1rem', textAlign: 'center' }}
							>
								<Typography variant="h6">Forgot Password ?</Typography>
								<div>
									<TextField
										fullWidth
										required
										id="standard-disabled"
										label="Email"
										type="email"
										value={email}
										variant="outlined"
										onInput={(e) => setEmail(e.target.value)}
									/>
								</div>

								<div>
									<Button
										type="submit"
										variant="contained"
										fullWidth
										style={{ borderRadius: '100vw' }}
									>
										Change Password
									</Button>
								</div>

								<div>
									<Typography variant="overline">
										<LinkRouter style={{ color: 'white' }} to={'/LOGIN'}>
											Log In
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
					{success && (
						<Alert
							severity="success"
							style={{ color: 'white', marginTop: '1rem' }}
						>
							{success}
						</Alert>
					)}
				</div>
			</motion.div>
		</ThemeProvider>
	);
}
