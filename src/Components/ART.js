import { motion } from 'framer-motion';
import {
	routeVariants,
	changeExitPropRight,
	changeExitPropLeft,
} from '../Animations/animation';
import Carousel from '../Animations/Carousel';
import SectionChangeLink from '../Animations/SectionChangeLink';

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
				<SectionChangeLink
					weGoTo={'/TATTOO'}
					exitAnimationDirection={changeExitPropRight}
					title={'TATTOO'}
				/>
				<h2 className="gradient">ART</h2>
				<SectionChangeLink
					weGoTo={'/MERCH'}
					exitAnimationDirection={changeExitPropLeft}
					title={'MERCH'}
				/>
			</div>
			<div className={'section-body split center-center'}>
				<Carousel />
			</div>
		</motion.div>
	);
}
