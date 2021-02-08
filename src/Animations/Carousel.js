import React, { useRef, useEffect, useMemo, useState } from 'react';
import boxingGloves from '../images/boxing.svg';
import apple from '../images/apple.svg';
import eye from '../images/eye.svg';

const slideCss = {
	position: 'relative',
	left: '500px',
	transition: '1s ease-in-out',
};

const Carousel = () => {
	const [upOrDown, setUporDown] = useState('');
	const [slideNumber, setSlideNumber] = useState(0);
	const prevUporDown = useRef();
	const onWheelThrottled = useMemo(() => {
		return { direcction: upOrDown, times: slideNumber };
	}, [upOrDown, slideNumber]);

	//  Useref does not cause component to re-render, unlike State
	const ref = useRef();
	const ref2 = useRef();
	const ref3 = useRef();

	useEffect(() => {
		window.addEventListener('wheel', wheelslide);
		// window.addEventListener('touchmove', touchSlide);
		return () => {
			window.removeEventListener('wheel', wheelslide);
			// window.removeEventListener('touchmove', touchSlide);
		};
	});

	useEffect(() => {
		console.log(onWheelThrottled);
	}, [onWheelThrottled]);

	useEffect(() => {
		if (onWheelThrottled.direcction === 'down') {
			if (ref.current.style.left === '500px') {
				ref.current.style.left = '50px';
				ref2.current.style.left = '50px';
				ref3.current.style.left = '50px';
			}
		}

		if (onWheelThrottled.direcction === 'up') {
			if (ref.current.style.left === '50px') {
				ref.current.style.left = '500px';
				ref2.current.style.left = '500px';
				ref3.current.style.left = '500px';
			}
		}
	}, [onWheelThrottled]);

	function wheelslide(e) {
		if (e.deltaY > 0) {
			setUporDown('down');
		} else {
			setUporDown('up');
		}
	}

	return (
		<div style={{ display: 'flex', flexDirection: 'column' }}>
			<div className="containerCarousel">
				<img
					ref={ref}
					style={slideCss}
					src={eye}
					alt="eye"
					className="carousel-slide"
					id={0}
				></img>
				<img
					ref={ref2}
					style={slideCss}
					src={boxingGloves}
					alt="boxingGloves"
					className="carousel-slide"
					id={1}
				></img>
				<img
					ref={ref3}
					style={slideCss}
					src={apple}
					alt="apple"
					className="carousel-slide"
					id={2}
				></img>
			</div>
			<div>
				<div style={{ position: 'absolute', top: 0, left: 0 }}>
					<h1>Previous WAS {prevUporDown.current}</h1>
				</div>
			</div>
		</div>
	);
};

export default Carousel;
