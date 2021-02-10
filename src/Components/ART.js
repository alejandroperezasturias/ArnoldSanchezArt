import { motion } from 'framer-motion';
import {
	routeVariants,
	changeExitPropRight,
	changeExitPropLeft,
} from '../Animations/animation';
import Gallery from '../Animations/Gallery';
import SectionChangeLink from '../Animations/SectionChangeLink';
import FOOTER from './FOOTER';

export default function ART() {
	return (
		<>
			<motion.div
				variants={routeVariants}
				initial="hidden"
				animate="visible"
				exit="exit"
				// style={{ minHeight: '100vh', position: 'relative' }}
				className={'section'}
			>
				<div className={'section-header '}>
					<SectionChangeLink
						weGoTo={'/TATTOO'}
						exitAnimationDirection={changeExitPropRight}
						title={'TATTOO'}
						direction={'rtl'}
					/>
					<h2 className="gradient">ART</h2>
					<SectionChangeLink
						weGoTo={'/MERCH'}
						exitAnimationDirection={changeExitPropLeft}
						title={'MERCH'}
						direction={'initial'}
					/>
				</div>
				<div className={'section-body xl-space'}>
					<Gallery />
				</div>
			</motion.div>
			<FOOTER />
		</>
	);
}
