import React, { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import {
	routeVariants,
	changeExitPropRight,
	changeExitPropLeft
} from '../Animations/animation';
import SectionChangeLink from '../Animations/SectionChangeLink';
import FOOTER from './FOOTER';
import { formatCurrency } from '../helpers/helpers';
import { AuthContext } from '../App';
import { products } from '../helpers/products';
import SHOPPINGCART from './SHOPPINGCART';
import BURGER from './BURGER';
import FloatingLinks from './FLOATINGLINKS'

export default function MERCH() {
	const { shoppingCart, setShoppingCart, deleteFromShoppingCart} = useContext(AuthContext);

	// Shopping Cart

	const addToShoppingCart = (id, amount) => {
		const shoppingCartCopy = [...shoppingCart];
		const existingItem = shoppingCartCopy.find((entry) => entry.id === id);
		if (existingItem) {
			existingItem.amount = existingItem.amount + amount;
			const existingItemIndex = shoppingCartCopy.findIndex(
				(entry) => entry.id === id
			);
			shoppingCartCopy[existingItemIndex] = existingItem;
			setShoppingCart(shoppingCartCopy);
		} else {
			setShoppingCart((items) => {
				return [...items, { id: id, amount }];
			});
		}
	};
	return (
		<>
			<motion.div
				style={{ minHeight: '100vh', position: 'relative' }}
				variants={routeVariants}
				initial="hidden"
				animate="visible"
				exit="exit"
				className={'section'}
			>
				<div className={'section-header'} style={{marginTop: '2.5rem'}}>
					<SectionChangeLink
						weGoTo={'/ART'}
						exitAnimationDirection={changeExitPropRight}
						title={'ART'}
						direction={'rtl'}
					/>
					<div style={{ textAlign: 'center', marginTop: '5rem' }}>
						<h2 className="gradient">MERCH</h2>
						<SHOPPINGCART deleteFromShoppingCart={deleteFromShoppingCart} />
					</div>
					<BURGER />
					<SectionChangeLink
						weGoTo={'/TATTOO'}
						exitAnimationDirection={changeExitPropLeft}
						title={'TATTOO'}
						direction={'initial'}
					/>
				</div>

				<div className="split center-center">
					<div
						className={'merch-wrapper'}
						style={{
							justifyContent: 'space-between',
							alignItems: 'center',
							width: '70%',
							marginTop: '10rem',
							display: 'flex',
						}}
					>
						{products.map((product) => {
							return (
								<MerchCard
									key={product.price_id}
									price={product.price}
									name={product.name}
									price_id={product.price_id}
									image={product.image}
									addToShoppingCart={addToShoppingCart}
								/>
							);
						})}
					</div>
				</div>
				<div style={{minHeight:'10rem'}}></div>
				<FloatingLinks/>
				<FOOTER />
			</motion.div>
		</>
	);
}

export function MerchCard({ price, name, price_id, addToShoppingCart, image }) {
	const [amount, setAmount] = useState(1);
	const changeQuantity = (v) => {
		setAmount((oldQ) => Math.max(1, oldQ + v));
	};
	return (
		<div
			id={price_id}
			className={'center-center split'}
			style={{ '--split-spacer': '3rem' }}
		>
			<img src={image} width="250px" style={{minHeight:"250px", objectFit:'cover'}}  alt="arnol tattoo bembibre product"></img>
			<div className="merchcard-info-wrapper">
				<h3>{name}</h3>
				<p>{formatCurrency(price * 1000)}</p>
				<div className={'merch-card-increase-quantity-wrapper'}>
					<button
						className="btn gradient"
						onClick={() => {
							changeQuantity(-1);
						}}
						style={{
							padding: '.3rem .3rem',
							width: '40px',
							height: '40px',
							borderRadius: '100%',
						}}
					>
						-
					</button>
					<span>{amount}</span>
					<button
						style={{
							padding: '.3rem .3rem',
							width: '40px',
							height: '40px',
							borderRadius: '100%',
						}}
						className="btn gradient"
						onClick={() => {
							changeQuantity(1);
						}}
					>
						+
					</button>
				</div>

				<button
					onClick={() => {
						addToShoppingCart(price_id, amount);
						setAmount(1);
					}}
					disabled={amount === 0}
					className="btn gradient"
				>
					ADD TO CART
				</button>
			</div>
		</div>
	);
}
