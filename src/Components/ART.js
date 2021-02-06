import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function ART() {
	let artVariants = {
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
		artVariants['exit'] = {
			opacity: 0,
			x: +30,
			transition: {
				duration: 1,
			},
		};
	}

	function changeExitPropLeft() {
		artVariants['exit'] = {
			opacity: 0,
			x: -30,
			transition: {
				duration: 1,
			},
		};
	}

	return (
		<motion.div
			variants={artVariants}
			initial="hidden"
			animate="visible"
			exit="exit"
			style={{ minHeight: '100vh', position: 'relative' }}
		>
			<div className={'section-header split center-center'}>
				<h2>ART</h2>
			</div>
			<div className={'section-body split center-center'}>
				<div className={'section-body-navigation-left'}>
					<Link
						to="/TATTOO"
						onClick={() => changeExitPropRight()}
						className={'navigation-link'}
					>
						<h3>TATTOO</h3>
					</Link>
				</div>
				<div className={'section-body-navigation-right'}>
					<Link
						to="/MERCH"
						onClick={() => changeExitPropLeft()}
						className={'navigation-link'}
					>
						<h3>MERCH</h3>
					</Link>
				</div>
			</div>
		</motion.div>
	);
}
