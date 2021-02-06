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
