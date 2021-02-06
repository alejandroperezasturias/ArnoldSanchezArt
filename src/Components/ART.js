import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
	routeVariants,
	changeExitPropRight,
	changeExitPropLeft,
} from '../Animations/animation';
import EmblaCarousel from '../Animations/EmblaCarousel';

export default function ART() {
	return (
		<motion.div
			variants={routeVariants}
			initial="hidden"
			animate="visible"
			exit="exit"
			style={{ minHeight: '100vh', position: 'relative' }}
			className={'section'}
		>
			<div className={'section-header '}>
				<Link
					to="/TATTOO"
					onClick={() => changeExitPropRight()}
					className={'navigation-link'}
				>
					<h3 className="gradient">TATTOO</h3>
				</Link>
				<h2 className="gradient">ART</h2>
				<Link
					to="/MERCH"
					onClick={() => changeExitPropLeft()}
					className={'navigation-link'}
				>
					<h3 className="gradient">MERCH</h3>
				</Link>
			</div>
			<div className={'section-body split center-center'}>
				<EmblaCarousel />
			</div>
		</motion.div>
	);
}
