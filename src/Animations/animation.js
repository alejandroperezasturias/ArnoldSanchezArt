export const routeVariants = {
	hidden: {
		opacity: 0,
		y: 10,
		transition: {
			duration: 0.5,
			when: 'beforeChildren',
		},
	},
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.5,
			when: 'beforeChildren',
		},
	},
	exit: {
		opacity: 0,
		y: 10,
		transition: {
			duration: 0.5,
		},
	},
};

export const routeVariantsNormal = {
	hidden: {
		opacity: 0,
		y: -20,
		transition: {
			duration: 1,
			ease: 'easeInOut',
		},
	},
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 1,
			ease: 'easeInOut',
		},
	},
	exit: {
		opacity: 0,
		y: -20,
		transition: {
			duration: 1,
			ease: 'easeInOut',
		},
	},
};

export const hoverVariants = {
	hidden: {
		width: '0%',
		// left: -10,
		// right: -10,
		transition: {
			stiffnes: 600,
			// dumping: 8,
			ease: 'easeInOut',
		},
	},
	visible: {
		width: '110%',
		// left: -10,
		// right: -10,
		transition: {
			duration: 0.4,
			stiffnes: 600,
			// dumping: 8,
			ease: 'easeInOut',
		},
	},
};

export const heroVariants = {
	hidden: {
		opacity: 0,
		y: 10,
		transition: {
			duration: 0.5,
		},
	},
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.5,
		},
	},
	exit: {
		opacity: 0,
		y: 10,
		transition: {
			duration: 0.5,
		},
	},
};

export function changeExitPropRight() {
	routeVariants['exit'] = {
		opacity: 0,
		x: +30,
		transition: {
			duration: 0.5,
		},
	};
}

export function changeExitPropLeft() {
	routeVariants['exit'] = {
		opacity: 0,
		x: -30,
		transition: {
			duration: 0.5,
		},
	};
}

export function changeExitPropHomet() {
	routeVariants['exit'] = {
		opacity: 0,
		y: 10,
		transition: {
			duration: 0.5,
		},
	};
}

export const burgerAnimation = {
	close: {
		opacity: 0,
		x: '-100%',
		transition: {
			duration: 0.07,
		},
	},
	open: {
		opacity: 1,
		x: '0%',
		transition: {
			delay: 0.05,
			duration: 0.1,
			ease: 'easeOut',
			when: 'beforeChildren',
			staggerChildren: 0.09,
		},
	},
};

export const titleAnim = {
	close: {
		opacity: 0,
		scale: 0,
		transition: { y: { stiffness: 700 } },
	},
	open: {
		opacity: 1,
		scale: 1,
		transition: { ease: 'easeOut', stiffness: 400 },
	},
};

export const lineOneBurger = {
	open: { rotate: 45, translateY: -3 },
	close: {
		rotate: 0,
		translateY: 0,
		transition: { duration: 0.07 },
	},
};

export const lineTwoBurger = {
	open: { x: '-100%', opacity: 0 },
	close: {
		x: '0%',
		opacity: 1,
		transition: { duration: 0.05 },
	},
};

export const lineThreeBurger = {
	open: { rotate: -45, translateY: 10 },
	close: {
		rotate: 0,
		translateY: 0,
		transition: { duration: 0.07 },
	},
};

export const tattooImage = {
	open: { left: '0%' },
	close: {
		left: '100%',
		transition: { duration: 0.8, delay: 0.3 },
	},
};

export const tattooImage2 = {
	open: { top: '0%' },
	close: {
		top: '100%',
		transition: { duration: 0.8, delay: 0.4 },
	},
};

export const tattooImage3 = {
	open: { bottom: '0%' },
	close: {
		bottom: '100%',
		transition: { duration: 0.8, delay: 0.4 },
	},
};

// const sidebar = {
// 	open: {
// 		// circle(radius, placements)
// 		// clipPath: `circle(10%  at 50% 50%)`,
// 		scale: 1,
// 		background: 'white',
// 		transition: {
// 			// type: 'spring',
// 			// stiffness: 20,
// 			// damping: 5,
// 			restDelta: 2,
// 			when: 'beforeChildren',
// 			staggerChildren: 0.1,
// 		},
// 	},
// 	close: {
// 		// clipPath: 'circle(40% at 50% 50%)',
// 		scale: 1,
// 		background: 'white',
// 		transition: {
// 			type: 'spring',
// 			stiffness: 3000,
// 			damping: 100,
// 			// when: 'afterChildren',
// 			// staggerChildren: 0.09,
// 			// staggerDirection: -1,
// 			// duration: 0,
// 		},
// 	},
// };
