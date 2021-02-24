import React from 'react';
import { motion } from 'framer-motion';

export default function GalleyImage({ src, alt }) {
	return (
		<div style={{ overflow: 'hidden', minHeight:'7rem' }}>
			<motion.img
				whileHover={{
					scale: 1.01,
				}}
				src={src}
				alt={alt}
				style={{ cursor: 'pointer' }}
			></motion.img>
		</div>
	);
}
