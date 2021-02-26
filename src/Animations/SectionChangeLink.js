import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { hoverVariants } from '../Animations/animation';

export default function SectionChangeLink({
	weGoTo,
	exitAnimationDirection,
	title,
	direction,
	burgerMenuLinks,
	variants,
	toggleOpen,
}) {
	const [hoverOn, setHoverOn] = useState(false);

	return (
		<Link
			to={weGoTo}
			onClick={() => {
				exitAnimationDirection();
				toggleOpen && toggleOpen();
			}}
			className={`navigation-link ${burgerMenuLinks}`}
			style={{ direction: direction }}
		>
			<motion.div variants={variants}>
				<motion.h3
					onHoverStart={() => setHoverOn(true)}
					onHoverEnd={() => setHoverOn(false)}
					whileTap={{ scale: 1.1 }}
					className="gradient text-600"
				>
					{title}
				</motion.h3>
				<motion.div
					variants={hoverVariants}
					animate={hoverOn ? 'visible' : 'hidden'}
					style={{
						transform: 'translateY(-2000%)',
						width: '0%',
						height: '0.06rem',
						backgroundColor: 'white',
						pointerEvents: 'none',
						direction: direction,
					}}
				></motion.div>
			</motion.div>
		</Link>
	);
}
