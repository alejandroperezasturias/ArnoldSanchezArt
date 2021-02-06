import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
	routeVariants,
	changeExitPropRight,
	changeExitPropLeft,
} from '../Animations/animation';

export default function TATTOO() {
	return (
		<motion.div
			style={{ minHeight: '100vh', position: 'relative' }}
			variants={routeVariants}
			initial="hidden"
			animate="visible"
			exit="exit"
			className={'section'}
		>
			<div className={'section-header  '}>
				<Link
					to="/MERCH"
					onClick={() => changeExitPropRight()}
					className={'navigation-link'}
				>
					<h3 className="gradient">MERCH</h3>
				</Link>
				<h2 className="gradient">TATTOO</h2>
				<Link
					to="/ART"
					onClick={() => changeExitPropLeft()}
					className={'navigation-link'}
				>
					<h3 className="gradient">ART</h3>
				</Link>
			</div>
			<div className={'section-body split center-center'}></div>
		</motion.div>
	);
}
