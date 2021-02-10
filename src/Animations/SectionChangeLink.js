import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { hoverVariants } from '../Animations/animation';

export default function SectionChangeLink({
	weGoTo,
	exitAnimationDirection,
	title,
	direction,
}) {
	const [hoverOn, setHoverOn] = useState(false);

	return (
		<Link
			to={weGoTo}
			onClick={exitAnimationDirection}
			className={'navigation-link'}
			style={{ direction: direction }}
		>
			<motion.h3
				onHoverStart={() => setHoverOn(true)}
				onHoverEnd={() => setHoverOn(false)}
				whileTap={{ scale: 1.1 }}
				className="gradient"
			>
				{title}
			</motion.h3>
			<motion.div
				variants={hoverVariants}
				animate={hoverOn ? 'visible' : 'hidden'}
				style={{
					position: 'absolute',
					top: 13,
					bottom: 0,
					left: 0,
					right: 0,
					width: '0%',
					height: '4%',
					backgroundColor: 'white',
					pointerEvents: 'none',
					direction: direction,
				}}
			></motion.div>
		</Link>
	);
}
