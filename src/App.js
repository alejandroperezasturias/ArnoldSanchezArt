import './App.css';
import React from 'react';
import { AnimatePresence } from 'framer-motion';
import { Switch, Route, NavLink, useLocation } from 'react-router-dom';

import HERO from './Components/HERO';
import TATTOO from './Components/TATTOO';
import ART from './Components/ART';
import MERCH from './Components/MERCH';
import NAV from './Components/NAV';

function App() {
	const location = useLocation();

	return (
		<div className="App">
			<NAV></NAV>
			<AnimatePresence exitBeforeEnter initial={false}>
				<Switch location={location} key={location.key}>
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
				</Switch>
			</AnimatePresence>
		</div>
	);
}

export default App;
