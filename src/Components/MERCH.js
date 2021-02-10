import { motion } from 'framer-motion';
import {
	routeVariants,
	changeExitPropRight,
	changeExitPropLeft,
} from '../Animations/animation';
import SectionChangeLink from '../Animations/SectionChangeLink';
import FOOTER from './FOOTER';

export default function MERCH() {
	return (
		<>
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
						direction={'rtl'}
					/>
					<h2 className="gradient">MERCH</h2>
					<SectionChangeLink
						weGoTo={'/TATTOO'}
						exitAnimationDirection={changeExitPropLeft}
						title={'TATTOO'}
						direction={'initial'}
					/>
				</div>
			</motion.div>
			<FOOTER />
		</>
	);
}
