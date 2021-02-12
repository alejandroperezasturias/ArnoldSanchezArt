import { motion } from 'framer-motion';
import {
	routeVariants,
	changeExitPropRight,
	changeExitPropLeft,
	routeVariantsNormal,
	changeExitPropHomet,
} from '../Animations/animation';
import SectionChangeLink from '../Animations/SectionChangeLink';
import FOOTER from './FOOTER';
import ARNOLD from '../images/arnolPhoto.svg';
import LEAF from '../images/leafTattpp.svg';
import LETTERS from '../images/lettersTattoo.svg';

export default function TATTOO() {
	return (
		<>
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
							exitAnimationDirection={changeExitPropRight}
							title={'MERCH'}
							direction={'rtl'}
						/>
					</div>
					<h2 className="gradient">TATTOO</h2>
					<div>
						<SectionChangeLink
							weGoTo={'/ART'}
							exitAnimationDirection={changeExitPropLeft}
							title={'ART'}
							direction={'rtl'}
						/>
					</div>
				</div>

				<div className={'split center-center'} style={{ minHeight: '70vh' }}>
					<div className={'split'}>
						<div>
							<img src={ARNOLD} alt="Arnold Bembibre Leon Tattoo"></img>
						</div>
						<div className="tattoo-section-tattoo-photos-laptop">
							<img src={LEAF} alt="Arnold Bembibre Leon Tattoo Leaf"></img>
							<img src={LETTERS} alt="Arnold Bembibre Leon Letters Leaf"></img>
						</div>
					</div>
					<div className="flow-content tattoo-section-text">
						<h2 className={'text-900'}>Arnol Segura</h2>
						<h4
							className={'text-300 xl-space'}
							style={{ '--xl-space': '1rem' }}
						>
							@arnolsegchez | Bembire | El Bierzo | Leon
						</h4>
						<div className="flow-content tattoo-section-paragraph">
							<p>
								With 15 years of illustration and drawing on his back, Arnol has
								gone great lenghts to craft his eclectic style.
							</p>
							<p>
								His work is inspired by the 90’s hiphop aesthetics and by the
								dark and sinister work of Robert Hernandez.
							</p>
							<p>Attention to detail and perfectionism define the artist</p>
						</div>
						<div>
							<button className="gradient appointment-button">
								APPOINTMENT
							</button>
						</div>
					</div>
					<div className="tattoo-section-tattoo-photos-phone">
						<img src={LEAF} alt="Arnold Bembibre Leon Tattoo Leaf"></img>
						<img src={LETTERS} alt="Arnold Bembibre Leon Letters Leaf"></img>
					</div>
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
