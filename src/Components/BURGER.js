import { useEffect, useContext } from 'react';
import { motion, useCycle } from 'framer-motion';
import {
	burgerAnimation,
	lineOneBurger,
	lineThreeBurger,
	lineTwoBurger,
	changeExitPropHomet,
	titleAnim,
} from '../Animations/animation';
import SectionChangeLink from '../Animations/SectionChangeLink';
import { AuthContext } from '../App';
import USER from './USER';

export default function BURGER() {
	const [isOpen, toggleOpen] = useCycle(false, true);
	const { user } = useContext(AuthContext);

	// Prevent Scrolling
	let targetElement = document.querySelector('html');
	useEffect(() => {
		isOpen
			? targetElement.classList.add('no-scroll-two')
			: targetElement.classList.remove('no-scroll-two');
	});
	//

	return (
		<>
			<div
				className="burger flow-content"
				onClick={() => {
					toggleOpen();
				}}
			>
				<motion.div
					initial="close"
					animate={isOpen ? 'open' : 'close'}
					variants={lineOneBurger}
				></motion.div>
				<motion.div
					initial="close"
					animate={isOpen ? 'open' : 'close'}
					variants={lineTwoBurger}
				></motion.div>
				<motion.div
					initial="close"
					animate={isOpen ? 'open' : 'close'}
					variants={lineThreeBurger}
				></motion.div>
			</div>
			<motion.div
				className={'about-contact-wrapper overflow-hidden'}
				initial="close"
				animate={isOpen ? 'open' : 'close'}
				variants={burgerAnimation}
			>
				<SectionChangeLink
					weGoTo={'/ART'}
					exitAnimationDirection={changeExitPropHomet}
					title={'ART'}
					direction={'rtl'}
					burgerMenuLinks={'burger-menu-links'}
					variants={titleAnim}
					toggleOpen={toggleOpen}
				/>
				<SectionChangeLink
					weGoTo={'/TATTOO'}
					exitAnimationDirection={changeExitPropHomet}
					title={'TATTOO'}
					direction={'rtl'}
					burgerMenuLinks={'burger-menu-links'}
					variants={titleAnim}
					toggleOpen={toggleOpen}
				/>
				<SectionChangeLink
					weGoTo={'/MERCH'}
					exitAnimationDirection={changeExitPropHomet}
					title={'MERCH'}
					direction={'rtl'}
					burgerMenuLinks={'burger-menu-links'}
					variants={titleAnim}
					toggleOpen={toggleOpen}
				/>
				<SectionChangeLink
					weGoTo={'/CONTACT'}
					exitAnimationDirection={changeExitPropHomet}
					title={'CONTACT'}
					direction={'rtl'}
					burgerMenuLinks={'burger-menu-links'}
					variants={titleAnim}
					toggleOpen={toggleOpen}
				/>
				<SectionChangeLink
					weGoTo={'/'}
					exitAnimationDirection={changeExitPropHomet}
					title={'HOME'}
					direction={'rtl'}
					burgerMenuLinks={'burger-menu-links'}
					variants={titleAnim}
					toggleOpen={toggleOpen}
				/>
				{!user && (
					<SectionChangeLink
						weGoTo={'/LOGIN'}
						exitAnimationDirection={changeExitPropHomet}
						title={'LOGIN'}
						direction={'rtl'}
						burgerMenuLinks={'burger-menu-links'}
						variants={titleAnim}
						toggleOpen={toggleOpen}
					/>
				)}

				<motion.hr variants={titleAnim} style={{ width: '60%' }}></motion.hr>

				{user && (
					<USER
						user={user}
						burgerMenuLinks={'burger-menu-links'}
						variants={titleAnim}
					/>
				)}
			</motion.div>
		</>
	);
}
