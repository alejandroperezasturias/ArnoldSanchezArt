import { motion } from 'framer-motion';
import {
	routeVariants,
	changeExitPropRight,
	changeExitPropLeft,
	routeVariantsNormal,
	changeExitPropHomet,
} from '../Animations/animation';
import Gallery from '../Animations/Gallery';
import SectionChangeLink from '../Animations/SectionChangeLink';
import FOOTER from './FOOTER';
import BURGER from './BURGER'

export default function ART() {
	return (
		<>
			<motion.div
				variants={routeVariants}
				initial="hidden"
				animate="visible"
				exit="exit"
				style={{ minHeight: '100vh', position: 'relative' }}
				className={'section'}
			>
				<div className={'section-header'}>
					<div>
						<SectionChangeLink
							weGoTo={'/TATTOO'}
							exitAnimationDirection={changeExitPropRight}
							title={'TATTOO'}
							direction={'rtl'}
						/>
					</div>
					<div style={{ textAlign: 'center' }}>
						<h2 className="gradient">ART</h2>
					</div>
					<BURGER/>
					<div>
						<SectionChangeLink
							weGoTo={'/MERCH'}
							exitAnimationDirection={changeExitPropLeft}
							title={'MERCH'}
							direction={'rtl'}
						/>
					</div>
				</div>

				<div className={'section-body xl-space'}>
					<Gallery />
				</div>
				<FOOTER />
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
			</motion.div>
		</>
	);
}
