import { useState } from 'react';

import { motion } from 'framer-motion';
import { hoverVariants } from '../Animations/animation';
import { Link } from 'react-router-dom';

export default function USER({ user, burgerMenuLinks, variants }) {
	const [hoverOn, setHoverOn] = useState(false);

	return (
		<>
			{user && (
				<motion.div variants={variants}>
					<Link
						to={'/CUSTOMER'}
						className={`navigation-link ${burgerMenuLinks}`}
					>
						<div>
							<motion.h3
								onHoverStart={() => setHoverOn(true)}
								onHoverEnd={() => setHoverOn(false)}
								className={'gradient text-600'}
							>
								{user.displayName}
							</motion.h3>
							<motion.div
								variants={hoverVariants}
								animate={hoverOn ? 'visible' : 'hidden'}
								style={{
									// position: 'absolute',
									// top: '50%',
									transform: 'translateY(-1800%)',
									// bottom: 0,
									// left: 0,
									// right: 0,
									width: '0%',
									height: '0.06rem',
									backgroundColor: 'white',
									pointerEvents: 'none',
								}}
							></motion.div>
						</div>
					</Link>
				</motion.div>
			)}
		</>
	);
}
