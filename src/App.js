import './App.css';
import React from 'react';
import { AnimatePresence } from 'framer-motion';
import { Switch, Route, useLocation } from 'react-router-dom';
import ScrollToTop from './Animations/ScrollToTop';
import HERO from './Components/HERO';
import TATTOO from './Components/TATTOO';
import ART from './Components/ART';
import MERCH from './Components/MERCH';

function App() {
	const location = useLocation();

	return (
		<div className="App">
			<AnimatePresence exitBeforeEnter initial={false}>
				{/* <ScrollToTop /> */}
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
