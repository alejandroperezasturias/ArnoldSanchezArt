import React from 'react';
import { motion } from 'framer-motion';

export default function GalleyImage({ src, alt }) {
	return (
		<div style={{ overflow: 'hidden' }}>
			<motion.img
				whileHover={{
					scale: 1.2,
				}}
				src={src}
				alt={alt}
				style={{ cursor: 'pointer' }}
			></motion.img>
		</div>
	);
}
