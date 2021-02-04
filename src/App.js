import { useState, useRef, useLayoutEffect } from 'react';
import './App.css';
import logo from './images/logo.svg';
import skull from './images/skull_3.svg';
import {
	motion,
	useTransform,
	useViewportScroll,
	useSpring,
} from 'framer-motion';

function App() {
	const ref = useRef();

	// Stores the start middle end scrolling position for our container
	const [scrollPercentageStart, setScrollPercentageStart] = useState(null);
	const [scrollPercentageEnd, setScrollPercentageEnd] = useState(null);

	const { scrollYProgress } = useViewportScroll();
	const y = useSpring(scrollYProgress, {
		stiffness: 600,
		damping: 120,
	});

	const scale = useTransform(
		y,
		[scrollPercentageStart, scrollPercentageEnd],
		[1, 1.7]
	);
	const opacity = useTransform(
		y,
		[scrollPercentageStart, scrollPercentageEnd],
		[1, 0.1]
	);

	const height = useTransform(
		y,
		[scrollPercentageStart, scrollPercentageEnd],
		[30, 200]
	);

	useLayoutEffect(() => {
		// Get the distance from the start of the page to the element start
		const rect = ref.current.getBoundingClientRect();
		const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

		const offsetStart = rect.top + scrollTop;
		const offsetEnd = offsetStart + rect.height;

		const elementScrollStart = offsetStart / document.body.clientHeight;
		const elementScrollEnd = offsetEnd / document.body.clientHeight;

		setScrollPercentageStart(elementScrollStart);
		setScrollPercentageEnd(elementScrollEnd);
	}, []);

	return (
		<div className="App">
			<div className="text-align-center hero">
				<a
					href="http://localhost:3001/"
					aria-label="acme home page"
					className={'hero-logo split '}
				>
					<div>
						<img src={logo} alt="logo"></img>
					</div>

					<h1 style={{ scale, color: 'var(--clr-neutral-100)' }}>
						arnolsegchez
					</h1>
					<p style={{ color: 'var(--clr-neutral-100)' }}>art</p>
				</a>
				<div ref={ref} style={{ zIndex: 0, position: 'relative' }}>
					<div style={{ height: '8vh' }}></div>
					<div className={'hero-image'}>
						<motion.img style={{ scale, opacity }} src={skull}></motion.img>
					</div>
					<div style={{ height: '10vh' }}></div>
				</div>
				<div
					style={{
						minHeight: '80vh',
						alignItems: 'flex-start',
						justifyContent: 'center',
						width: '100%',
					}}
					className={'xl-space'}
				>
					<motion.div
						style={{ height }}
						className={'hero-scroll-progress split center-center'}
						// style={{ display: 'grid', placeItems: 'center' }}
					>
						<motion.h2 style={{ scale }} className={'text-900'}>
							TATTOO
						</motion.h2>
					</motion.div>
					<motion.div
						style={{ height }}
						className={'hero-scroll-progress split center-center'}
					>
						<motion.h2 style={{ scale }} className={'text-900 '}>
							ART
						</motion.h2>
					</motion.div>
					<motion.div
						style={{ height }}
						className={'hero-scroll-progress split center-center'}
					>
						<motion.h2 style={{ scale }} className={'text-900 '}>
							MERCH
						</motion.h2>
					</motion.div>
				</div>
			</div>
		</div>
	);
}

export default App;
