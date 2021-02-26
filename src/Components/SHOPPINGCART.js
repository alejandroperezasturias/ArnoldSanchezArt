import {
	useState,
	useContext,
	useEffect,
	useRef,
	useLayoutEffect,
} from 'react';
import { titleAnim } from '../Animations/animation';
import { motion, useCycle } from 'framer-motion';
import { AuthContext } from '../App';
import { products } from '../helpers/products';
import { formatCurrency } from '../helpers/helpers';
import { useHistory } from 'react-router-dom';

const sidebar = {
	open: (height) => ({
		// circle(radius, placements)
		clipPath: `circle(${height + 110}px  at 0% 0%)`,
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
		clipPath: 'circle(20% at 50% 46%)',
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
	const { height, width } = useDimensions(containerRef);
	console.log(width);
	const [trolly, setTrolly] = useState([]);
	const { shoppingCart, user, setFromCheckOut } = useContext(AuthContext);
	const history = useHistory();

	useEffect(() => {
		let listProducts = [];
		shoppingCart.forEach((entry) => {
			if (!entry.id) return;
			const item = products.find((i) => entry.id === i.price_id);
			const newItem = { ...item, amount: entry.amount };
			listProducts = [...listProducts, newItem];
			console.log(newItem);
		});
		setTrolly(listProducts);
	}, [shoppingCart]);

	const totalCents = trolly.reduce((sum, entry) => {
		const item = products.find((i) => entry.price_id === i.price_id);
		return sum + item.price * entry.amount;
	}, 0);

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
					padding: '0.5rem 1rem',
					margin: 0,
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				<div
					onClick={() => toggleOpen()}
					style={{
						backgroundColor: 'white',
						width: '50px',
						height: '50px',
						textAlign: 'left',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						cursor: 'pointer',
					}}
				>
					<SvgTrolly />
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
						borderRadius: '1rem',
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
								key={item.price_id}
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
							<p style={{ fontSize: 'var(--fs-300)' }}>
								Total: {formatCurrency(totalCents * 1000)}{' '}
							</p>
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
			width="30px"
			color="black"
			whileTap={{ scale: 1.1 }}
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

export function TrollyItem({
	price,
	amount,
	name,
	price_id,
	deleteFromShoppingCart,
}) {
	return (
		<motion.div key={price_id} variants={titleAnim}>
			<p> {name}</p>
			<p style={{ fontSize: 'var(	--fs-200)' }}>Items: {amount}</p>

			<p style={{ fontSize: 'var(	--fs-200)' }}>
				Price: {formatCurrency(price * amount * 1000)}
			</p>
			<button
				className={'btn text'}
				style={{
					backgroundColor: 'red',
					padding: '.2rem .5rem',
					fontSize: 'var(	--fs-300)',
					marginTop: '0.5rem',
				}}
				onClick={() => {
					deleteFromShoppingCart(price_id);
				}}
			>
				Delete
			</button>
		</motion.div>
	);
}
