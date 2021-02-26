import { useState, useContext } from 'react';
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
import { AuthContext } from '../App';

export default function Login() {
	const history = useHistory();
	const [error, setError] = useState();
	const { setFromCheckOut } = useContext(AuthContext);

	const signInWithGoogle = async () => {
		try {
			const credential = await auth.signInWithPopup(
				new firebase.auth.GoogleAuthProvider()
			);
			console.log(credential.user);
			const { uid, email, photoURL, displayName } = credential.user;

			db.collection('users')
				.doc(uid)
				.set(
					{ email, name: displayName, displayImage: photoURL },
					{ merge: true }
				);
			history.push('/CUSTOMER');
			setFromCheckOut(false);
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
			db.collection('users').doc(uid).set(
				{
					email: email,
					name: name,
					displayImage:
						'https://13thdimension.com/wp-content/uploads/2020/02/36f2af1e2e85b403a247f52c78eace8d-580x580.png',
				},
				{ merge: true }
			);
			setError();
			setFromCheckOut(false);
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
				<SectionChangeLink
					weGoTo={'/ART'}
					exitAnimationDirection={changeExitPropHomet}
					title={'ART'}
					direction={'rtl'}
				/>
				<SectionChangeLink
					weGoTo={'/MERCH'}
					exitAnimationDirection={changeExitPropHomet}
					title={'MERCH'}
					direction={'initial'}
				/>
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
					style={{ position: 'fixed', bottom: 40, padding: '0rem 1rem' }}
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
					style={{
						position: 'fixed',
						bottom: 40,
						right: 0,
						padding: '0rem 2rem',
					}}
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
