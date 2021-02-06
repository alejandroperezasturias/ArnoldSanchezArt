import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
	routeVariants,
	changeExitPropRight,
	changeExitPropLeft,
} from '../Animations/animation';

export default function MERCH() {
	return (
		<motion.div
			style={{ minHeight: '100vh', position: 'relative' }}
			variants={routeVariants}
			initial="hidden"
			animate="visible"
			exit="exit"
			className={'section'}
		>
			<div className={'section-header'}>
				<Link
					to="/ART"
					onClick={() => changeExitPropRight()}
					className={'navigation-link'}
				>
					<h3 className="gradient">ART</h3>
				</Link>
				<h2 className="gradient">MERCH</h2>
				<Link
					to="/TATTOO"
					onClick={() => changeExitPropLeft()}
					className={'navigation-link'}
				>
					<h3 className="gradient">TATTOO</h3>
				</Link>
			</div>
		</motion.div>
	);
}
