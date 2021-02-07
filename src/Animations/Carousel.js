import React, { useRef } from 'react';
import boxingGloves from '../images/boxing.svg';
import apple from '../images/apple.svg';
import eye from '../images/eye.svg';

const containerCss = {
	display: 'flex',
	justifyContent: 'flex-end',
	alignItems: 'center',
	width: '100%',
	height: '85vh',
};
const slideCss = {
	position: 'relative',
	// minWidth: '40%',
	left: '500px',
	transition: '1s ease-in-out',
};

const Carousel = () => {
	const ref = useRef();
	const ref2 = useRef();
	const ref3 = useRef();

	window.onwheel = wheelslide;

	function wheelslide(e) {
		// scrolling downward
		if (e.deltaY > 0) {
			if (ref.current.style.left === '500px' || ref.current.style.left === '') {
				ref.current.style.left = '50px';
				ref2.current.style.left = '50px';
				ref3.current.style.left = '50px';
			}
		} else {
			if (ref.current.style.left === '50px') {
				ref.current.style.left = '500px';
				ref2.current.style.left = '500px';
				ref3.current.style.left = '500px';
			}
		}
	}
	return (
		<div style={containerCss}>
			<img ref={ref} style={slideCss} src={eye} alt="eye"></img>
			<img
				ref={ref2}
				style={slideCss}
				src={boxingGloves}
				alt="boxingGloves"
			></img>
			<img ref={ref3} style={slideCss} src={apple} alt="apple"></img>
		</div>
	);
};

export default Carousel;
