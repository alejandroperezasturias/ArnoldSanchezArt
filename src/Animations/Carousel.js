import React, { useRef, useEffect } from 'react';
import boxingGloves from '../images/boxing.svg';
import apple from '../images/apple.svg';
import eye from '../images/eye.svg';

const containerCss = {
	display: 'flex',
	justifyContent: 'flex-end',
	alignItems: 'center',
	width: '100%',
	height: '90vh',
};
const slideCss = {
	position: 'relative',
	left: '500px',
	transition: '1s ease-in-out',
};

const Carousel = () => {
	//  Useref does not cause component to re-render, unlike State
	const ref = useRef();
	const ref2 = useRef();
	const ref3 = useRef();

	useEffect(() => {
		window.addEventListener('wheel', wheelslide);
		window.addEventListener('touchmove', wheelslide);
		return () => {
			window.removeEventListener('wheel', wheelslide);
			window.removeEventListener('touchmove', wheelslide);
		};
	}, []);

	function wheelslide(e) {
		// scrolling downward
		if (ref === undefined || ref2 === undefined || ref3 === undefined) return;
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
