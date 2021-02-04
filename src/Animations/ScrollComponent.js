import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function ScrollComponent({ children }) {
	const controls = useAnimation();
	const [ref, inView] = useInView({ threshold: 0.9 });

	useEffect(() => {
		if (inView) {
			controls.start('visible');
		} else {
			controls.stop();
		}
	}, [inView, controls]);

	return (
		<motion.div
			ref={ref}
			animate={controls}
			initial="hidden"
			transition={{ duration: 0.3 }}
			variants={{
				visible: {
					scale: 1.9,
					transition: {
						duration: 0.5,
					},
				},
				hidden: {
					scale: 1,
					transition: {
						duration: 0.2,
					},
				},
			}}
		>
			{children}
		</motion.div>
	);
}
