import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function SectionChangeLink({
	weGoTo,
	exitAnimationDirection,
	title,
}) {
	return (
		<Link
			to={weGoTo}
			onClick={exitAnimationDirection}
			className={'navigation-link'}
		>
			<motion.h3
				whileHover={{
					x: 2,
				}}
				whileTap={{ scale: 1.1 }}
				className="gradient"
			>
				{title}
			</motion.h3>
		</Link>
	);
}
