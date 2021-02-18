import './App.css';
import React from 'react';
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

function App() {
	const location = useLocation();

	return (
		<div className="App">
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
						<CUSTOMER />
					</Route>
					<Route path="/LOGIN" exact>
						<LOGIN />
					</Route>
					<Route path="/SIGNUP" exact>
						<SIGNUP />
					</Route>
				</Switch>
			</AnimatePresence>
		</div>
	);
}

export default App;
