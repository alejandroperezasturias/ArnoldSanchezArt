import './App.css';
import HERO from './Components/HERO';
import TATTOO from './Components/TATTOO';
import ART from './Components/ART';
import MERCH from './Components/MERCH';
import { Switch, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

function App() {
	const location = useLocation();

	return (
		<div className="App">
			<AnimatePresence exitBeforeEnter>
				<Switch location={location} kye={location.key}>
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
