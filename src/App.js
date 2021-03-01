import './App.css';
import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Switch, Route, useLocation } from 'react-router-dom';
import ScrollToTop from './Animations/ScrollToTop';
import HERO from './Components/HERO';
import TATTOO from './Components/TATTOO';
import ART from './Components/ART';
import MERCH from './Components/MERCH';
import CHECKOUT from './Components/CHECKOUT';
import CUSTOMER from './Components/CUSTOMER';
import SIGNUP from './Components/SIGNUP';
import LOGIN from './Components/LOGIN';
import FORGOTPASSWORD from './Components/FORGOTPASSWORD';
import { auth } from './Components/firebase';
import { products } from './helpers/products';
export const AuthContext = React.createContext({});

function App() {
	const location = useLocation();
	const [user, setUser] = useState();
	const [fromCheckout, setFromCheckOut] = useState(false)
	useEffect(() => {
		const unlisten = auth.onAuthStateChanged((authUser) => {
			setUser(authUser);
		});
		return unlisten;
	});

	const [shoppingCart, setShoppingCart]= useState([])


	const [trolly, setTrolly] = useState([]);
	useEffect(() => {
		let listProducts = [];
		shoppingCart.forEach((entry) => {
			if (!entry.id) return;
			const item = products.find((i) => entry.id === i.price_id);
			const newItem = { ...item, amount: entry.amount };
			listProducts = [...listProducts, newItem];
			
		});
		setTrolly(listProducts);
	}, [shoppingCart]);


	const deleteFromShoppingCart = (id) => {
		const existingItem = shoppingCart.find((entry) => entry.id === id);
		if (!existingItem) return;
		const shoppingCartCopy = [...shoppingCart];
		setShoppingCart(shoppingCartCopy.filter((entry) => entry.id !== id));
	};

	const totalCents = trolly.reduce((sum, entry) => {
		const item = products.find((i) => entry.price_id === i.price_id);
		return sum + item.price * entry.amount;
	}, 0);


	const authContextValue = {
		user,
		setShoppingCart,
		shoppingCart,
		setFromCheckOut,
		fromCheckout,
		totalCents,
		trolly,	
		deleteFromShoppingCart
		
	};

	return (
		<div className="App">
			<AuthContext.Provider value={authContextValue}>
				<AnimatePresence exitBeforeEnter>
					<ScrollToTop />
					<Switch location={location} key={location.pathname}>
						<Route path="/" exact>
							<HERO />
						</Route>
						<Route path="/TATTOO" exact>
							<TATTOO />
						</Route>
						<Route path="/ART" exact>
							<ART />
						</Route>
						<Route path="/MERCH" exact>
							<MERCH />
						</Route>
						<Route path="/CHECKOUT" exact>
							<CHECKOUT />
						</Route>
						<Route path="/CUSTOMER" exact>
							<CUSTOMER user={user} />
						</Route>
						<Route path="/LOGIN" exact>
							<LOGIN />
						</Route>
						<Route path="/SIGNUP" exact>
							<SIGNUP />
						</Route>
						<Route path="/FORGOTPASSWORD" exact>
							<FORGOTPASSWORD />
						</Route>
					</Switch>
				</AnimatePresence>
			</AuthContext.Provider>
		</div>
	);
}

export default App;
