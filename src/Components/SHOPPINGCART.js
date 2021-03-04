import { useState, useContext, useRef, useLayoutEffect } from 'react';
import { motion, useCycle } from 'framer-motion';
import { AuthContext } from '../App';
import { formatCurrency } from '../helpers/helpers';
import { useHistory } from 'react-router-dom';
import TrollyItem from './TROLLYITEM';

const sidebar = {
	open: (height) => ({
		// circle(radius, placements)
		clipPath: `circle(${height + 300}px  at 100% 100%)`,
		background: 'white',
		transition: {
			// type: 'spring',
			// stiffness: 20,
			// damping: 5,
			restDelta: 2,
			when: 'beforeChildren',
			staggerChildren: 0.1,
		},
	}),
	close: {
		clipPath: 'circle(32% at 50% 50%)',
		background: 'white',
		transition: {
			type: 'spring',
			stiffness: 700,
			damping: 50,
			when: 'afterChildren',
			staggerChildren: 0.09,
			staggerDirection: -1,
		},
	},
};

export default function SHOPPINGCART({ deleteFromShoppingCart }) {
	const [isOpen, toggleOpen] = useCycle(false, true);
	const containerRef = useRef(null);
	const { height } = useDimensions(containerRef);
	const { user, setFromCheckOut, trolly, totalCents } = useContext(AuthContext);
	const history = useHistory();

	const toCeckOut = () => {
		if (user) {
			history.push('./checkout');
			setFromCheckOut(false);
		} else {
			history.push('./login');
			setFromCheckOut(true);
		}
	};

	return (
		<motion.div
			initial={false}
			animate={isOpen ? 'open' : 'close'}
			custom={height}
			variants={sidebar}
			style={{ width: '10rem', borderRadius: '1rem 1rem 0rem 0rem' }}
		>
			<motion.div
				style={{
					width: '10rem',
					borderRadius: '1rem',
					padding: '2rem 1rem',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					marginTop: '1.5rem',
				}}
			>
				<div
					onClick={() => toggleOpen()}
					style={{
						
						backgroundColor: 'white',
						width: '80px',
						height: '80px',
						textAlign: 'left',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						cursor: 'pointer',
						flexDirection: 'column'

					}}
				>
					<SvgTrolly />
					<span style={{color: 'black', fontSize: 'var(--fs-300)', marginTop: '.2rem', fontWeight:"var(--fw-300)"}}>{formatCurrency(totalCents * 1000)}</span>
				</div>
			</motion.div>
			<motion.div>
				<div
					id="shopping-cart "
					className="flow-content"
					ref={containerRef}
					style={{
						backgroundColor: 'white',
						color: 'black',
						textAlign: 'left',
						position: 'absolute',
						borderRadius: '0rem 0rem 1rem 1rem ',
						width: '10rem',
						padding: '1rem',
					}}
				>
					<div>
						<h3 style={{ fontWeight: 'var(--fw-300)' }}>Your Cart</h3>
					</div>

					{trolly.map((item) => {
						return (
							<TrollyItem
								key={item.name}
								price_id={item.price_id}
								name={item.name}
								amount={item.amount}
								price={item.price}
								deleteFromShoppingCart={deleteFromShoppingCart}
							/>
						);
					})}
					<hr></hr>
					<div>
						<div hidden={trolly.length === 0}>
							{totalCents && (
								<p style={{ fontSize: 'var(--fs-300)' }}>
									Total: {formatCurrency(totalCents * 1000)}{' '}
								</p>
							)}
							<p style={{ fontSize: 'var(--fs-300)' }}></p>
						</div>
						<div style={{ marginTop: '.5rem' }}>
							<button
								hidden={trolly.length === 0}
								onClick={toCeckOut}
								className={'btn text'}
								style={{
									backgroundColor: '#7BAFAF',
									padding: '.2rem .5rem',
									fontSize: 'var(	--fs-300)',
								}}
							>
								Check Out
							</button>
						</div>
					</div>
				</div>
			</motion.div>
		</motion.div>
	);
}

export function SvgTrolly() {
	return (
		<motion.svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor"
			width="25px"
			color="black"
			whileTap={{ scale: 1.2 }}
		>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="2"
				d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
			/>
		</motion.svg>
	);
}

export const useDimensions = (ref) => {
	const [dimensions, setDimensions] = useState({ height: 0, width: 0 });
	// We want to use layout affect as it is synchroniously does not wait for the browser to be fully painted to fire
	useLayoutEffect(() => {
		const rect = ref.current.getBoundingClientRect();
		console.log(rect);
		setDimensions({
			width: rect.width,
			height: rect.height,
		});
	}, [ref.current]);

	return dimensions;
};
