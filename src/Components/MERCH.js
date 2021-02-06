import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function MERCH() {
	const merchVariants = {
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

	function changeExitPropRight() {
		merchVariants['exit'] = {
			opacity: 0,
			x: +30,
			transition: {
				duration: 1,
			},
		};
	}

	function changeExitPropLeft() {
		merchVariants['exit'] = {
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
			variants={merchVariants}
			initial="hidden"
			animate="visible"
			exit="exit"
		>
			<div className={'section-header split center-center'}>
				<h2>MERCH</h2>
			</div>
			<div className={'section-body split center-center'}>
				<div className={'section-body-navigation-left'}>
					<Link
						to="/ART"
						onClick={() => changeExitPropRight()}
						className={'navigation-link'}
					>
						<h3>ART</h3>
					</Link>
				</div>
				<div className={'section-body-navigation-right'}>
					<Link
						to="/TATTOO"
						onClick={() => changeExitPropLeft()}
						className={'navigation-link'}
					>
						<h3>TATTOO</h3>
					</Link>
				</div>
			</div>
		</motion.div>
	);
}
