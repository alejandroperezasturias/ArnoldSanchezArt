import { motion } from 'framer-motion';
import {
	routeVariants,
	changeExitPropRight,
	changeExitPropLeft,
} from '../Animations/animation';
import SectionChangeLink from '../Animations/SectionChangeLink';

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
			<div className={'section-header'}>
				<SectionChangeLink
					weGoTo={'/MERCH'}
					exitAnimationDirection={changeExitPropRight}
					title={'MERCH'}
				/>
				<h2 className="gradient">TATTOO</h2>
				<SectionChangeLink
					weGoTo={'/ART'}
					exitAnimationDirection={changeExitPropLeft}
					title={'ART'}
				/>
			</div>
			<div className={'section-body split center-center'}></div>
		</motion.div>
	);
}
