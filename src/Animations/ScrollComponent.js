import React, { useState, useLayoutEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function ScrollComponent({ children, threshold }) {
	const controls = useAnimation();
	const [ref, inView] = useInView({ threshold: threshold });

	function useWindowSize() {
		const [size, setSize] = useState([0, 0]);
		useLayoutEffect(() => {
			function updateSize() {
				setSize([window.innerWidth, window.innerHeight]);
			}
			window.addEventListener('resize', updateSize);
			updateSize();
			return () => window.removeEventListener('resize', updateSize);
		}, []);
		return size;
	}

	if (useWindowSize()[0] > 500) {
		if (inView) {
			controls.start('visible');
		} else {
			controls.start('hidden');
		}
	} else {
		controls.start('visible');
	}

	return (
		<motion.div
			ref={ref}
			animate={controls}
			initial="hidden"
			transition={{ duration: 0.3 }}
			variants={{
				visible: {
					scale: 1,
					opacity: 1,

					transition: {
						duration: 0.5,
					},
				},
				hidden: {
					scale: 0.9,
					opacity: 0,
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
