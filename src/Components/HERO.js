import {
	useState,
	useRef,
	useLayoutEffect,
	useEffect,
	useContext,
} from 'react';
import logo from '../images/logo.svg';
import skull from '../images/skull_3.jpg';
import {
	motion,
	useTransform,
	useViewportScroll,
	useSpring,
} from 'framer-motion';
import { Link } from 'react-router-dom';
import {
	changeExitPropRight,
	changeExitPropLeft,
	heroVariants,
	hoverVariants,
} from '../Animations/animation';
import FOOTER from './FOOTER';
import SectionChangeLink from '../Animations/SectionChangeLink';
import USER from './USER';
import { AuthContext } from '../App';
import BURGER from './BURGER';

export function SectionChangeLinkHero({ weGoTo, height, title, scaleText }) {
	const [hoverOn, setHoverOn] = useState(false);

	return (
		<>
			<Link to={weGoTo} className={'navigation-link-hero'}>
				<motion.div
					style={{ height }}
					className={'hero-scroll-progress split center-center'}
					whileTap={{ scale: 1.1 }}
				>
					<div style={{ position: 'relative' }}>
						<motion.h2
							onHoverStart={() => setHoverOn(true)}
							onHoverEnd={() => setHoverOn(false)}
							style={{ scaleText }}
							className={'text-900'}
						>
							{title}
						</motion.h2>
						<motion.div
							variants={hoverVariants}
							animate={hoverOn ? 'visible' : 'hidden'}
							style={{
								position: 'absolute',
								top: '50%',
								bottom: 0,
								left: 0,
								right: 0,
								width: '0%',
								height: '3%',
								backgroundColor: 'white',
								pointerEvents: 'none',
							}}
						></motion.div>
					</div>
				</motion.div>
			</Link>
		</>
	);
}

export default function HERO() {
	const ref = useRef();
	const [display, setDisplay] = useState('none');
	const { user } = useContext(AuthContext);

	useEffect(() => {
		user?.displayName ? setDisplay('none') : setDisplay('block');
	}, [user]);

	// Stores the start middle end scrolling position for our container
	const [scrollPercentageStart, setScrollPercentageStart] = useState(null);
	const [scrollPercentageEnd, setScrollPercentageEnd] = useState(null);

	const { scrollYProgress } = useViewportScroll();
	const yScroll = useSpring(scrollYProgress, {
		stiffness: 500,
		damping: 100,
	});

	const scale = useTransform(
		yScroll,
		[scrollPercentageStart, scrollPercentageEnd],
		[1.1, 2.8]
	);

	const scaleText = useTransform(
		yScroll,
		[scrollPercentageStart, scrollPercentageEnd],
		[0, 2]
	);
	const opacity = useTransform(
		yScroll,
		[scrollPercentageStart, scrollPercentageEnd],
		[1, 0.1]
	);

	// Plus 0.2 to give it delay so we don't need to hook up any interaction observer
	const height = useTransform(
		yScroll,
		[scrollPercentageStart + 0.2, scrollPercentageEnd + 0.2],
		[38, 150]
	);

	const y = useTransform(
		yScroll,
		[scrollPercentageStart, scrollPercentageEnd],
		[0, 400]
		// [0, 600]
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
		<motion.div
			initial="hidden"
			animate="visible"
			exit="exit"
			variants={heroVariants}
			className="text-align-center hero"
		>
			<div
				className={'section-header'}
				style={{
					padding: '0rem 1rem',
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
				}}
			>
				<SectionChangeLink
					weGoTo={'/TATTOO'}
					exitAnimationDirection={changeExitPropRight}
					title={'TATTOO'}
					direction={'rtl'}
				/>

				<div style={{ display }}>
					<SectionChangeLink
						weGoTo={'/CUSTOMER'}
						exitAnimationDirection={changeExitPropLeft}
						title={'LOGIN'}
						direction={'initial'}
					/>
				</div>

				{user && <USER user={user} />}
				<BURGER />
				<SectionChangeLink
					weGoTo={'/MERCH'}
					exitAnimationDirection={changeExitPropLeft}
					title={'MERCH'}
					direction={'initial'}
				/>
			</div>
			<a
				href="http://localhost:3000/"
				aria-label="acme home page"
				className={'hero-logo split center-center'}
			>
				<div style={{ minHeight: '4rem' }}>
					<img src={logo} alt="logo"></img>
				</div>

				<h1
					className={'gradient'}
					style={{ scale, color: 'var(--clr-neutral-100)' }}
				>
					arnolsegchez
				</h1>
				<p
					className={'hero-subtitle gradient'}
					style={{ color: 'var(--clr-neutral-100)' }}
				>
					art
				</p>
			</a>

			<div ref={ref}>
				<div style={{ minHeight: '20vh' }}></div>
				<div className={'hero-image'} style={{ minHeight: '12vh' }}>
					<motion.img
						style={{ scale, opacity, y }}
						src={skull}
						alt="Arnold Bembibre Leon Tattoo Skull"
					></motion.img>
				</div>
				<div style={{ height: '65vh' }}></div>
			</div>

			<div
				style={{
					minHeight: '60vh',
					alignItems: 'flex-start',
					justifyContent: 'center',
					width: '100%',
				}}
			>
				<SectionChangeLinkHero
					weGoTo="/TATTOO"
					height={height}
					title="TATTOO"
					scaleText={scaleText}
				/>
				<SectionChangeLinkHero
					weGoTo="/ART"
					height={height}
					title="ART"
					scaleText={scaleText}
				/>
				<SectionChangeLinkHero
					weGoTo="/MERCH"
					height={height}
					title="MERCH"
					scaleText={scaleText}
				/>
				<SectionChangeLinkHero
					weGoTo="/CONTACT"
					height={height}
					title="CONTACT"
					scaleText={scaleText}
				/>
			</div>
			<FOOTER />
		</motion.div>
	);
}
