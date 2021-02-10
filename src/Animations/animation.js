export const routeVariants = {
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

export const hoverVariants = {
	hidden: {
		width: '0%',
		left: -10,
		right: -10,
		transition: {
			stiffnes: 600,
			// dumping: 8,
			ease: 'easeInOut',
		},
	},
	visible: {
		width: '110%',
		left: -10,
		right: -10,
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

export function changeExitPropRight() {
	routeVariants['exit'] = {
		opacity: 0,
		x: +30,
		transition: {
			duration: 1,
		},
	};
}

export function changeExitPropLeft() {
	routeVariants['exit'] = {
		opacity: 0,
		x: -30,
		transition: {
			duration: 1,
		},
	};
}
