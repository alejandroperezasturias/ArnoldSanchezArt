export const routeVariants = {
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
