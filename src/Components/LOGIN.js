import { useState, useContext } from 'react';
import firebase from 'firebase/app';
import { auth } from './firebase';
import { motion } from 'framer-motion';
import { routeVariants, changeExitPropHomet } from '../Animations/animation';
import SectionChangeLink from '../Animations/SectionChangeLink';
import FORM from './FORM';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../App';
import BURGER from './BURGER';
import FloatingLinks from './FLOATINGLINKS';

export default function LOGIN() {
	const history = useHistory();
	const [error, setError] = useState();
	const { setFromCheckOut } = useContext(AuthContext);

	const signInWithGoogle = async () => {
		try {
			await auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
			setFromCheckOut(false);
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
			setFromCheckOut(false);
		} catch (error) {
			console.error(error.message);
			setError(error.message);
		}
	};

	return (
		<motion.div
			style={{ position: 'relative' }}
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
				<h2 className="gradient">Log In</h2>
				<div>
					<SectionChangeLink
						weGoTo={'/TATTOO'}
						exitAnimationDirection={changeExitPropHomet}
						title={'TATTOO'}
						direction={'rtl'}
					/>
				</div>
			</div>
			<div className="login-signup-wrapper">
				<FORM
					signIn={signInWithGoogle}
					signInWithEmail={signInWithEmail}
					error={error}
					method={null}
					setError={setError}
				/>
			</div>
			<FloatingLinks />
			<BURGER />
			
		</motion.div>
	);
}
