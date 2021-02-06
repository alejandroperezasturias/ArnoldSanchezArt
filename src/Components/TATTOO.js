import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const tattooVariants = {
	hidden: {
		opacity: 0,
		y: 10,
		transition: {
			duration: 1,
		},
	},
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 1,
		},
	},
	exit: {
		opacity: 0,
		y: 10,
		transition: {
			duration: 1,
		},
	},
};

export default function TATTOO() {
	function changeExitPropRight() {
		tattooVariants['exit'] = {
			opacity: 0,
			x: +30,
			transition: {
				duration: 1,
			},
		};
	}

	function changeExitPropLeft() {
		tattooVariants['exit'] = {
			opacity: 0,
			x: -30,
			transition: {
				duration: 1,
			},
		};
	}

	return (
		<motion.div
			style={{ minHeight: '100vh', position: 'relative' }}
			variants={tattooVariants}
			initial="hidden"
			animate="visible"
			exit="exit"
		>
			<div className={'section-header split center-center'}>
				<h2>TATTOO</h2>
			</div>
			<div className={'section-body split center-center'}>
				<div className={'section-body-navigation-left'}>
					<Link
						to="/MERCH"
						onClick={() => changeExitPropRight()}
						className={'navigation-link'}
					>
						<h3>MERCH</h3>
					</Link>
				</div>
				<div className={'section-body-navigation-right'}>
					<Link
						to="/ART"
						onClick={() => changeExitPropLeft()}
						className={'navigation-link'}
					>
						<h3>ART</h3>
					</Link>
				</div>
			</div>
		</motion.div>
	);
}
