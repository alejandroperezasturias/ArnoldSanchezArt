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
								recoverPassword(e, email);
								setEmail('');
							}}
						>
							<Grid container spacing={3} align="center" direction={'column'}>
								<Typography variant="h6">Forgot Password ?</Typography>
								<Grid item>
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
								</Grid>

								<Grid item>
									<Button
										type="submit"
										variant="contained"
										fullWidth
										style={{ borderRadius: '100vw' }}
										className={formClass.formButton}
									>
										Change Password
									</Button>
								</Grid>

								<Grid item>
									<Typography
										variant="overline"
										className={formClass.lowerLinks}
									>
										<LinkRouter style={{ color: 'white' }} to={'/LOGIN'}>
											Log In
										</LinkRouter>
									</Typography>
								</Grid>
							</Grid>
						</form>
					</Paper>
				</Grid>
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
