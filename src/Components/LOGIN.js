import { useState } from 'react';
import firebase from 'firebase/app';
import { auth } from './firebase';
import { motion } from 'framer-motion';
import {
	routeVariants,
	changeExitPropRight,
	routeVariantsNormal,
	changeExitPropHomet,
} from '../Animations/animation';
import SectionChangeLink from '../Animations/SectionChangeLink';
import FORM from './FORM';
import { useHistory } from 'react-router-dom';

export default function LOGIN() {
	const history = useHistory();
	const [error, setError] = useState();

	const signInWithGoogle = async () => {
		try {
			const credential = await auth.signInWithPopup(
				new firebase.auth.GoogleAuthProvider()
			);
			history.push('/CUSTOMER');
		} catch (error) {
			console.error(error);
			setError(error.message);
		}
	};

	const signInWithEmail = async (event, mail, password) => {
		event.preventDefault();
		try {
			await auth.signInWithEmailAndPassword(mail, password);
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
					method={null}
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
