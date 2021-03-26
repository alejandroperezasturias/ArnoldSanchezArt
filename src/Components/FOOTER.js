import React, { useState } from 'react';
import decoration from '../images/decoration.svg';
import { hoverVariants } from '../Animations/animation';
import { motion } from 'framer-motion';

export function InstagramLinkFooter({ hoverOn, setHoverOn }) {
	return (
		<div style={{ position: 'relative' }}>
			<a
				href={'https://www.instagram.com/arnolsegchez/'}
				aria-label='acme instagram page'
				style={{ lineHeight: 'normal', overflow: 'hidden' }}>
				<motion.h3
					onHoverStart={() => setHoverOn(true)}
					onHoverEnd={() => setHoverOn(false)}
					className={'red text-600'}>
					@arnolsegchez
				</motion.h3>
			</a>
			<motion.div
				variants={hoverVariants}
				animate={hoverOn ? 'visible' : 'hidden'}
				style={{
					position: 'absolute',
					top: '50%',
					transfrom: 'translateY(-50%)',
					bottom: 0,
					left: 0,
					right: 0,
					width: '0%',
					height: '8%',
					backgroundColor: 'white',
					pointerEvents: 'none',
				}}></motion.div>
		</div>
	);
}

export default function FOOTER() {
	const [hoverOn, setHoverOn] = useState(false);
	return (
		<>
			<div
				className={'xl-space instagram-banner split'}
				style={{ alignItems: 'center' }}>
				<img src={decoration} alt={'decoration'}></img>
				<div
					className='flow-content'
					style={{
						width: '100%',
						display: 'grid',
						placeItems: 'center',
						fontSize: 'var(--fs-400)',
						fontWeight: 'var(--fw-200)',
						'--flow-spacer': '.4rem',
					}}>
					<h3 style={{ pointerEvents: 'none' }} className={'text-600'}>
						instagram
					</h3>
					<InstagramLinkFooter setHoverOn={setHoverOn} hoverOn={hoverOn} />
					<h3 style={{ pointerEvents: 'none' }} className={'text-600'}>
						instagram
					</h3>
					<InstagramLinkFooter setHoverOn={setHoverOn} hoverOn={hoverOn} />
				</div>
			</div>
			<div
				className={'split center-center final-footer'}
				style={{ '--split-spacer': '2rem' }}>
				<p>© 2020 Designed By Alex Perez. All Rights Reserved</p>
				<div>
					<ul className='footer-social'>
						<li>
							<a
								aria-label='acme instagram Arnol tattoo page'
								style={{ color: 'var(--clr-neutral-100)' }}
								href='https://www.instagram.com/arnolsegchez/'>
								IG
							</a>
						</li>
					</ul>
				</div>
			</div>
		</>
	);
}
