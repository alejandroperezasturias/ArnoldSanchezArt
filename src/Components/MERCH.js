import { motion } from 'framer-motion';
import {
	routeVariants,
	changeExitPropRight,
	changeExitPropLeft,
} from '../Animations/animation';
import SectionChangeLink from '../Animations/SectionChangeLink';

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
				<SectionChangeLink
					weGoTo={'/ART'}
					exitAnimationDirection={changeExitPropRight}
					title={'ART'}
				/>
				<h2 className="gradient">MERCH</h2>
				<SectionChangeLink
					weGoTo={'/TATTOO'}
					exitAnimationDirection={changeExitPropLeft}
					title={'TATTOO'}
				/>
			</div>
		</motion.div>
	);
}
