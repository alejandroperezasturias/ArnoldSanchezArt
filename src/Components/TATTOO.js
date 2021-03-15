import { motion } from 'framer-motion';
import {
	routeVariants,
	changeExitPropRight,
	changeExitPropLeft,
	tattooImage,
	tattooImage2,
	tattooImage3,
} from '../Animations/animation';
import SectionChangeLink from '../Animations/SectionChangeLink';
import FOOTER from './FOOTER';
import ARNOLD from '../images/arnol.jpg';
import LEAF from '../images/leafTattpp.svg';
import LETTERS from '../images/lettersTattoo.svg';
import BURGER from './BURGER';
import FloatingLinks from './FLOATINGLINKS';

export default function TATTOO() {
	return (
		<>
			<motion.div
				style={{ minHeight: '90vh', position: 'relative' }}
				variants={routeVariants}
				initial='hidden'
				animate='visible'
				exit='exit'
				className={'section'}>
				<div className={'section-header'}>
					<div>
						<SectionChangeLink
							weGoTo={'/MERCH'}
							exitAnimationDirection={changeExitPropRight}
							title={'MERCH'}
							direction={'rtl'}
						/>
					</div>
					<div style={{ textAlign: 'center' }}>
						<h2 className='gradient'>TATTOO</h2>
					</div>
					<BURGER />
					<div>
						<SectionChangeLink
							weGoTo={'/ART'}
							exitAnimationDirection={changeExitPropLeft}
							title={'ART'}
							direction={'rtl'}
						/>
					</div>
				</div>

				<motion.div
					className={'split center-center tattoo-section'}
					style={{ minHeight: '80vh' }}>
					<motion.div className={'split'}>
						<motion.div style={{ position: 'relative' }}>
							<img
								style={{
									minWidth: '377px',
									minHeight: '390px',
									objectFit: 'cover',
								}}
								src={ARNOLD}
								alt='Arnold Bembibre Leon Tattoo'></img>
							<motion.div
								variants={tattooImage}
								initial='open'
								animate='close'
								className='absolute tattooImageOverlay'
								style={{ backgroundColor: 'red' }}></motion.div>
						</motion.div>

						<motion.div className='tattoo-section-tattoo-photos-laptop'>
							<motion.div style={{ position: 'relative' }}>
								<img
									style={{
										minWidth: '100px',
										objectFit: 'cover',
									}}
									src={LEAF}
									alt='Arnold Bembibre Leon Tattoo Leaf'></img>
								<motion.div
									style={{ backgroundColor: 'red' }}
									variants={tattooImage2}
									className='absolute'
									initial='open'
									animate='close'></motion.div>
							</motion.div>
							<motion.div style={{ position: 'relative' }}>
								<img
									style={{
										minWidth: '100px',
										objectFit: 'cover',
									}}
									src={LETTERS}
									alt='Arnold Bembibre Leon Letters Leaf'></img>
								<motion.div
									style={{ backgroundColor: 'red' }}
									className='absolute'
									variants={tattooImage3}
									initial='open'
									animate='close'></motion.div>
							</motion.div>
						</motion.div>
					</motion.div>
					<div className='flow-content tattoo-section-text'>
						<h2 className={'text-900'}>Arnol Segura</h2>
						<h4
							className={'text-300 xl-space'}
							style={{ '--xl-space': '1rem' }}>
							@arnolsegchez | Bembire | El Bierzo | Leon
						</h4>
						<div className='flow-content tattoo-section-paragraph'>
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
							<button className='btn'>APPOINTMENT</button>
						</div>
					</div>
					<div className='tattoo-section-tattoo-photos-phone'>
						<img src={LEAF} alt='Arnold Bembibre Leon Tattoo Leaf'></img>
						<img src={LETTERS} alt='Arnold Bembibre Leon Letters Leaf'></img>
					</div>
				</motion.div>

				<FOOTER />
				<FloatingLinks />
			</motion.div>
		</>
	);
}
