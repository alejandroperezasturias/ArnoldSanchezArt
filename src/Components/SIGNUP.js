import { useEffect, useState } from 'react';
import firebase from 'firebase/app';
import { auth, db } from './firebase';
import { motion } from 'framer-motion';
import {
	routeVariants,
	changeExitPropRight,
	routeVariantsNormal,
	changeExitPropHomet,
} from '../Animations/animation';
import { useHistory } from 'react-router-dom';
import SectionChangeLink from '../Animations/SectionChangeLink';
import FORM from './FORM';

export default function Login() {
	const history = useHistory();
	const [error, setError] = useState();
	// Print everytime there is a change in auth
	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((user) => {
			// detaching the listener
			if (user) {
				console.log(user);
			} else {
				console.log('User Logged Out');
			}
		});
		return () => unsubscribe(); // unsubscribing from the listener when the component is unmounting.
	}, []);

	const signInWithGoogle = async () => {
		try {
			const credential = await auth.signInWithPopup(
				new firebase.auth.GoogleAuthProvider()
			);

			const { uid, email, displayName } = credential.user;

			db.collection('users')
				.doc(uid)
				.set({ email: email, name: displayName }, { merge: true });
			history.push('/CUSTOMER');
			setError();
		} catch (error) {
			console.error(error);
			setError(error.message);
		}
	};

	const signInWithEmail = async (event, mail, password, name) => {
		event.preventDefault();
		try {
			const credential = await auth.createUserWithEmailAndPassword(
				mail,
				password
			);
			const { uid, email } = credential.user;
			db.collection('users')
				.doc(uid)
				.set({ email: email, name: name }, { merge: true });
			setError();
			history.push('/CUSTOMER');
		} catch (error) {
			console.error(error.message);
			setError(error.message);
		}
	};

	return (
		<motion.div
			style={{ minHeight: '90vh', position: 'relative' }}
			variants={routeVariants}
			initial="hidden"
			animate="visible"
			exit="exit"
			className={'section'}
		>
			<div className={'section-header'}>
				<div>
					<SectionChangeLink
						weGoTo={'/MERCH'}
						exitAnimationDirection={changeExitPropHomet}
						title={'MERCH'}
						direction={'rtl'}
					/>
				</div>
				<div>
					<SectionChangeLink
						weGoTo={'/ART'}
						exitAnimationDirection={changeExitPropHomet}
						title={'ART'}
						direction={'rtl'}
					/>
				</div>
				<div>
					<SectionChangeLink
						weGoTo={'/TATTOO'}
						exitAnimationDirection={changeExitPropHomet}
						title={'TATTOO'}
						direction={'rtl'}
					/>
				</div>
			</div>
			<div
				className=" flow-content"
				style={{
					minHeight: '75vh',
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				<div
					style={{
						// backgroundColor: 'white'
						borderRadius: '1rem',
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
					}}
				></div>
				<FORM
					signIn={signInWithGoogle}
					signInWithEmail={signInWithEmail}
					error={error}
					method="SIGN UP"
					setError={setError}
				/>
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
			<div style={{ minHeight: '5rem' }}></div>
		</motion.div>
	);
}
