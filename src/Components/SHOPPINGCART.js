import { useState, useContext, useLayoutEffect, useEffect } from 'react';
import { motion, useCycle } from 'framer-motion';
import { AuthContext } from '../App';
import { formatCurrency } from '../helpers/helpers';
import { useHistory } from 'react-router-dom';
import TrollyItem from './TROLLYITEM';
import { changeExitPropHomet } from '../Animations/animation';

export const spanQuantityAnimation = {
	open: { scale: [1, 1.5, 1], transition: { duration: 0.2 } },
	close: {
		scale: 1,
	},
};

export default function SHOPPINGCART({ deleteFromShoppingCart }) {
	const [isOpen, toggleOpen] = useCycle(false, true);
	const [animateSpanAmount, setAnimateSpanAmount] = useState(false);

	const { user, setFromCheckOut, trolly, totalCents } = useContext(AuthContext);
	const history = useHistory();

	const toCheckOut = () => {
		if (user) {
			changeExitPropHomet();
			history.push('./checkout');
			setFromCheckOut(false);
		} else {
			changeExitPropHomet();
			history.push('./login');
			setFromCheckOut(true);
		}
	};

	useEffect(() => {
		setAnimateSpanAmount(!animateSpanAmount);
		setTimeout(() => {
			setAnimateSpanAmount(false);
		}, 100);
	}, [totalCents]);

	return (
		<>
			<div
				style={{
					zIndex: 10,
					width: '10rem',
					textAlign: 'center',
					position: 'absolute',
					left: '50%',
					top: '80%',
					transform: 'translateX(-50%)',
					minHeight: '20rem',
					borderRadius: isOpen ? '1rem 1rem 0rem 0rem' : '1rem',
				}}
				className={'shopping-cart'}>
				<div
					onClick={() => toggleOpen()}
					style={{
						width: '10rem',
						height: '10rem',
						// borderRadius: '50%',
						background: 'white',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						cursor: 'pointer',
						zIndex: 10,
						position: 'relative',
					}}
					className={isOpen ? 'trolly-square' : 'trolly-circle'}>
					<div
						style={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							flexDirection: 'column',
						}}>
						<SvgTrolly />
						<motion.span
							variants={spanQuantityAnimation}
							initial='close'
							animate={animateSpanAmount ? 'open' : 'close'}
							style={{
								color: 'black',
								marginTop: '.2rem',
							}}
							className='text-400'>
							{formatCurrency(totalCents * 1000)}
						</motion.span>
					</div>
				</div>
				<div>
					{isOpen && (
						<div
							id='shopping-cart '
							className='flow-content'
							style={{
								backgroundColor: 'white',
								color: 'black',
								textAlign: 'left',
								position: 'absolute',
								borderRadius: '0rem 0rem 1rem 1rem ',
								width: '10rem',
								padding: '1rem',
							}}>
							<div>
								<h3 className='text-600'>Your Cart</h3>
							</div>

							{trolly.length > 0 ? (
								<>
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
											{totalCents && (
												<p className='text-400'>
													Total: {formatCurrency(totalCents * 1000)}{' '}
												</p>
											)}
										</div>
										<div style={{ marginTop: '.5rem' }}>
											<button
												hidden={trolly.length === 0}
												onClick={toCheckOut}
												className={'btn text'}
												style={{
													backgroundColor: '#7BAFAF',
													padding: '.4rem .7rem',
													fontSize: 'var(	--fs-400)',
												}}>
												Check Out
											</button>
										</div>
									</div>
								</>
							) : (
								<></>
							)}
						</div>
					)}
				</div>
			</div>
			<div
				className={'overlay'}
				onClick={() => toggleOpen()}
				style={{
					display: isOpen ? 'block' : 'none',
					position: 'absolute',
					top: 0,
					left: 0,
					right: 0,
					bottom: 0,
					backgroundColor: 'transparent',
					zIndex: 0,
				}}></div>
		</>
	);
}

export function SvgTrolly() {
	return (
		<motion.svg
			xmlns='http://www.w3.org/2000/svg'
			fill='none'
			viewBox='0 0 24 24'
			stroke='currentColor'
			width='25px'
			color='black'
			whileTap={{ scale: 1.2 }}>
			<path
				strokeLinecap='round'
				strokeLinejoin='round'
				strokeWidth='2'
				d='M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z'
			/>
		</motion.svg>
	);
}

export const useDimensions = (ref) => {
	const [dimensions, setDimensions] = useState({ height: 0, width: 0 });
	// We want to use layout affect as it is synchroniously does not wait for the browser to be fully painted to fire
	useLayoutEffect(() => {
		const rect = ref.current.getBoundingClientRect();
		setDimensions({
			width: rect.width,
			height: rect.height,
		});
	}, [ref.current]);

	return dimensions;
};
