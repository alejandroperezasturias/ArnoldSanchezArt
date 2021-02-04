import { useState, useRef, useLayoutEffect } from 'react';
import './App.css';
import logo from './images/logo.svg';
import skull from './images/skull_final.svg';
import { motion, useTransform, useViewportScroll } from 'framer-motion';

function App() {
	const ref = useRef();

	// Stores the start middle end scrolling position for our container
	const [scrollPercentageStart, setScrollPercentageStart] = useState(null);
	const [scrollPercentageEnd, setScrollPercentageEnd] = useState(null);
	const [scrollPercentageMiddle, setScrollPercentageMiddle] = useState(null);

	const { scrollYProgress } = useViewportScroll();
	const scale = useTransform(
		scrollYProgress,
		[scrollPercentageStart, scrollPercentageMiddle, scrollPercentageEnd],
		[1, 1.5, 2.2]
	);
	const opacity = useTransform(
		scrollYProgress,
		[scrollPercentageStart, scrollPercentageMiddle, scrollPercentageEnd],
		[1, 0.5, 0]
	);

	useLayoutEffect(() => {
		// Get the distance from the start of the page to the element start
		const rect = ref.current.getBoundingClientRect();
		const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

		const offsetStart = rect.top + scrollTop;
		const offsetEnd = offsetStart + rect.height;

		const elementScrollStart = offsetStart / document.body.clientHeight;
		const elementScrollEnd = offsetEnd / document.body.clientHeight;
		const elementScrollMiddle =
			(elementScrollEnd - elementScrollStart) / 2 + elementScrollStart;

		setScrollPercentageStart(elementScrollStart);
		setScrollPercentageEnd(elementScrollEnd);
		setScrollPercentageMiddle(elementScrollMiddle);
	}, []);

	return (
		<div className="App">
			<div className="text-align-center hero">
				<a
					href="http://localhost:3001/"
					aria-label="acme home page"
					className={'hero-logo split center-center'}
				>
					<div>
						<img src={logo} alt="logo"></img>
					</div>

					<h1 style={{ scale, color: 'var(--clr-neutral-100)' }}>
						arnolsegchez
					</h1>
					<p style={{ color: 'var(--clr-neutral-100)' }}>art</p>
				</a>
				<div ref={ref}>
					<div className={'hero-image'}>
						<div style={{ height: '14vh' }}></div>
						<motion.img style={{ scale, opacity }} src={skull}></motion.img>
					</div>
				</div>
				<div
					style={{
						minHeight: '100vh',
						alignItems: 'flex-start',
						justifyContent: 'center',
						width: '100%',
					}}
					className={'xl-space'}
				>
					<motion.h2 style={{ scale }} className={'text-900'}>
						TATTOO
					</motion.h2>
				</div>
			</div>
		</div>
	);
}

export default App;
