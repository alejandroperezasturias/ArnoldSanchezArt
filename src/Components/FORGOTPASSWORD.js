import { useState } from 'react';
import { auth } from './firebase';
import { motion } from 'framer-motion';
import {
	routeVariants,
	changeExitPropRight,
	routeVariantsNormal,
	changeExitPropHomet,
} from '../Animations/animation';
import SectionChangeLink from '../Animations/SectionChangeLink';
import FormRecoverPassword from './FORMFORGOTPASSWORD';
import BURGER from './BURGER'

export default function Login() {
	const [error, setError] = useState();
	const [success, setSuccess] = useState();

	const recoverPassword = async (event, email) => {
		try {
			event.preventDefault();
			await auth.sendPasswordResetEmail(email);
			setError();
			setSuccess('Check your inbox for further instructions');
		} catch (error) {
			console.error(error.message);
			setError(error.message);
			setSuccess();
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
				className="login-signup-wrapper"
				style={{
					minHeight: '75vh',
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				
				<FormRecoverPassword
					error={error}
					success={success}
					recoverPassword={recoverPassword}
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
			<BURGER/>
		</motion.div>
	);
}
